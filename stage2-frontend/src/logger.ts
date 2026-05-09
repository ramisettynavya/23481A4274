const LOG_API_URL = "http://4.224.186.213/evaluation-service/logs";
const AUTH_URL = "http://4.224.186.213/evaluation-service/auth";

const AUTH_BODY = {
  email: "rnavya2006@gmail.com",
  name: "navya ramisetty",
  rollNo: "23481a4274",
  accessCode: "eJdCuC",
  clientID: "d5c3c3cc-510e-406a-9e84-0e5fb71b91a6",
  clientSecret: "zwPBXxkjPYhcZhkm"
};

let cachedToken: string = "";
let tokenExpiry: number = 0;

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }
  const res = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(AUTH_BODY),
  });
  const data = await res.json();
  cachedToken = `Bearer ${data.access_token}`;
  tokenExpiry = Date.now() + 10 * 60 * 1000;
  return cachedToken;
}

export async function Log(
  level: "debug" | "info" | "warn" | "error" | "fatal",
  pkg: "api" | "component" | "hook" | "page" | "state" | "style" | "auth" | "config" | "middleware" | "utils",
  message: string
): Promise<void> {
  try {
    const token = await getToken();
    await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify({
        stack: "frontend",
        level,
        package: pkg,
        message,
      }),
    });
  } catch (err) {
    console.error("[LOG FAILED]", err);
  }
}