import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ConversationModel } from "../../../../models/conversationModel";
import { ChatModel } from "../../../../models/chatModel";
import { connectToDatabase } from "@/lib/connectToDatabase";

export const POST = async (request: NextRequest) => {
  try {
    await connectToDatabase();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ status: 401, message: "Unauthorized" });
    }

    const chatsData = await request.json();

    // console.log("session", session);
    // console.log("b chatsData", chatsData);
    let conversationId = chatsData.conversationId;

    if (!conversationId) {
      const newConversation = new ConversationModel({
        userId: session?.user.id,
        title: chatsData.prompt,
      });
      await newConversation.save();
      conversationId = newConversation._id;
      // console.log("new conv", newConversation);
    }

    const newChat = new ChatModel({
      userId: session?.user.id,
      conversationId: conversationId,
      prompt: chatsData.prompt,
      response: chatsData.response,
    });
    await newChat.save();

    // console.log("new chat", newChat);

    return NextResponse.json({
      status: 200,
      message: "New chat added successfully !",
      data: conversationId
    });
  } catch (error) {
    console.log("B_ADD_CHAT ERROR", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error !",
    });
  }
};
