// import { Request, Response } from "express";
// import { openai } from "../../config/openai.config";
// import { AssistantChat } from "./ai.model";

// export const askAssistant = async (req: Request, res: Response) => {
//   try {
//     const { userId, question } = req.body;

//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo", // or "gpt-3.5-turbo gpt-4o"
//       messages: [{ role: "user", content: question }],
//     });

//     const response = completion.choices[0]?.message.content || "No response";

//     // Save to DB
//     await AssistantChat.create({ userId, question, response });

//     res.json({ response });
//   } catch (error) {
//     console.error("AI Assistant Error:", error);
//     res.status(500).json({ error: "AI assistant failed" });
//   }
// };

////////////////////////////////////
import { Request, Response } from 'express';
import { AssistantChat } from './ai.model';
import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../../config/index';

if (!config.apiKey) {
  throw new Error('Missing Gemini API Key');
}

const genAI = new GoogleGenerativeAI(config.apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
console.log(config.apiKey);
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

const askAssistant = async (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    console.log(question);
    // if (!question || typeof question !== "string" || !question.trim()) {
    //   return res.status(400).json({ error: "Invalid or empty question" });
    // }

    const chat = model.startChat({ generationConfig, history: [] });
    const result = await chat.sendMessage(question);
    const response = result.response.text();

    await AssistantChat.create({ question, response });

    res.json({ response });
  } catch (error) {
    res
      .status(500)
      .json({
        error: 'AI assistant failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
  }
};

export { askAssistant };
