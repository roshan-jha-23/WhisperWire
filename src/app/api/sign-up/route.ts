import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { sendVerificationEmail } from "@/helper/sendVerificationsEmail";

import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const existingUserVerifiedBYUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedBYUsername) {
      return Response.json(
        {
          success: false,
          message: "Username Already Taken",
        },
        { status: 400 }
      );
    }
    const existingUserByEmail = await UserModel.findOne({ email });
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail) {
      if(existingUserByEmail.isVerified){
        return Response.json(
          {
            success: false,
            message: "User Alreday registered with this email"
          },
          { status: 400 }
        );
      }else{
        const hashedPassword=await bcrypt.hash(password,10)
        existingUserByEmail.password=hashedPassword;
        existingUserByEmail.verifyCode=OTP;
        existingUserByEmail.verifyCodeExpiry=new Date(Date.now()+3600000)
        await existingUserByEmail.save()
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode: OTP,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }
      // Send Verification Email to user's registered email id with the generated OTP
      const emailResponse = await sendVerificationEmail(email, username, OTP);
      if (!emailResponse.success) {
        return Response.json(
          { success: false, message: emailResponse.message },
          { status: 500 }
        );
      }
      return Response.json(
        { success: false, message: emailResponse.message },
        { status: 500 }
      );
    }
  catch (error) {
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
