
import { GoogleGenAI } from "@google/genai";
import { Message, DailySnapshot } from '../types';

// Initializing the Google GenAI SDK with the API key from environment variables as required by coding guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDailyQuote = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a short, powerful, and unique motivational quote for a productivity app. One sentence only.",
    });
    return response.text?.trim() || "Rise every day, better than before.";
  } catch (error) {
    console.error("Error fetching quote:", error);
    return "Rise every day, better than before.";
  }
};

export const chatWithGemini = async (messages: Message[]): Promise<string> => {
  try {
    const lastMessage = messages[messages.length - 1].text;
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: 'You are DailyRise Assistant, a productivity coach. Help users with task management, time blocking, and motivation. Keep responses concise and encouraging.',
      },
    });
    const response = await chat.sendMessage({ message: lastMessage });
    return response.text || "I'm having trouble connecting. Let's try again!";
  } catch (error) {
    console.error("Chat error:", error);
    return "Something went wrong with the AI connection.";
  }
};

export const predictUserState = async (history: DailySnapshot[]): Promise<string> => {
  try {
    const historyString = JSON.stringify(history);
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analyze this user activity history for the past weeks and predict their state of mind (burnout, high motivation, depressed, etc.). Provide a professional assessment for a support team. History: ${historyString}`,
    });
    return response.text || "Assessment unavailable.";
  } catch (error) {
    console.error("Prediction error:", error);
    return "Error generating state prediction.";
  }
};
