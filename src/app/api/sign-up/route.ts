import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { sendVerificationEmail } from "@/helper/sendVerificationsEmail";

import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const user = UserModel.findOne({ email });
    if (user) {
      throw new Error("This email is already in use.");
    }
  } catch (error) {
    console.log("Error while Resgistering the user");
    return Response.json(
      {
        success: false,
        message: "Error while Resgistaring the User",
      },
      {
        status: 500,
      }
    );
  }
}