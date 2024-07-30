"use client";
import { useEffect, useState } from "react";

// import { socket } from "@/lib/socket";
import { CallTranascript } from "./call-transcript";

import io from "socket.io-client";
export const socket = io("http://localhost:3000");

export function CallLog() {
  const [callStatus, setCallStatus] = useState<string | null>(null);
  useEffect(() => {
    socket.on("update_client", (data) => {
      console.log("Recieved from SERVER ::", data);
      // setCallStatus(data);
      // Execute any command
    });
  }, [socket]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between bg-primary px-4 py-2 rounded-md text-primary-foreground font-medium">
        <span>Call Status:</span>
        <span>{callStatus ?? "--"}</span>
      </div>
      <CallTranascript />
    </div>
  );
}
