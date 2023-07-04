import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import dotenv from "dotenv";

dotenv.config();

async function run() {
  const openAI = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 });

  const template = "What is a good name for a company that makes {product}?";
  const prompt = new PromptTemplate({
    template: template,
    inputVariables: ["product"],
  });


  const input = await prompt.format({ product: "colorful socks" });

  try {
    const res = await openAI.call(input);
    console.log("Generated Text:", res);
  } catch (error) {
    console.error("Error:", error);
  }
}

run();