"use client";

import Image from "next/image";
import LoginModal from "./login";
import "../css/header.css";
import React, { useState, useRef, useEffect } from "react";
import Nav from "./nav";

export default function Header() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    const newState = !isNavVisible;
    setIsNavVisible(newState);

    // Thêm hoặc xóa lớp no-scroll
    if (newState) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        menuRef.current &&
        target &&
        !menuRef.current.contains(target) &&
        !target.closest(".menu-icon")
      ) {
        setIsNavVisible(false);
        document.body.classList.remove("no-scroll"); // Xóa lớp no-scroll khi click ngoài menu
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
      <header className="sticky top-0 z-50 bg-white/75 dark:bg-transparent backdrop-blur-xl">
        <div className="header-container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center h-[var(--header-size)] max-h-[var(--header-size)]">
          {/* Menu Icon */}
          <div
            className="menu-icon flex items-center md:hidden mr-2"
            onClick={toggleMenu}
          >
            <svg
              className="menu-icon-svg w-[29px] h-[29px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 6H6m12 4H6m12 4H6m12 4H6"
              />
            </svg>
          </div>

          {/* Nav (Hiển thị khi Menu Icon được nhấn) */}
          <div
            ref={menuRef}
            className={`menu-slide absolute top-[-1] left-0 w-2/3 h-auto bg-white dark:bg-gray-800 z-20 shadow-lg menu-slide ${
              isNavVisible ? "show" : ""
            }`}
          >
            <Nav />
          </div>
          {/* Logo */}
          <div className="logo-container flex items-center mr-auto">
            <div className="logo-wrapper w-4/5 m-auto ">
              <a href="/home" className="logo-link">
                <Image
                  className="logo"
                  src="/logo.webp"
                  alt="Logo"
                  width={112}
                  height={53}
                />
              </a>
            </div>
          </div>

          <div className="action-buttons flex justify-end items-center max-md:w-32">
            <div className="">
              <button className="theme-toggle-btn flex justify-end items-center focus:outline-none sm:rounded-md md:rounded-lg text-sm lg:text-base ">
                <span className="theme-toggle-icon w-full flex sm:justify-center md:justify-end">
                  <svg
                    className="theme-toggle-svg w-[32px] h-[32px] m-auto hover:bg-gray-800 hover:rounded-md"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                    />
                  </svg>
                </span>
              </button>
            </div>

            <LoginModal />
          </div>
        </div>
      </header>

  );
}
