import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/connectToDatabase";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { ConversationModel } from "../../../../models/conversationModel";

export const GET = async () => {
  try {
    await connectToDatabase();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ status: 401, message: "Unauthorized" });
    }

    const getConversation = await ConversationModel.find({
      userId: session?.user?.id,
    }).select("title");

    return NextResponse.json({
      status: 200,
      message: "Conversations found successfully!",
      data: getConversation,
    });
  } catch (error) {
    console.log("B_GET_CONVERSATION ERROR", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error !",
    });
  }
};
