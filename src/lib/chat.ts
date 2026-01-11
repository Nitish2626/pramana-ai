import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { vectorStore } from "./prepate";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  temperature: 0,
  callbacks:[
    {
      handleLLMNewToken(token){
        
      }
    }
  ]
});

export const chat = async (prompt: string) => {
  try {
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

    const aiMsg = await llm.invoke([
      ["system", SystemPrompt],
      ["human", userQuery],
    ]);

    // console.log("ai msg",aiMsg.content);
    return aiMsg.content;
  } catch (error) {
    console.log("err", error);
  }
};
