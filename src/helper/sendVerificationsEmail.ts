import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "rr630822@gmail.com",
      to: email,
      subject: "WhisperWire || Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Verification email sent successfully " };
  } catch (emailError) {
    console.log("Error sending Verification email", emailError);
    return { success: false, message: "Failed to send Verification email" };
  }
}