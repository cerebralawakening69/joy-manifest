// src/hooks/useTracking.ts
import { useMemo } from "react";
import { api } from "@/src/integrations/backend/client";

export interface TrackingData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;

  user_agent?: string;
  screen?: string;
  question_index?: number;
  answer_key?: string;
  answer_value?: string;

  profileTitle?: string;
  email?: string;
  name?: string;
  answers?: any;

  // campos livres que você queira mandar junto
  [k: string]: any;
}

function getSessionId(): string {
  if (typeof window === "undefined") return `srv-${Date.now()}`;
  const k = "quizId";
  let sid = localStorage.getItem(k);
  if (!sid) {
    sid = (globalThis.crypto?.randomUUID?.() ?? String(Date.now()));
    localStorage.setItem(k, sid);
  }
  return sid;
}

function getUTMsOnce(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const k = "quiz_utms";
  const cached = localStorage.getItem(k);
  if (cached) {
    try { return JSON.parse(cached); } catch {}
  }
  const url = new URL(window.location.href);
  const utm: Record<string, string> = {};
  ["utm_source","utm_medium","utm_campaign","utm_content","utm_term"].forEach(p => {
    const v = url.searchParams.get(p);
    if (v) utm[p] = v;
  });
  localStorage.setItem(k, JSON.stringify(utm));
  return utm;
}

export function useTracking() {
  const session_id = useMemo(getSessionId, []);
  const utm = useMemo(getUTMsOnce, []);
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : undefined;

  const base = { session_id, user_agent: ua, ...utm };

  // helpers de alto nível
  return {
    session_id,

    // Genérico
    track: (action: string, data: TrackingData = {}) =>
      api.send(action, { ...base, ...data }),

    // Funil
    trackLanding:       (data: TrackingData = {}) => api.landing({ ...base, ...data }),
    trackStartQuiz:     (qIndex = 1) => api.startQuiz({ ...base, screen: `q${qIndex}`, question_index: qIndex }),
    trackQuestionShown: (qIndex: number) => api.questionShown({ ...base, screen: `q${qIndex}`, question_index: qIndex }),
    trackAnswerSubmitted: (qIndex: number, key: string, value: any) =>
      api.answerSubmitted({ ...base, screen: `q${qIndex}`, question_index: qIndex, answer_key: key, answer_value: value }),
    trackResultShown:   (profileTitle: string) => api.resultShown({ ...base, profileTitle }),
    trackEmailSubmitted:(email: string, name: string, profileTitle: string, answers: any) =>
      api.emailSubmitted({ ...base, email, name, profileTitle, answers }),
    trackCompleteQuiz:  () => api.completeQuiz({ ...base }),
    trackNext:          (from: number, to: number) => api.next({ ...base, from: `q${from}`, to: `q${to}` }),
    trackBack:          (from: number, to: number) => api.back({ ...base, from: `q${from}`, to: `q${to}` }),
    trackAbandon:       (screen?: string) => api.abandon({ ...base, screen }),
  };
}
