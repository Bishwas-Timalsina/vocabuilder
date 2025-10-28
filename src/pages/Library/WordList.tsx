import useFetchContent from "../../hooks/useFetchContent";
import { SquareLoader } from "react-spinners";

const WordList: any = (props: any) => {
  const { activeDay } = props;
  const { wordsData, loading, error } = useFetchContent(activeDay);

  return (
    <div className="main-content flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto w-full min-h-screen bg-gray-800">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white mb-6 lg:mb-8 text-center lg:text-left">
        {activeDay} Vocabulary
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
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-8">
          {wordsData?.map((item) => (
            <div
              key={item.word}
              className="word-card h-full p-4 sm:p-5 lg:p-6 border border-gray-900 rounded-lg bg-black hover:bg-[#1a1919] transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              <p className="font-bold text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl mb-3 lg:mb-4 capitalize underline text-center lg:text-left">
                {item.word}
              </p>

              {item.entries.map((entry, idx) => (
                <div key={idx} className="mb-3 lg:mb-4 last:mb-0">
                  <p className="font-light text-xs sm:text-sm lg:text-[14px] xl:text-[16px] text-white italic underline mb-2">
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
    </div>
  );
};

export default WordList;
