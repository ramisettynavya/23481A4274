import React, { useEffect, useState } from "react";
import { NotificationProvider } from "./context/NotificationContext";
import Navbar from "./components/Navbar";
import AllNotifications from "./pages/AllNotifications";
import PriorityInbox from "./pages/PriorityInbox";
import { Log } from "./logger";

export default function App() {
  const [currentPage, setCurrentPage] = useState("all");

  useEffect(() => {
    Log("info", "page", "App initialized");
  }, []);

  return (
    <NotificationProvider>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "all" ? <AllNotifications /> : <PriorityInbox />}
    </NotificationProvider>
  );
}