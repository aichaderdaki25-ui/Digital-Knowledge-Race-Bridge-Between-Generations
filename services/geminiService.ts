import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";
import { FALLBACK_QUESTIONS } from "../constants";

export const generateQuestions = async (count: number = 5): Promise<Question[]> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("No API Key found. Using fallback questions.");
    return FALLBACK_QUESTIONS;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `Generate ${count} diverse multiple-choice quiz questions about Moroccan culture, history, food, music, and traditions. 
    The questions should be suitable for a mixed audience of students and elders.
    Ensure a good mix of difficulty.
    Include a short 'fact' or explanation for each answer.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              correctAnswerIndex: { type: Type.INTEGER },
              category: { 
                type: Type.STRING, 
                enum: ['History', 'Food', 'Music', 'Traditions', 'Geography'] 
              },
              fact: { type: Type.STRING }
            },
            required: ["id", "text", "options", "correctAnswerIndex", "category", "fact"]
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text) as Question[];
      return data;
    }
    
    return FALLBACK_QUESTIONS;
  } catch (error) {
    console.error("Error generating questions:", error);
    return FALLBACK_QUESTIONS;
  }
};
