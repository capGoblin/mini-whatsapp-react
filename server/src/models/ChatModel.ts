import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  author: String,
  activeChatName: String,
  message: String,
  time: String,
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;