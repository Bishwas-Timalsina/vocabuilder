import { useState, useRef, useCallback } from "react";
import Sidebar from "../Library/Sidebar";
import WordCard from "./WordCard";

const Flashcard = () => {
  const [activeDay, setActiveDay] = useState<any>("Day 1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const mainContentRef = useRef<HTMLDivElement>(null);

  const scrollToTop = useCallback(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleDaySelect = (day: any) => {
    setActiveDay(day);
    scrollToTop();
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen relative">
      {!isSidebarOpen && (
        <button
          className="fixed top-15 left-0 z-50 p-3 bg-[#1a1919] text-white rounded-r-3xl shadow-lg lg:hidden w-[80px] flex justify-center items-center gap-1 text-sm"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <p className="">Days</p>
        </button>
      )}

      <Sidebar
        activeDay={activeDay}
        handleDaySelect={handleDaySelect}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div
        ref={mainContentRef}
        className="flex-1 overflow-y-auto w-full h-screen lg:h-auto"
      >
        {/* <WordList activeDay={activeDay} /> */}
        <WordCard activeDay={activeDay} />
      </div>
    </div>
  );
};

export default Flashcard;
