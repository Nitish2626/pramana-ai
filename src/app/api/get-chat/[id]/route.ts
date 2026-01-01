import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/connectToDatabase";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ChatModel } from "../../../../../models/chatModel";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectToDatabase();

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const convId= (await params).id;
    console.log("params", convId);

    if (!convId) {
      return NextResponse.json({
        status: 404,
        message: "Conversation id not found !",
      });
    }

    const getChats = await ChatModel.find({
      userId: session?.user?.id,
      conversationId: convId,
    });
    // console.log("getchats", getChats);

    return NextResponse.json({
      status: 200,
      message: "Chats found successfully!",
      data: getChats,
    });
  } catch (error) {
    console.log("B_GET_CHAT ERROR", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error !",
    });
  }
};
