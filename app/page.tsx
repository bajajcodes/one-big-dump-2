"use client";
import { CallActions } from "@/components/call-actions";
import { CallLog } from "@/components/call-log";
import { useEffect } from "react";

import io from "socket.io-client";
const socket = io("http://localhost:3000");

export default function Home() {
  useEffect(() => {
    socket.on("message2", (data) => {
      console.log("Recieved from SERVER ::", data);
      // Execute any command
    });
  }, [socket]);
  return (
    <main className="grid grid-cols-2 gap-6 min-h-screen justify-between p-24">
      <CallActions />
      <CallLog />
    </main>
  );
}
