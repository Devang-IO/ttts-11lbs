import { TextStats } from '../types';

export const analyzeText = (text: string): TextStats => {
  const characters = text.length;
  const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const estimatedTime = Math.ceil(words / 150); // Average reading speed

  return {
    characters,
    words,
    estimatedTime,
  };
};

export const detectLanguage = (text: string): string => {
  // Simple language detection based on character patterns
  const patterns = {
    'zh-CN': /[\u4e00-\u9fff]/,
    'ja-JP': /[\u3040-\u309f\u30a0-\u30ff]/,
    'ko-KR': /[\uac00-\ud7af]/,
    'ar-XA': /[\u0600-\u06ff]/,
    'hi-IN': /[\u0900-\u097f]/,
    'th-TH': /[\u0e00-\u0e7f]/,
    'ru-RU': /[\u0400-\u04ff]/,
    'es-ES': /[ñáéíóúü]/i,
    'fr-FR': /[àâäéèêëïîôöùûüÿç]/i,
    'de-DE': /[äöüß]/i,
  };

  for (const [lang, pattern] of Object.entries(patterns)) {
    if (pattern.test(text)) {
      return lang;
    }
  }

  return 'en-US'; // Default to English
};