// src/integrations/backend/client.ts
import { WEB_APP_URL } from "@/config";

// Usa text/plain para evitar preflight CORS com Apps Script
async function postPlain(payload: any) {
  const EXEC =
    (WEB_APP_URL as any) ||
    (process?.env as any)?.NEXT_PUBLIC_WEB_APP_URL ||
    "";

  if (!EXEC) {
    console.error("[track] faltando WEB_APP_URL/NEXT_PUBLIC_WEB_APP_URL");
    return { ok: false, error: "WEB_APP_URL ausente" };
  }

  try {
    await fetch(EXEC, {
      method: "POST",
      headers: { "Content-Type": "text/plain; charset=utf-8" },
      body: JSON.stringify(payload),
      // @ts-expect-error: keepalive em ambientes SSR pode não existir
      keepalive: true,
    });
    return { ok: true };
  } catch (e) {
    console.error("[track] erro ao enviar", e);
    return { ok: false, error: String(e) };
  }
}

// API de eventos do funil (sem bemob, sem VSL no quiz)
export const api = {
  send: (action: string, data: any = {}) => postPlain({ action, ...data }),

  landing:         (data: any = {}) => postPlain({ action: "landing",          ...data }),
  startQuiz:       (data: any = {}) => postPlain({ action: "start_quiz",       ...data }),
  questionShown:   (data: any = {}) => postPlain({ action: "question_shown",   ...data }),
  answerSubmitted: (data: any = {}) => postPlain({ action: "answer_submitted", ...data }),
  resultShown:     (data: any = {}) => postPlain({ action: "result_shown",     ...data }),
  emailSubmitted:  (data: any = {}) => postPlain({ action: "email_submitted",  ...data }),
  completeQuiz:    (data: any = {}) => postPlain({ action: "complete_quiz",    ...data }),
  back:            (data: any = {}) => postPlain({ action: "back",             ...data }),
  next:            (data: any = {}) => postPlain({ action: "next",             ...data }),
  abandon:         (data: any = {}) => postPlain({ action: "abandon",          ...data }),
};
