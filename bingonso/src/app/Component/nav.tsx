"use client";
import DropdownMenu from "./dropmenu";
// import { useState } from "react";
import "../css/nav.css";

const Nav = () => {
  const menus = [
    {
      title: "Chức Năng",
      icon: (
        <svg
          className="w-[24px] h-[24px] text-gray-800 dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"
          />
        </svg>
      ),
      items: [
        { label: "Nạp Tiền", link: "/naptien" },
        { label: "Đổi Lượng", link: "/doiluong" },
        { label: "Giftcode", link: "/giftcode" },
      ],
    },
    {
      title: "Sự kiện",
      icon: (
        <svg
          className="w-[24px] h-[24px] text-gray-800 dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.9"
            d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
          />
        </svg>
      ),
      items: [
        { label: "Đăng Nhập", link: "/dangnhaptl" },
        { label: "Tích Giờ", link: "/tichgio" },
      ],
    },
    {
      title: "Xếp Hạng",
      icon: (
        <svg
          className="w-[24px] h-[24px] text-gray-800 dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.9"
            d="M12 2l2.9 5.9L21 9.7l-4.5 4.4 1 6.5L12 17l-5.5 3.6 1-6.5L3 9.7l6.1-1.8L12 2Z"
          />
        </svg>
      ),
      items: [
        { label: "Cao Thủ", link: "/caothu" },
        { label: "Gia Tộc", link: "/giatoc" },
        { label: "Tích Lũy", link: "/tichluy" },
      ],
    },
    {
      title: "Bài Viết",
      icon: (
        <svg
          className="w-[24px] h-[24px] text-gray-800 dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.9"
            d="M4 4h16v16H4V4Zm4 6h8m-8 4h5"
          />
        </svg>
      ),
      items: [
        { label: "Tin tức", link: "/tintuc" },
        { label: "Hướng Dẫn", link: "/huongdan" },
        { label: "Tính Năng", link: "/tinhnang" },
        { label: "Sự Kiện", link: "/sukien" },
      ],
    },
    {
      title: "Mạng Xã Hội",
      icon: (
        <svg
          className="w-[24px] h-[24px] text-gray-800 dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.9"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.656 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54v-2.21c0-2.5 1.493-3.89 3.778-3.89 1.095 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.773-1.63 1.565v1.88h2.773l-.443 2.89h-2.33v6.987C18.344 21.128 22 16.991 22 12Z"
          />
        </svg>
      ),
      items: [
        { label: "Facebook", link: "https://facebook.com" },
        { label: "Twitter", link: "https://twitter.com" },
        { label: "Instagram", link: "https://instagram.com" },
      ],
    },
  ];
  

  return (
    <div className="Menudoc col-start-1 col-span-2 mt-4 md:mt-6  rounded-md shadow-md p-2 md:p-4">
      <button 
      className="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 rounded-md text-sm gap-x-2 px-3 py-2 shadow-sm text-white dark:text-gray-900 bg-emerald-400 hover:bg-emerald-600 disabled:bg-emerald-500 dark:bg-emerald-400 dark:hover:bg-emerald-500 dark:disabled:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:focus-visible:outline-emerald-400 w-full flex justify-center items-center mb-2 font-semibold"
     
      >
        
        <span>
          <svg
            className="w-[22px] h-[22px] text-gray-800 mr-1.5 font-bold"
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
              strokeWidth="2.3"
              d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"
            />
          </svg>
        </span>
        <a className="text-gray-800 font-bold">Tải Game</a>
      </button>
      <button className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-2 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 w-full flex justify-center items-center">
        <a>Cộng đồng - Hỗ trợ</a>
      </button>
      {menus.map((menu, index) => (
        <DropdownMenu
          key={index}
          title={menu.title}
          items={menu.items}
          icon={menu.icon}
        />
      ))}
    </div>
  );
};

export default Nav;
