import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/model/User";

export const sendEmail = async ({
  email,
  otp,
  username,
  emailType,
  userId,
}:any) => {
  try {
    if (
      !process.env.SENDER_MAIL ||
      !process.env.SENDER_MAIL_PASS 
    ) {
      throw new Error("Missing environment variables");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.SENDER_MAIL_PASS,
      },
    });

    const salt = await bcryptjs.genSalt(10);
    const hashedOtp = await bcryptjs.hash(otp, salt);

    const updateUserFields = {
      verifyToken: hashedOtp,
      verifyTokenExpiry: Date.now() + 3600000, // 1 hour
    };

    await User.findByIdAndUpdate(userId, { $set: updateUserFields });

    const mailOptions = {
      from: process.env.SENDER_MAIL,
      to: email,
      subject: `Your OTP Code`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hello, ${username}</h2>
          <p>Thank you for registering. Your OTP code is below:</p>
          <h3>${otp}</h3>
          <p>This OTP is valid for 1 hour.</p>
          <p>If you did not request this, please ignore this email.</p>
          <p>Thanks,</p>
          <p>Your Company Team</p>
        </div>
      `,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: "OTP email sent successfully",
    };
  } catch (error:any) {
    throw new Error(error.message);
  }
};
