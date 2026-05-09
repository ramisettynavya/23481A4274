import React, { createContext, useContext, useEffect, useState } from "react";
import { Notification } from "../types";
import { fetchNotifications } from "../api";
import { Log } from "../logger";

interface NotificationContextType {
  notifications: Notification[];
  viewedIDs: Set<string>;
  markAsViewed: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  viewedIDs: new Set(),
  markAsViewed: () => {},
});

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [viewedIDs, setViewedIDs] = useState<Set<string>>(new Set());

  useEffect(() => {
    Log("info", "state", "Notification context initialized");
    fetchNotifications().then((data) => {
      setNotifications(data);
      Log("info", "state", "Notifications loaded into state");
    });
  }, []);

  const markAsViewed = (id: string) => {
    setViewedIDs((prev) => {
      const updated = new Set(prev);
      updated.add(id);
      return updated;
    });
    Log("info", "state", "Notification marked as viewed");
  };

  return (
    <NotificationContext.Provider value={{ notifications, viewedIDs, markAsViewed }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}