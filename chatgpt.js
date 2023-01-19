import { ChatGPTAPIBrowser } from "chatgpt";
import * as dotenv from "dotenv";
dotenv.config();

const api = new ChatGPTAPIBrowser({
  email: process.env.CHATGPT_EMAIL,
  password: process.env.CHATGPT_PASSWORD,
  isGoogleLogin: true,
  markdown: false,
});

export default api;
