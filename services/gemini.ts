
import { GoogleGenAI, Type } from "@google/genai";
import { AnalystReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getAnalystReport = async (data: string): Promise<AnalystReport> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a high-level quantitative financial analyst from the year 2002 who has somehow seen the future of "stablecoins". Provide a report based on this data: ${data}. 
      Return the response in a funny but serious retro tone.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A summary of current growth trends." },
            outlook: { type: Type.STRING, description: "Predicting the next 'internet bubble' or success." },
            hotTake: { type: Type.STRING, description: "A witty, retro-style market observation." }
          },
          required: ["summary", "outlook", "hotTake"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      summary: "Stablecoins are showing exponential growth despite the 56k modem lag.",
      outlook: "Bullish on digital dollars, bearish on pets.com.",
      hotTake: "Tron is the new GeoCities of finance!"
    };
  }
};
