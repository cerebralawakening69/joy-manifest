import { WEB_APP_URL } from "@/config";

// usa text/plain pra evitar preflight CORS
async function postPlain(payload: any) {
  return fetch(WEB_APP_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    keepalive: true as any,
  }).then(() => ({ ok: true })).catch(() => ({ ok: false }));
}

export const api = {
  landing:       (data:any)=> postPlain({ action:"landing",        ...data }),
  startQuiz:     (data:any)=> postPlain({ action:"start_quiz",     ...data }),
  emailSubmitted:(data:any)=> postPlain({ action:"email_submitted", ...data }),
  completeQuiz:  (data:any)=> postPlain({ action:"complete_quiz",  ...data }),
  vslClick:      (data:any)=> postPlain({ action:"vsl_click",      ...data }),
};

// helper simples para manter um session_id estável no navegador
export function getSessionId() {
  let sid = localStorage.getItem("quiz_session_id");
  if (!sid) {
    sid = (crypto.randomUUID?.() || String(Date.now()));
    localStorage.setItem("quiz_session_id", sid);
  }
  return sid;
}
