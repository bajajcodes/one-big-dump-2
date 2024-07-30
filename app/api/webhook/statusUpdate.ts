import { BaseVapiPayload, VapiWebhookEnum } from "./route";

export const VAPI_CALL_STATUSES = [
  "queued",
  "ringing",
  "in-progress",
  "forwarding",
  "ended",
] as const;
export type VapiCallStatus = (typeof VAPI_CALL_STATUSES)[number];
export interface StatusUpdatePayload extends BaseVapiPayload {
  type: VapiWebhookEnum.STATUS_UPDATE;
  status: VapiCallStatus;
  messages?: Array<unknown>;
}

export interface StatusUpdateMessageResponse {}

export const statusUpdateHandler = async (
  payload?: StatusUpdatePayload
): Promise<StatusUpdateMessageResponse> => {
  /**
   * Handle Business logic here.
   * Sent during a call whenever the status of the call has changed.
   * Possible statuses are: "queued","ringing","in-progress","forwarding","ended".
   * You can have certain logic or handlers based on the call status.
   * You can also store the information in your database. For example whenever the call gets forwarded.
   */
  const callId = payload?.call.phoneCallProviderId;
  console.log({ callId });
  // if (callId && !db?.[callId]) {
  //   db[callId] = {
  //     phoneCallProviderId: callId,
  //     status: payload.status,
  //   };
  // }
  // if (callId && db?.[callId]) {
  //   const prev = db[callId];
  //   db[callId] = {
  //     ...prev,
  //     status: payload.status,
  //   };
  // }
  // socket.emit("statusUpdate1", payload?.status);
  // console.log({ db });
  return payload?.status ?? "";
};
