import React, { useState } from "react";
import useFetchContent from "../../hooks/useFetchContent";
import { SquareLoader } from "react-spinners";

interface WordCardProps {
  activeDay: string;
}

const WordCard: React.FC<WordCardProps> = (props: any) => {
  const { activeDay } = props;
  const { wordsData, loading, error } = useFetchContent(activeDay);
  const [flipped, setFlipped] = useState<{ [word: string]: boolean }>({});

  const toggleFlip = (word: string) => {
    setFlipped((prev) => ({ ...prev, [word]: !prev[word] }));
  };

  return (
    <div className="main-content flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto w-full min-h-screen bg-gray-800">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white mb-6 lg:mb-8 text-center lg:text-left">
        {activeDay} Flashcard
      </h1>

      {loading && (
        <div className="flex justify-center items-center h-[60vh]">
          <SquareLoader color="#fff" size={50} />
        </div>
      )}

      {error && (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-4 mb-6 text-center">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {wordsData?.map((item) => (
            <div
              key={item.word}
              className="w-full h-64 sm:h-72 lg:h-80 perspective"
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform ${
                  flipped[item.word] ? "rotate-y-180" : ""
                }`}
              >
                {/* Front */}
                <div className="absolute w-full h-full rounded-lg bg-black border border-gray-900 shadow-lg p-4 backface-hidden flex flex-col justify-center items-center">
                  <p className="font-bold text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl capitalize underline text-center">
                    {item.word}
                  </p>
                  <button
                    className="mt-4 px-4 py-2 bg-[#424242] text-white rounded hover:bg-gray-600 transition"
                    onClick={() => toggleFlip(item.word)}
                  >
                    Show Meaning
                  </button>
                </div>

                {/* Back */}
                <div className="absolute w-full h-full rounded-lg bg-gray-900 border border-gray-900 shadow-lg p-4 backface-hidden rotate-y-180 overflow-y-auto flex flex-col custom-scrollbar">
                  {item.entries.map((entry, idx) => (
                    <div key={idx} className="mb-3 last:mb-0">
                      <p className="font-light text-xs text-white sm:text-sm lg:text-[14px] xl:text-[16px] italic underline mb-2">
                        {entry.partOfSpeech}
                      </p>
                      <ul className="list-disc list-inside ml-3 space-y-1">
                        {entry.senses.slice(0, 3).map((sense, i) => (
                          <li
                            key={i}
                            className="text-gray-300 text-xs sm:text-sm lg:text-[14px] xl:text-[15px] leading-relaxed"
                          >
                            {sense.definition}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Centered Back Button */}
                  <button
                    className="mt-4 px-6 py-2 bg-[#424242] text-white rounded hover:bg-gray-600 transition mx-auto"
                    onClick={() => toggleFlip(item.word)}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && wordsData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No words found for {activeDay}
          </p>
        </div>
      )}

      {/* Tailwind Custom Classes */}
      <style>
        {`
          .perspective {
            perspective: 1000px;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
          .relative {
            transform-style: preserve-3d;
          }
        `}
      </style>
    </div>
  );
};

export default WordCard;
