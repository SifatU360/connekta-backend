import { Schema, model } from "mongoose";

const assistantChatSchema = new Schema(
  {
    // userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: String, required: true },
    response: { type: String, required: true },
  },
  { timestamps: true }
);

export const AssistantChat = model("AssistantChat", assistantChatSchema);