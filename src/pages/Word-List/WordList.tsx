import { useState, useEffect } from "react";
import type {
  APIResponse,
  WordEntry as WordEntryType,
  APIEntry,
  APISense,
} from "../../interface/Interface";
import { Words } from "../../constants/Constant";

type DayKey = keyof typeof Words;

const WordList: React.FC = () => {
  const [activeDay, setActiveDay] = useState<DayKey>("Day 1");
  const [wordsWithEntries, setWordsWithEntries] = useState<WordEntryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeanings = async () => {
      setLoading(true);
      setError(null);

      try {
        const dayWords = Words[activeDay];

        const fetchedData: WordEntryType[] = await Promise.all(
          dayWords.map(async (word: string) => {
            const res = await fetch(
              `https://freedictionaryapi.com/api/v1/entries/en/${word}`
            );
            if (!res.ok) throw new Error(`Failed to fetch ${word}`);
            const data: APIResponse = await res.json();

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

        setWordsWithEntries(fetchedData);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMeanings();
  }, [activeDay]);

  const days = Object.keys(Words) as DayKey[];

  return (
    <div className="flex min-h-screen">
      <div className="w-48 bg-[#1a1919] bg-opacity-80 p-3 overflow-y-auto">
        <h2 className="text-white text-lg font-[800] mb-3">Days</h2>
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`block w-full text-left px-3 py-2 mb-1 rounded-md transition ${
              activeDay === day
                ? "bg-white text-black font-semibold"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-extrabold text-white mb-6">
          {activeDay} Vocabulary
        </h1>

        {loading && <p className="text-gray-300">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <ul className="space-y-4 grid grid-cols-12 gap-x-4 gap-y-2">
          {wordsWithEntries.map((item) => (
            <li
              key={item.word}
              className="col-span-6 h-full p-4 border border-[#030303] rounded-lg bg-[black] hover:bg-[#1a1919] transition"
            >
              <p className="font-bold text-white text-[36px] mb-2 capitalize underline">
                {item.word}
              </p>

              {item.entries.map((entry, idx) => (
                <div key={idx} className="mb-2">
                  <p className="font-light text-[16px] text-white italic">
                    {entry.partOfSpeech}
                  </p>
                  <ul className="list-disc list-inside ml-4 text-gray-300">
                    {entry.senses.map((sense: APISense, i: number) => (
                      <li key={i}>{sense.definition}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WordList;
