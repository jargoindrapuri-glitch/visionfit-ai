
import { GoogleGenAI } from "@google/genai";
import { TryOnRequest, TryOnResult } from "../types";

const API_KEY = process.env.API_KEY;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY || '' });
  }

  /**
   * Simulates the Identity-Preserving Virtual Try-On using Gemini's image editing capabilities.
   * In a production environment, this would call a specialized VTON API like IDM-VTON.
   * For this demo, we use Gemini to "photoshop" the garment onto the person or generate the scene.
   */
  async performTryOn(request: TryOnRequest): Promise<TryOnResult> {
    try {
      if (!API_KEY) {
        throw new Error("API Key not found");
      }

      const prompt = `
        Virtual Try-On Task:
        Please generate a hyper-realistic high-resolution photograph of a person with the following characteristics:
        - Height: ${request.height} cm
        - Weight: ${request.weight} kg
        
        The person should be wearing this garment: ${request.garmentType}.
        Style: The garment should look like this reference: ${request.productImageUrl}.
        
        IMPORTANT: 
        1. Maintain the identity and facial features of the person in the provided user image.
        2. Ensure the fit matches the height and weight provided.
        3. The lighting should be professional studio lighting.
        4. Focus on realistic fabric texture, creases, and shadows.
      `;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: prompt },
            ...(request.userImageBase64 ? [{
              inlineData: {
                data: request.userImageBase64,
                mimeType: 'image/jpeg'
              }
            }] : [])
          ]
        },
        config: {
          imageConfig: {
            aspectRatio: "3:4"
          }
        }
      });

      let generatedImageUrl = '';
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (!generatedImageUrl) {
        throw new Error("Failed to generate image from API response");
      }

      return {
        imageUrl: generatedImageUrl,
        status: 'success'
      };
    } catch (error) {
      console.error("Try-On Error:", error);
      return {
        imageUrl: '',
        status: 'error',
        message: error instanceof Error ? error.message : "An unexpected error occurred."
      };
    }
  }
}

export const geminiService = new GeminiService();
