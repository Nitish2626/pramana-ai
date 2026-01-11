import { auth } from "@/lib/auth";
// import { chat } from "@/lib/chat";
import { vectorStore } from "@/lib/prepate";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ status: 401, message: "Unauthorized" });
    }

    const { prompt } = await request.json();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        const llm = new ChatGoogleGenerativeAI({
          model: "gemini-2.5-flash-lite",
          temperature: 0,
          callbacks: [
            {
              handleLLMNewToken(token) {
                controller.enqueue(encoder.encode(token));
              },
            },
          ],
        });

        const questionChunks = await vectorStore.similaritySearch(prompt);
        //   console.log("qc", questionChunks);
        const context = questionChunks
          .map((chunk) => chunk.pageContent)
          .join("\n\n");
        //   console.log("context", context);

        const SystemPrompt = `You are an assistant for question answering task. Use the following relevant pieces of retrieved context to answer the question. If you don't know the answer, say i don't know.`;
        const userQuery = `Question: ${prompt}
        Relevant Context: ${context}
        Answer: `;

        await llm.invoke([
          ["system", SystemPrompt],
          ["human", userQuery],
        ]);

        // console.log("msg ai", aiMsg);
        controller.close();
      },
    });

    console.log("stream", stream);

    // const response = await chat(prompt);
    // console.log("chat res", response);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });

    // return NextResponse.json({
    //   status: 200,
    //   message: "Success",
    //   data: stream,
    // });
  } catch (error) {
    console.log("B_GET_CHAT ERROR");
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error !",
    });
  }
};
