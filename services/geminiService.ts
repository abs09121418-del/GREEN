
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBio = async (profession: string, interests: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Mening kasbim: ${profession}. Qiziqishlarim: ${interests}. 
                 Mening bio-link sahifam uchun o'zbek tilida qisqa, 
                 kreativ va professional 1-2 jumlali bio yozib ber.`,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    return response.text?.trim() || "Kreativ shaxs va mutaxassis.";
  } catch (error) {
    console.error("Bio generation error:", error);
    return "Xatolik yuz berdi. Iltimos qayta urinib ko'ring.";
  }
};
