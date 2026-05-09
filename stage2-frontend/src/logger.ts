const LOG_API_URL = "http://4.224.186.213/evaluation-service/logs";

let cachedToken: string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJybmF2eWEyMDA2QGdtYWlsLmNvbSIsImV4cCI6MTc3ODMxMDYyMSwiaWF0IjoxNzc4MzA5NzIxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiN2FlMTNiM2YtMzQ2Mi00NTE0LTg4YTEtNzVlMDBmNTc2N2U5IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibmF2eWEgcmFtaXNldHR5Iiwic3ViIjoiZDVjM2MzY2MtNTEwZS00MDZhLTllODQtMGU1ZmI3MWI5MWE2In0sImVtYWlsIjoicm5hdnlhMjAwNkBnbWFpbC5jb20iLCJuYW1lIjoibmF2eWEgcmFtaXNldHR5Iiwicm9sbE5vIjoiMjM0ODFhNDI3NCIsImFjY2Vzc0NvZGUiOiJlSmRDdUMiLCJjbGllbnRJRCI6ImQ1YzNjM2NjLTUxMGUtNDA2YS05ZTg0LTBlNWZiNzFiOTFhNiIsImNsaWVudFNlY3JldCI6Inp3UEJYeGtqUFloY1poa20ifQ.z4Q3922ZWsMBoYXbVr3nFPjBOI56NAB7voRQ7MzLxTw";
export async function Log(
  level: "debug" | "info" | "warn" | "error" | "fatal",
  pkg: "api" | "component" | "hook" | "page" | "state" | "style" | "auth" | "config" | "middleware" | "utils",
  message: string
): Promise<void> {
  try {
    await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cachedToken,
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