import { BaseVapiPayload, VapiWebhookEnum } from "./route";

export interface TranscriptMessageResponse {}
export interface TranscriptPayload extends BaseVapiPayload {
  type: VapiWebhookEnum.TRANSCRIPT;
  role: "assistant" | "user";
  transcriptType: "partial" | "final";
  transcript: string;
}

export const transcriptHandler = async (
  payload?: TranscriptPayload
): Promise<TranscriptMessageResponse> => {
  /**
   * Handle Business logic here.
   * Sent during a call whenever the transcript is available for certain chunk in the stream.
   * You can store the transcript in your database or have some other business logic.
   */

  // if (payload?.transcriptType !== "final") return {};
  console.log({ transcript: payload?.transcript });
  // socket.emit("transcript1", payload);
  return (
    {
      role: payload?.role,
      transcript: payload?.transcript,
      type: payload?.transcriptType,
    } ?? {}
  );
};
