import { getDataFromToken } from "@/helper/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { messageid: string } }
) {
  await dbConnect();
  const messageid = params.messageid;
  

  const userId = await getDataFromToken(request); 

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
  const updatedResult = await UserModel.updateOne(
    { _id: (userId) },
    { $pull: { messages: { _id: messageid } } } 
  );

    console.log(updatedResult)
    if (updatedResult.modifiedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Not able to fulfill request at the moment, please try again later",
        },
        { status: 400 } // Using 400 Bad Request status code for failure
      );
    }

    return NextResponse.json(
      { success: true, message: "Successfully deleted the message" },
      { status: 200 }
    );
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
