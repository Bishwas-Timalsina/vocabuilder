export interface APISense {
  definition: string;
  examples: string[];
}

export interface APIEntry {
  partOfSpeech: string;
  senses: APISense[];
}

export interface APIResponse {
  word: string;
  entries: APIEntry[];
}

export interface WordEntry {
  word: string;
  entries: APIEntry[];
}
