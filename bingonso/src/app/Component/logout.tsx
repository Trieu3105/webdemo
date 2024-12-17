"use client";

import { useState, useRef } from "react";
import { useUserContext } from "../context/UserContext";
import { useRouter } from "next/navigation";
import LoginModal from "./login";// Đảm bảo bạn đã import LoginModal


export default function Logout() {
  const { user, logout } = useUserContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const goToProfile = () => {
    setIsMenuOpen(false);
    router.push("/profile");
  };

  const handleLoginClick = () => setIsLoginModalOpen(true);

  return (
    <div className="relative">
      {user ? (
        <>
          {/* Nút chính hiển thị tên người dùng */}
          <button
            ref={buttonRef}
            className="flex justify-center items-center w-full"
            onClick={toggleMenu}
          >
            <span className="font-bold flex justify-center items-center">
              <svg
                className="w-[22px] h-[22px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                  clipRule="evenodd"
                />
              </svg>
              Hi, {user.username}
            </span>
          </button>

          {/* Menu logout hiển thị khi isMenuOpen là true */}
          {isMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800 z-10"
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <button
                onClick={goToProfile}
                className="w-full text-left py-2 px-4 text-sm text-gray-800 dark:text-white dark:hover:bg-gray-700 hover:border-gray-600 hover:rounded-t-lg"
              >
                Profile
              </button>
              <hr className="border-gray-200 dark:border-gray-600" />
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-gray-700 hover:border-gray-600 hover:rounded-b-lg"
              >
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <button onClick={handleLoginClick} className="text-blue-600">
          Login
        </button>
      )}

      {/* Hiển thị LoginModal khi chưa đăng nhập */}
      {isLoginModalOpen && (
        <LoginModal />
      )}
    </div>
  );
}
