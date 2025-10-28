import React from "react";
import { Words } from "../../constants/Constant";
import { X } from "lucide-react";

type DayKey = keyof typeof Words;

interface SidebarProps {
  activeDay: DayKey;
  handleDaySelect: (day: DayKey) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeDay,
  handleDaySelect,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const days = Object.keys(Words) as DayKey[];

  return (
    <>
      <div
        className={`
    fixed lg:static top-0 left-0
    w-64 lg:w-48 xl:w-56 2xl:w-64
    h-full lg:h-auto
    bg-[#1a1919] bg-opacity-95 lg:bg-opacity-80
    p-4 lg:p-3
    overflow-y-auto
    z-40 lg:z-auto
    transition-transform duration-300 ease-in-out
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    lg:translate-x-0
    pt-20 lg:pt-4
  `}
      >
        <button
          className="lg:hidden absolute top-4 right-4 p-2 text-white hover:bg-gray-700 rounded-md transition"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close menu"
        >
          <X />
        </button>

        <h2 className="text-white text-lg font-[800] mb-3 lg:mb-3">Days</h2>
        <div className="space-y-1 lg:space-y-1">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => {
                handleDaySelect(day);
                if (window.innerWidth < 768) setIsSidebarOpen(false); // auto-close on mobile
              }}
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

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
