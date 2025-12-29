import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ConversationModel } from "../../../../models/conversationModel";

export const POST = async (request: NextRequest) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const chatsData = await request.json();

    const conversationId = crypto.randomUUID();
    const isConversationExists = await ConversationModel.find({
      _id: conversationId,
    });

    if (!isConversationExists) {
      const newConversation = new ConversationModel({
        userId: session?.user.id,
        title: chatsData.prompt,
      });
      await newConversation.save();
    }

    console.log("session", session);
    console.log("b chatsData", chatsData);

    // const newChat = new ;
    // await newChat.save();
    // return NextResponse.json({
    //   status: 200,
    //   message: "New chat added successfully !",
    // });
  } catch (error) {
    console.log("B_ADD_CHAT ERROR", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error !",
    });
  }
};
