import { GoogleGenAI, Type, SchemaType } from "@google/genai";
import { BookData, GeneratedText } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateMarketingText = async (data: BookData): Promise<GeneratedText> => {
  if (!apiKey) throw new Error("API Key is missing");

  const prompt = `
    Create a marketing package for a fiction story.
    Title: ${data.title}
    Author: ${data.author}
    Synopsis: ${data.synopsis}
    
    Tasks:
    1. Create a "clickbait" title that is catchy and intriguing.
    2. Write a "short_caption" (approx 100 words). It MUST start with a strong Hook and end with a Cliffhanger that serves as a Call to Action (CTA).
    3. Write a "long_caption" (approx 500 words). It MUST be engaging, immersive, start with a powerful Hook, and end with a suspenseful Cliffhanger CTA.
    
    Language: Indonesian (Bahasa Indonesia).
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          clickbait: { type: Type.STRING },
          short_caption: { type: Type.STRING },
          long_caption: { type: Type.STRING },
        },
        required: ['clickbait', 'short_caption', 'long_caption'],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("Failed to generate text");
  
  return JSON.parse(text) as GeneratedText;
};

export const generateSingleCover = async (data: BookData, seedOffset: number): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing");

  // Providing variation by slightly tweaking the prompt based on seed/index
  const variations = [
    "Close-up composition",
    "Wide angle scene",
    "Character focused",
    "Symbolic and atmospheric"
  ];

  const variation = variations[seedOffset % variations.length];

  const prompt = `
    Create a stunning, high-quality book cover art.
    Title context: ${data.title}
    Genre/Style: ${data.style}
    Synopsis context: ${data.synopsis}
    
    Key Visual Requirements:
    1. Aspect Ratio: Vertical Portrait (compatible with 2:3).
    2. Faces/Characters: Must depict people of Asian or Indonesian descent.
    3. Composition: ${variation}.
    4. Quality: 4k resolution, highly detailed, trending on artstation.
    5. Do NOT include text on the image if possible, focus on the illustration.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image', // Using flash-image for speed and efficiency for demo
    contents: {
        parts: [{ text: prompt }]
    },
    config: {
        imageConfig: {
            aspectRatio: "3:4", // Closest API supported ratio to 2:3
        }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No image generated");
};

export const generateBookAssets = async (data: BookData): Promise<{ text: GeneratedText; covers: string[] }> => {
  
  // 1. Generate Text
  const textPromise = generateMarketingText(data);

  // 2. Generate 4 Covers in parallel
  // We call the API 4 times to get 4 distinct variations
  const coverPromises = [0, 1, 2, 3].map(i => generateSingleCover(data, i));

  try {
    const [text, ...covers] = await Promise.all([textPromise, ...coverPromises]);
    return { text, covers };
  } catch (error) {
    console.error("Error generating assets:", error);
    throw error;
  }
};