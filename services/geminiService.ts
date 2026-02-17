
import { GoogleGenAI } from "@google/genai";
import { TryOnRequest, TryOnResult } from "../types";

export class GeminiService {
  /**
   * Performs an identity-preserving virtual try-on using high-fidelity prompt tuning.
   * Optimized for Gemini 2.5 Flash Image (Nano Banana).
   */
  async performTryOn(request: TryOnRequest): Promise<TryOnResult> {
    try {
      // Re-initialize right before use to pick up injected keys from AI Studio dialog
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API Key not found. Please connect your API key.");
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `You are an elite virtual try-on AI (VisionFit AI). Your specialty is rendering a person from a portrait (Image 1) wearing a specific garment from a reference (Image 2) with absolute realism.

CRITICAL CONSTRAINTS:
1. IDENTITY PRESERVATION: Keep the person's face, eyes, hair, skin tone, and features 100% identical to Image 1.
2. BACKGROUND & POSE PRESERVATION: Use the EXACT background and the EXACT body pose from Image 1. Do NOT use the background or the pose of the model in Image 2.
3. PHYSICS & FIT: Adjust the garment from Image 2 to fit the person's body shape and pose in Image 1. Account for their height (${request.adjustment_params.height}cm) and weight (${request.adjustment_params.weight}kg).
4. LIGHTING: Match the garment's lighting and shadows perfectly to the environment and lighting direction in Image 1.
5. TEXTURE: Maintain high-fidelity texture of the fabric.
6. CLEANUP: Remove any text, prices, or watermarks from the final render.`;

      const prompt = `Render a high-resolution version of Image 1 where the person is wearing the exact garment from Image 2.
- Preserve Identity: Face, hair, and skin from Image 1 must be identical.
- Background & Pose: Use the background and pose from Image 1.
- Physics: Drape the ${request.category} naturally over the person.`;

      const parts: any[] = [{ text: prompt }];

      // Helper for base64
      const isBase64 = (str: string) => str.startsWith('data:');

      // Add Image 1 (User Portrait)
      if (isBase64(request.user_image)) {
        const [mime, data] = request.user_image.split(',');
        const mimeType = mime.match(/:(.*?);/)?.[1] || 'image/jpeg';
        parts.push({ inlineData: { data, mimeType } });
      } else {
        parts.push({ text: `User Image (Image 1): ${request.user_image}` });
      }

      // Add Image 2 (Garment Reference)
      if (isBase64(request.garment_image)) {
        const [mime, data] = request.garment_image.split(',');
        const mimeType = mime.match(/:(.*?);/)?.[1] || 'image/jpeg';
        parts.push({ inlineData: { data, mimeType } });
      } else {
        parts.push({ text: `Garment Image (Image 2): ${request.garment_image}` });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: {
          systemInstruction: systemInstruction,
          imageConfig: {
            aspectRatio: "3:4"
          }
        }
      });

      let generatedImageUrl = '';
      const candidate = response.candidates?.[0];
      
      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (!generatedImageUrl) {
        throw new Error(response.text || "The AI render engine failed to produce an image. Please try a clearer portrait.");
      }

      return {
        imageUrl: generatedImageUrl,
        status: 'success'
      };
    } catch (error: any) {
      console.error("Gemini Service Error:", error);
      
      // Check for quota exhaustion (429)
      if (error.message?.includes('429') || error.message?.toLowerCase().includes('quota') || error.status === 429) {
        return {
          imageUrl: '',
          status: 'error',
          message: "QUOTA_EXHAUSTED"
        };
      }

      return {
        imageUrl: '',
        status: 'error',
        message: error.message || "An unexpected error occurred during rendering."
      };
    }
  }
}

export const geminiService = new GeminiService();
