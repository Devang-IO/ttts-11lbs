export interface Voice {
  id: string;
  name: string;
  gender: string;
  languageCode: string;
  languageName: string;
  engine: string;
}

export interface AudioSettings {
  speed: number;
  pitch: number;
  volume: number;
  format: string;
}

export interface TextStats {
  characters: number;
  words: number;
  estimatedTime: number;
}

export interface AudioSettings {
  speed: number;
  pitch: number;
  volume: number;
  format: string;
}
