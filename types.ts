export interface BookData {
  title: string;
  author: string;
  synopsis: string;
  style: string;
}

export interface GeneratedText {
  clickbait: string;
  short_caption: string;
  long_caption: string;
}

export interface GeneratedContent {
  covers: string[]; // Array of base64 strings
  text: GeneratedText;
}

export const BOOK_STYLES = [
  { id: 'cinematic', label: 'Cinematic Movie Poster', desc: 'Dramatic lighting, realistic textures' },
  { id: 'minimalist', label: 'Minimalist Vector', desc: 'Clean lines, bold colors, symbolic' },
  { id: 'fantasy', label: 'Epic Fantasy', desc: 'Magical atmosphere, digital painting style' },
  { id: 'romance', label: 'Soft Romance', desc: 'Pastel tones, dreamy, emotional' },
  { id: 'thriller', label: 'Dark Thriller', desc: 'High contrast, shadows, mysterious' },
  { id: 'cyberpunk', label: 'Cyberpunk / Sci-Fi', desc: 'Neon lights, futuristic elements' },
  { id: 'watercolor', label: 'Artistic Watercolor', desc: 'Fluid, organic, hand-painted look' },
  { id: 'horror', label: 'Gothic Horror', desc: 'Gritty, dark, terrifying atmosphere' },
  { id: 'anime', label: 'Anime / Manga', desc: 'Japanese animation style, expressive' },
  { id: 'vintage', label: 'Vintage Retro', desc: 'Old paper texture, classic typography style' },
];