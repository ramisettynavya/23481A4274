import React, { useEffect } from "react";
import { Chip, Card, CardContent, Typography } from "@mui/material";
import { useNotifications } from "../context/NotificationContext";
import { Log } from "../logger";

const typeColor: Record<string, "primary" | "success" | "warning"> = {
  Placement: "primary",
  Result: "success",
  Event: "warning",
};

export default function AllNotifications() {
  const { notifications, viewedIDs, markAsViewed } = useNotifications();

  useEffect(() => {
    Log("info", "page", "All notifications page loaded");
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <Typography variant="h4" style={{ marginBottom: "24px", fontWeight: "bold" }}>
        All Notifications
      </Typography>
      {notifications.map((n) => (
        <Card
          key={n.ID}
          style={{
            marginBottom: "16px",
            border: viewedIDs.has(n.ID) ? "1px solid #ccc" : "2px solid #1976d2",
            backgroundColor: viewedIDs.has(n.ID) ? "#f5f5f5" : "#e3f2fd",
            cursor: "pointer",
          }}
          onClick={() => markAsViewed(n.ID)}
        >
          <CardContent>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography style={{ fontWeight: viewedIDs.has(n.ID) ? "normal" : "bold" }}>
                {n.Message}
              </Typography>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <Chip label={n.Type} color={typeColor[n.Type]} size="small" />
                {!viewedIDs.has(n.ID) && (
                  <Chip label="New" color="error" size="small" />
                )}
              </div>
            </div>
            <Typography variant="caption" style={{ color: "#666" }}>
              {n.Timestamp}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}