import React, { useEffect, useState } from "react";
import { Chip, Card, CardContent, Typography, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useNotifications } from "../context/NotificationContext";
import { Log } from "../logger";

const PRIORITY_WEIGHT: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

const typeColor: Record<string, "primary" | "success" | "warning"> = {
  Placement: "primary",
  Result: "success",
  Event: "warning",
};

export default function PriorityInbox() {
  const { notifications, viewedIDs, markAsViewed } = useNotifications();
  const [topN, setTopN] = useState<number>(10);
  const [filterType, setFilterType] = useState<string>("All");

  useEffect(() => {
    Log("info", "page", "Priority inbox page loaded");
  }, []);

  const filtered = notifications
    .filter((n) => filterType === "All" || n.Type === filterType)
    .sort((a, b) => {
      const weightDiff = (PRIORITY_WEIGHT[b.Type] || 0) - (PRIORITY_WEIGHT[a.Type] || 0);
      if (weightDiff !== 0) return weightDiff;
      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    })
    .slice(0, topN);

  return (
    <div style={{ padding: "24px" }}>
      <Typography variant="h4" style={{ marginBottom: "24px", fontWeight: "bold" }}>
        Priority Inbox
      </Typography>

      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        <TextField
          label="Top N"
          type="number"
          value={topN}
          onChange={(e) => {
            setTopN(Number(e.target.value));
            Log("info", "component", "Top N filter changed");
          }}
          size="small"
          style={{ width: "100px" }}
        />
        <FormControl size="small" style={{ width: "150px" }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={filterType}
            label="Type"
            onChange={(e) => {
              setFilterType(e.target.value);
              Log("info", "component", "Notification type filter changed");
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </div>

      {filtered.map((n, i) => (
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
                #{i + 1} {n.Message}
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