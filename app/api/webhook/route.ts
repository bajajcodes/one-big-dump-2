import { NextRequest, NextResponse } from "next/server";
// import {
//   endOfCallReportHandler,
//   EndOfCallReportPayload,
// } from "./endOfCallReport";
// import { socket } from "@/lib/socket";
import io from "socket.io-client";
import { statusUpdateHandler, StatusUpdatePayload } from "./statusUpdate";
import { transcriptHandler, TranscriptPayload } from "./transcript";
export const socket = io("http://localhost:3000");

export enum VapiWebhookEnum {
  STATUS_UPDATE = "status-update",
  END_OF_CALL_REPORT = "end-of-call-report",
  HANG = "hang",
  SPEECH_UPDATE = "speech-update",
  TRANSCRIPT = "transcript",
}

export interface VapiCall {
  phoneCallProviderId: string | undefined;
}
export interface BaseVapiPayload {
  call: VapiCall;
}
export type VapiPayload = StatusUpdatePayload | TranscriptPayload;
// | EndOfCallReportPayload

export interface ConversationMessage {
  role: "user" | "system" | "bot" | "function_call" | "function_result";
  message?: string;
  name?: string;
  args?: string;
  result?: string;
  time: number;
  endTime?: number;
  secondsFromStart: number;
}

export async function GET() {
  return NextResponse.json({ message: "hello webhook" });
}

export async function POST(request: NextRequest) {
  const conversationUuid = request.nextUrl.searchParams.get(
    "conversation_uuid"
  ) as string;
  if (conversationUuid) {
    // This way we can fetch some data from database and use it in the handlers.
    // Here you can fetch some context which will be shared accorss all the webhook events for this conversation.
    console.log("conversationUuid", conversationUuid);
  }
  const update: Partial<{ statusUpdate: any; transcript: any }> = {
    // statusUpdate: undefined,
    // transcript: undefined,
  };
  try {
    const payload = (await request.json()).message as VapiPayload;
    switch (payload.type) {
      case VapiWebhookEnum.STATUS_UPDATE:
        const statusUpdateResponse = await statusUpdateHandler(payload);
        update.statusUpdate = statusUpdateResponse;
        break;
      // socket.emit("update", { statusUpdate: statusUpdateResponse });
      // return NextResponse.json(statusUpdateResponse, {
      //   status: 201,
      // });
      case VapiWebhookEnum.TRANSCRIPT:
        const transcriptResponse = await transcriptHandler(payload);
        update.transcript = transcriptResponse;
        break;
      // socket.emit("update", { transcript: transcriptResponse });
      default:
        console.error(`Unhandled message type`);
    }
    socket.emit("update", update);
    console.log({ update });
    return NextResponse.json(update, {
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to place outbound call",
        error: error?.message,
      },
      { status: 500 }
    );
  }
}
