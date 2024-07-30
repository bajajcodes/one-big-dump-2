"use client";
import { useState } from "react";

export function CallTranascript() {
  const [callTranscript, setCallTranscript] = useState<any>(null);
  return (
    <div className="rounded-md border bg-background p-4 shadow-sm">
      <div className="flex items-center justify-between bg-primary px-4 py-2 rounded-md text-primary-foreground font-medium">
        <span>Call Transcript</span>
        <span>{JSON.stringify(callTranscript)}</span>
      </div>
    </div>
  );
}
