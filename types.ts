export interface BookData {
  title: string;
  author: string;
  synopsis: string;
  style: string;
}

export interface GeneratedText {
  clickbait: string[];
  short_caption: string;
  long_caption: string;
  promo_130: string; // New: 130 words promo
  promo_250: string; // New: 250 words promo
}

export interface GeneratedContent {
  covers: string[];
  text: GeneratedText;
}

export const BOOK_STYLES = [
  { id: 'photographic', label: 'Photographic Realism', desc: 'Real people, cinematic lighting, movie-poster look' },
  { id: 'vector', label: 'Modern Vector', desc: 'Flat illustration, clean shapes, bold colors (Trending for RomCom)' },
  { id: 'digital-painting', label: 'Epic Digital Painting', desc: 'Highly detailed, painterly, fantasy/game art style' },
  { id: 'minimalist', label: 'Minimalist Symbolic', desc: 'Simple bold icon, negative space, clean typography focus' },
  { id: 'double-exposure', label: 'Double Exposure', desc: 'Character silhouette filled with scenery/landscape' },
  { id: 'typography-heavy', label: 'Big Bold Typography', desc: 'Large dominant text intertwined with minimal graphics' },
  { id: 'historical', label: 'Historical Fine Art', desc: 'Oil/Classic painting style, vintage texture' },
  { id: 'noir', label: 'Dark Noir & Gritty', desc: 'High contrast, shadows, black & white, mystery vibe' },
  { id: 'neon', label: 'Neon Cyberpunk', desc: 'Glowing lights, futuristic tech, dark background' },
  { id: 'watercolor', label: 'Soft Watercolor', desc: 'Fluid, pastel colors, dreamy, romantic atmosphere' },
  { id: 'anime', label: 'Anime / Manhwa', desc: 'Japanese animation style, expressive characters' },
  { id: 'horror', label: 'Gothic Horror', desc: 'Dark, terrifying, fog, distressed textures' },
  { id: 'abstract', label: 'Abstract / Geometric', desc: 'Shapes, patterns, conceptual, modern literary look' },
  { id: 'silhouette', label: 'Silhouette & Fog', desc: 'Backlit figures, mysterious atmosphere, thriller vibe' },
  { id: '3d-pixar', label: '3D Character', desc: 'Cute, plastic textures, bright lighting (Middle Grade)' },
];