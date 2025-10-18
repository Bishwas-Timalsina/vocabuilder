import { useState } from "react";
import { Home, Menu, X, BookOpen, LayoutDashboard, Info } from "lucide-react";
import NavButton from "../UI/Navbutton";
import { ABOUT, FLASHCARD, HOME, WORD_LIST } from "../../config/path";
import MobileNavButton from "../UI/MobileNavButton";
import Logo from "../../assets/Logo-Dark.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-[black] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to={`/${HOME}`}
            className="flex items-center space-x-2 flex-shrink-0 cursor-pointer"
          >
            <img src={Logo} alt="VocabGuide Logo" className="h-16 w-16" />
            <span className="text-xl font-bold">VocabGuide</span>
          </Link>

          <div className="hidden md:flex space-x-4">
            <NavButton icon={<Home size={20} />} label="Home" route={HOME} />
            <NavButton
              icon={<BookOpen size={20} />}
              label="Library"
              route={WORD_LIST}
            />
            <NavButton
              icon={<LayoutDashboard size={20} />}
              label="Flashcard"
              route={FLASHCARD}
            />
            <NavButton
              icon={<Info size={20} />}
              label="About us"
              route={ABOUT}
            />
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavButton
            route={HOME}
            icon={<Home size={20} />}
            label="Home"
          />
          <MobileNavButton
            route={WORD_LIST}
            icon={<BookOpen size={20} />}
            label="Library"
          />
          <MobileNavButton
            route={FLASHCARD}
            icon={<LayoutDashboard size={20} />}
            label="Today's Pick"
          />
          <MobileNavButton
            route={ABOUT}
            icon={<Info size={20} />}
            label="About Us"
          />
        </div>
      </div>
    </nav>
  );
}
