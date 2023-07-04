import { OpenAI } from "langchain/llms/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { Calculator } from "langchain/tools/calculator";
import { GoogleCustomSearch } from 'langchain/tools';
import readline from 'readline';
import dotenv from "dotenv";

dotenv.config();

const model = new OpenAI({ 
  temperature: 0,
  verbose: true,
  openAIApiKey: process.env.OPENAI_API_KEY
});

const tools = [
  new GoogleCustomSearch({
    apiKey: process.env.GOOGLE_API_KEY,
    googleCSEId: process.env.GOOGLE_CSE_ID,
  }),
  new Calculator(),
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function question() {
  return new Promise((resolve) => {
      rl.question('> ', (answer) => {
          resolve(answer);
      });
  });
}

const executor = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: "zero-shot-react-description",
});
console.log("Loaded agent.");

const input = await question();
console.log(`Executing with input "${input}"...`);

const result = await executor.call({ input });

console.log(`Got output ${result.output}`);