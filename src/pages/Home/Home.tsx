import { Link } from "react-router-dom";
import { FLASHCARD, LIBRARY } from "../../config/path";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center z-0">
        <div className="absolute inset-0 bg-[black] bg-opacity-60"></div>
      </div>
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
          VocabGuide
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Learn over 2000 words for TOEFL, IELTS, PTE, GRE or any other
          examinations
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to={`/${LIBRARY}`}
            className="text-black px-4 py-2 rounded-md border-2 bg-white text-sm sm:text-base md:text-lg font-semibold"
          >
            Library
          </Link>
          <Link
            to={`/${FLASHCARD}}`}
            className="text-white px-4 py-2 rounded-md border-2 border-white text-sm sm:text-base md:text-lg font-semibold"
          >
            Flashcard
          </Link>
        </div>
      </div>
    </div>
  );
}
