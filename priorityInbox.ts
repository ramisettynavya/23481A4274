const NOTIF_API = "http://4.224.186.213/evaluation-service/notifications";
const AUTH_URL = "http://4.224.186.213/evaluation-service/auth";

interface Notification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
}

const PRIORITY_WEIGHT: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function getToken(): Promise<string> {
  const res = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "rnavya2006@gmail.com",
      name: "navya ramisetty",
      rollNo: "23481a4274",
      accessCode: "eJdCuC",
      clientID: "d5c3c3cc-510e-406a-9e84-0e5fb71b91a6",
      clientSecret: "zwPBXxkjPYhcZhkm"
    }),
  });
  const data = await res.json();
  return `Bearer ${data.access_token}`;
}

async function fetchNotifications(token: string): Promise<Notification[]> {
  const res = await fetch(NOTIF_API, {
    headers: { Authorization: token },
  });
  const data = await res.json();
  return data.notifications;
}

function getTopN(notifications: Notification[], n: number): Notification[] {
  return notifications
    .sort((a, b) => {
      const weightDiff = (PRIORITY_WEIGHT[b.Type] || 0) - (PRIORITY_WEIGHT[a.Type] || 0);
      if (weightDiff !== 0) return weightDiff;
      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    })
    .slice(0, n);
}

async function main() {
  const token = await getToken();
  const notifications = await fetchNotifications(token);
  const top10 = getTopN(notifications, 10);

  console.log("=== TOP 10 PRIORITY NOTIFICATIONS ===");
  top10.forEach((n, i) => {
    console.log(`${i + 1}. [${n.Type}] ${n.Message} - ${n.Timestamp}`);
  });
}

main();