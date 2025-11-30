import { useState, useRef, useCallback } from "react";
import Sidebar from "./Sidebar";
import WordList from "./WordList";

const Library = () => {
  const [activeGroup, setActiveGroup] = useState<any>("Group 1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const mainContentRef = useRef<HTMLDivElement>(null);

  const scrollToTop = useCallback(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleGroupSelect = (Group: any) => {
    setActiveGroup(Group);
    scrollToTop();
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px-64px)] bg-[#1a1919]">
      {!isSidebarOpen && (
        <button
          className="fixed top-16 left-0 z-50 p-3 bg-[#1a1919] text-white rounded-r-3xl shadow-lg lg:hidden w-[80px] flex justify-center items-center gap-1 text-sm"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <p>Groups</p>
        </button>
      )}

      <Sidebar
        activeGroup={activeGroup}
        handleGroupSelect={handleGroupSelect}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div
        ref={mainContentRef}
        className="flex-1 overflow-y-auto scrollbar-custom"
        style={{ maxHeight: "calc(100vh - 64px - 64px)" }}
      >
        <WordList activeGroup={activeGroup} />
      </div>
    </div>
  );
};

export default Library;
