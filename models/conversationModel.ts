import mongoose, { model, models, Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ConversationModel =
  models.Conversation || model("Conversation", conversationSchema);
