import { GoogleGenAI, Type } from "@google/genai";
import { BookData, GeneratedText } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateMarketingText = async (data: BookData): Promise<GeneratedText> => {
  if (!apiKey) throw new Error("API Key is missing");

  const prompt = `
    Buat paket pemasaran viral untuk cerita fiksi berikut:
    Judul: ${data.title}
    Penulis: ${data.author}
    Sinopsis: ${data.synopsis}
    
    Tugas Anda:
    1. Buat 5 pilihan judul "clickbait" yang sangat menggoda dan memancing rasa penasaran (viral-worthy).
    2. Tulis "short_caption" (100 kata): Fokus pada hook pembuka yang kuat.
    3. Tulis "long_caption" (500 kata): Fokus pada narasi mendalam yang emosional.
    4. Tulis "promo_130" (130 kata): Gaya promosi online (TikTok/Instagram), sangat clickbait, TIDAK membocorkan isi cerita (no spoilers), fokus pada vibe dan konflik utama yang membuat orang ingin klik. Harus membuat pembaca merasa "rugi kalau tidak baca".
    5. Tulis "promo_250" (250 kata): Gaya promosi online yang lebih persuasif, misterius, tanpa spoiler, menonjolkan keunikan cerita (Unique Selling Point), diakhiri dengan cliffhanger yang memaksa pembaca segera mencari link bacanya.
    
    Aturan Penting:
    - Bahasa: Indonesia yang kekinian, persuasif, dan emosional.
    - Gunakan Hook yang sangat kuat di awal.
    - Akhiri dengan Cliffhanger/CTA (Call to Action) yang misterius.
    - Untuk promo_130 dan promo_250: JANGAN bocorkan plot twist atau rahasia penting cerita.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          clickbait: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          short_caption: { type: Type.STRING },
          long_caption: { type: Type.STRING },
          promo_130: { type: Type.STRING },
          promo_250: { type: Type.STRING },
        },
        required: ['clickbait', 'short_caption', 'long_caption', 'promo_130', 'promo_250'],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("Failed to generate text");
  
  return JSON.parse(text) as GeneratedText;
};

export const generateSingleCover = async (data: BookData, seedOffset: number): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing");

  const variations = [
    "Close-up portrait/object focus",
    "Wide angle scene showing the world",
    "Dynamic action/emotional pose",
    "Symbolic and atmospheric composition"
  ];

  const variation = variations[seedOffset % variations.length];

  const prompt = `
    Create a stunning, professional book cover design.
    Design Style: ${data.style}
    Story Context: ${data.synopsis}
    
    TEXT OVERLAY REQUIREMENTS (MANDATORY):
    1. Main Title: "${data.title.toUpperCase()}" 
       - Style: EXTREMELY BOLD, thick strokes, high-impact typography.
       - Positioning: Prominent, top or center-focused.
    2. Author Name: "Oleh ${data.author}"
       - Style: Thin, elegant, serif or light sans-serif font.
       - Positioning: Bottom center or small below the title.
    3. Readability: Ensure text color contrasts perfectly with background for 100% clarity.
    
    VISUAL REQUIREMENTS:
    - Composition: ${variation}.
    - Lighting: Professional studio lighting or dramatic atmospheric lighting appropriate for the genre.
    - Characters: Asian/Indonesian descent if humans are shown.
    - Quality: 4k, digital art, polished commercial finish.
    - Aspect Ratio: 3:4 (Standard vertical cover).
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image', 
    contents: {
        parts: [{ text: prompt }]
    },
    config: {
        imageConfig: {
            aspectRatio: "3:4", 
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
  const textPromise = generateMarketingText(data);
  const coverPromises = [0, 1, 2, 3].map(i => generateSingleCover(data, i));

  try {
    const [text, ...covers] = await Promise.all([textPromise, ...coverPromises]);
    return { text, covers };
  } catch (error) {
    console.error("Error generating assets:", error);
    throw error;
  }
};