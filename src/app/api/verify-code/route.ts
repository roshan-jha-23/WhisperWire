import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();
    const decodeUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodeUsername });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Cannot Find the Username Check Properly",
        },
        { status: 500 }
      );
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();
    if (isCodeValid && isCodeExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "User Has Been Verified",
        },
        { status: 200 }
      );
    } else if (!isCodeExpired) {
      return Response.json(
        { success: false, message: " Code Has Expired" },
        { status: 500 }
      );
    } else {
      return Response.json(
        { success: false, message: " Code is Not Verified " },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error checking Code", error);
    return Response.json(
      { success: false, message: "Error checking Code" },
      { status: 500 }
    );
  }
}
