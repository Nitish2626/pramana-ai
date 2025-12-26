import mongoose from "mongoose";
import { model, models, Schema } from "mongoose";

const chatSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chats: [
      {
        id: { type: String, required: true },
        prompt: { type: String, required: true },
        response: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const ChatModel = models.Chat || model("Chat", chatSchema);
