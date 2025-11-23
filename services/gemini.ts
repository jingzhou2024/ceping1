import { GoogleGenAI } from "@google/genai";
import { AssessmentTask } from "../types";

export const generateAssessmentAnalysis = async (task: AssessmentTask, answers: Record<string, number>) => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found in environment variables.");
    return "API Key missing. Cannot generate AI analysis.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Construct a prompt based on the mock data
    const prompt = `
      As an expert HR consultant, provide a brief, professional personality and capability analysis (approx 150 words) based on the following assessment metadata.
      
      Assessment: ${task.title}
      Description: ${task.description}
      User's Response Pattern (1-6 scale where 6 is Strongly Agree):
      ${JSON.stringify(answers)}
      
      Analyze the user's strengths and potential areas for improvement. Use a supportive and professional tone.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating AI analysis:", error);
    return "Failed to generate AI analysis. Please try again later.";
  }
};
