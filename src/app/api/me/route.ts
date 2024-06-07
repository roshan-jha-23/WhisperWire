import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
import  dbConnect  from "@/lib/dbConnect";
import User from "@/model/User";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password").lean(); 

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
