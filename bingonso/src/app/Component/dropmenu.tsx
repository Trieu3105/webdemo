import React, { useState } from "react";
import Link from "next/link";
import "../css/nav.css"

interface MenuItem {
  label: string;
  link: string;
}

interface DropdownMenuProps {
  title: string;
  items: MenuItem[];
  icon: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, items, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      <button className="button-icon w-full grid grid-cols-12 py-2 md:py-3"onClick={toggleMenu}>
        <span className="col-start-1 col-span-2">{icon}</span>
        <span className="chucnang w-full text-left col-start-3 col-span-8 ml-3.5 md:ml-5 text-sm md:text-base">
          {title}
        </span>
        <span
          className={`col-start-11 col-span-2 transition-transform duration-300 ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          <svg
            className="w-[15px] h-[15px] md:w-[20px] md:h-[20px] text-gray-800 dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2.8"
              d="m9 5 7 7-7 7"
            />
          </svg>
        </span>
      </button>
      <div
        className={`menuchucnang transition-all duration-700 ease-in-out transform ${
          isOpen
            ? "max-h-40 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 translate-y-4"
        } overflow-hidden`}
      >
        <ul className="ml-3.5 col-start-3 col-span-8 md:ml-6">
          {items.map((item, index) => (
            <li key={index} className="py-1 col-start-3 col-span-8">
              <Link href={item.link}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
