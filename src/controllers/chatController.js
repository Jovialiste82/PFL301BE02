// server/src/controllers/chatController.js
import { body, validationResult } from "express-validator";
import OpenAI from "openai";
import {
  systemConfig,
  temperature,
  max_tokens,
  top_p,
  frequency_penalty,
  presence_penalty,
  model,
} from "../config/chatConfig.js";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const validateChat = [body("messages.*.content").trim().escape()];

export const submitChat = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { messages } = req.body;

  const prompt = [
    { role: "system", content: systemConfig.content },
    ...messages,
  ];

  try {
    const response = await openai.chat.completions.create({
      model,
      messages: prompt,
      temperature,
      max_tokens,
      top_p,
      frequency_penalty,
      presence_penalty,
    });
    console.log("Success. Total tokens used: ", response.usage.total_tokens);
    res.json({
      message: "Chat successful",
      response: response.choices[0].message.content,
    });
  } catch (error) {
    console.log("Error catched in chatController.js:");
    res.status(500).json({ message: "Chat failed", error: error.message });
  }
};
