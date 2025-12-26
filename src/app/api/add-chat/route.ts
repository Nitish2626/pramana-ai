import { NextRequest, NextResponse } from "next/server";
import { ChatModel } from "../../../../models/chatModel";

export const POST = async (request: NextRequest) => {
  try {
    const chatsData = await request.json();

    const newChat = new ChatModel(chatsData);
    await newChat.save();
    console.log("b chatsData", chatsData);
    return NextResponse.json({
      status: 200,
      message: "New chat added successfully !",
    });
  } catch (error) {
    console.log("B_ADD_CHAT ERROR");
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error !",
    });
  }
};
