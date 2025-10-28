// src/hooks/useFetchContent.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Words } from "../constants/Constant";

import type {
  APIResponse,
  WordEntry as WordEntryType,
  APIEntry,
} from "../interface/Interface";

type DayKey = keyof typeof Words;

const useFetchContent = (activeDay: DayKey) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [wordsData, setWordsData] = useState<WordEntryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const dayWords: any = Words[activeDay];

        const fetchedData: WordEntryType[] = await Promise.all(
          dayWords.map(async (word: string) => {
            const response = await axios.get<APIResponse>(
              `https://freedictionaryapi.com/api/v1/entries/en/${word}`
            );

            const data = response.data;

            return {
              word,
              entries:
                data.entries?.map((entry: APIEntry) => ({
                  partOfSpeech: entry.partOfSpeech,
                  senses: entry.senses,
                })) || [],
            };
          })
        );

        setWordsData(fetchedData);
      } catch (err: any) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeDay]);

  return { wordsData, loading, error };
};

export default useFetchContent;
