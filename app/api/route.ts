import { socket } from "@/lib/socket";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // do something you need to do in the backend
    // (like database operations, etc.)

    socket.emit("message1", "Sync Process Completed:: /api/test");

    return NextResponse.json({ data: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error }, { status: 200 });
  }
}
