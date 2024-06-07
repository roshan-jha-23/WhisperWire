import { Message } from "@/model/User";

export interface ApiResponse {
  user:object;
  success: boolean;
  message: string;
  isAcceptingMessage?: boolean;
  messages?: Array<Message>;
}
