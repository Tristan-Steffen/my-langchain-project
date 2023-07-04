import { OpenAI } from "langchain/llms/openai";
import dotenv from "dotenv";

dotenv.config();

async function run() {
  const openAI = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 });

  const res = await openAI.call("What is a good name for a company that makes Socks?");
  console.log("Generated Text:", res);
}

run();