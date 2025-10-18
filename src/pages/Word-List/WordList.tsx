import { useState, useEffect, useCallback, useRef } from "react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const mainContentRef = useRef<HTMLDivElement>(null);

  // Fetch words and meanings
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

  // Scroll listener for back to top button
  useEffect(() => {
    const mainContent = mainContentRef.current;
    if (!mainContent) return;

    const handleScroll = () => {
      setShowBackToTop(mainContent.scrollTop > 300);
    };

    mainContent.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => mainContent.removeEventListener("scroll", handleScroll);
  }, [wordsWithEntries]);

  const scrollToTop = useCallback(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const days = Object.keys(Words) as DayKey[];

  // Close sidebar when day is selected on mobile
  const handleDaySelect = (day: DayKey) => {
    setActiveDay(day);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
    setTimeout(scrollToTop, 100);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-600 relative">
      {/* Mobile Header */}
      <div className="lg:hidden bg-[#1a1919] bg-opacity-80 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">{activeDay} Vocabulary</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-white hover:bg-gray-700 rounded-md transition"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
          fixed lg:static
          top-0 left-0
          w-64 lg:w-48 xl:w-56 2xl:w-64
          h-full lg:h-auto
          bg-[#1a1919] bg-opacity-95 lg:bg-opacity-80
          p-4 lg:p-3
          overflow-y-auto
          z-40 lg:z-auto
          transition-transform duration-300 ease-in-out lg:transition-none
          pt-20 lg:pt-4
        `}
      >
        {/* Mobile close button */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-white hover:bg-gray-700 rounded-md transition"
          aria-label="Close menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-white text-lg font-[800] mb-3 lg:mb-3">Days</h2>
        <div className="space-y-1 lg:space-y-1">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => handleDaySelect(day)}
              className={`block w-full text-left px-3 py-3 lg:py-2 rounded-md transition ${
                activeDay === day
                  ? "bg-white text-black font-semibold"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        ref={mainContentRef}
        className="main-content flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto w-full h-screen lg:h-auto"
      >
        <h1 className="hidden lg:block text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white mb-6 lg:mb-8">
          {activeDay} Vocabulary
        </h1>

        {loading && (
          <div className="flex justify-center items-center py-8">
            <p className="text-gray-300 text-lg">Loading...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Word Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-4 lg:gap-6">
          {wordsWithEntries.map((item) => (
            <div
              key={item.word}
              className="word-card h-full p-4 sm:p-5 lg:p-6 border border-[#030303] rounded-lg bg-[black] hover:bg-[#1a1919] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <p className="font-bold text-white text-xl sm:text-2xl lg:text-[28px] xl:text-[32px] mb-3 lg:mb-4 capitalize underline">
                {item.word}
              </p>
              {item.entries.map((entry, idx) => (
                <div key={idx} className="mb-3 lg:mb-4 last:mb-0">
                  <p className="font-light text-xs sm:text-sm lg:text-[14px] xl:text-[16px] text-white italic underline mb-2">
                    {entry.partOfSpeech}
                  </p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    {entry.senses
                      .slice(0, 3)
                      .map((sense: APISense, i: number) => (
                        <li
                          key={i}
                          className="text-gray-300 text-xs sm:text-sm lg:text-[14px] xl:text-[15px] leading-relaxed"
                        >
                          {sense.definition}
                        </li>
                      ))}
                  </ul>
                  {/* {entry.senses.length > 3 && (
                    <p className="text-gray-400 text-xs mt-2">
                      +{entry.senses.length - 3} more definitions
                    </p>
                  )} */}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Empty state */}
        {!loading && !error && wordsWithEntries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No words found for {activeDay}
            </p>
          </div>
        )}
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed z-50 bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10
                     w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white hover:bg-gray-100
                     text-black font-bold rounded-full shadow-lg hover:shadow-xl flex items-center justify-center
                     transition-all duration-300 text-lg sm:text-xl lg:text-2xl"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default WordList;
