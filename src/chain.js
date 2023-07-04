import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import dotenv from "dotenv";

dotenv.config();

async function runChain() {
  const openAI = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 });

  const templateA = "What is a good name for a company that makes {product}?";
  const promptA = new PromptTemplate({
    template: templateA,
    inputVariables: ["product"],
  });
  const chainA = new LLMChain({ llm: openAI, prompt: promptA });
  const resA = await chainA.call({ product: "colorful socks" });
  console.log("Company Name:" + resA.text);


  const templateB = "What is a good slogan for a Company named {name}?";
  const promptB = new PromptTemplate({
    template: templateB,
    inputVariables: ["name"],
  });
  const chainB = new LLMChain({ llm: openAI, prompt: promptB });
  const resB = await chainB.call({ name: resA.text });
  console.log("Slogan:" + resB.text);
}

runChain();