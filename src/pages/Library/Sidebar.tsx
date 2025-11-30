import React from "react";
import { Words } from "../../constants/Constant";
import { X } from "lucide-react";

type GroupKey = keyof typeof Words;

interface SidebarProps {
  activeGroup: GroupKey;
  handleGroupSelect: (Group: GroupKey) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeGroup,
  handleGroupSelect,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const Groups = Object.keys(Words) as GroupKey[];

  return (
    <>
      <div
        className={`fixed lg:static top-0 left-0 w-64 lg:w-48 xl:w-56 2xl:w-64 h-screen lg:h-auto bg-[#1a1919] bg-opacity-95 lg:bg-opacity-80 p-4 lg:p-3 overflow-y-auto z-40 lg:z-auto transition-transform duration-300 ease-in-out scrollbar-custom ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 pt-20 lg:pt-4`}
      >
        <button
          className="lg:hidden absolute top-4 right-4 p-2 text-white hover:bg-gray-700 rounded-md transition"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close menu"
        >
          <X />
        </button>

        <h2 className="text-white text-lg font-[800] mb-3 lg:mb-3">Groups</h2>
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-4">
          {Groups.map((Group) => (
            <button
              key={Group}
              onClick={() => {
                handleGroupSelect(Group);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
              }}
              className={`w-full shadow-sm shadow-[brown] text-center px-2 py-2 rounded-md transition ${
                activeGroup === Group
                  ? "bg-white text-black font-semibold"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              {Group.replace("Group ", "")}
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
