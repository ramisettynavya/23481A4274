import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Log } from "../logger";

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  useEffect(() => {
    Log("info", "component", "Navbar rendered");
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Campus Notifications
        </Typography>
        <div style={{ display: "flex", gap: "16px" }}>
          <Button
            color="inherit"
            variant={currentPage === "all" ? "outlined" : "text"}
            onClick={() => {
              setCurrentPage("all");
              Log("info", "component", "Navigated to All Notifications");
            }}
          >
            All Notifications
          </Button>
          <Button
            color="inherit"
            variant={currentPage === "priority" ? "outlined" : "text"}
            onClick={() => {
              setCurrentPage("priority");
              Log("info", "component", "Navigated to Priority Inbox");
            }}
          >
            Priority Inbox
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}