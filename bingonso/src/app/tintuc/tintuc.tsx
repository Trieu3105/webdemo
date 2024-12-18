/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";


const Tintuc = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/tintuc");
        setNews(response.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Có lỗi xảy ra khi tải tin tức");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="flex justify-between items-center capitalize mb-4 col-start-1 col-span-10">
        <div>
          <div className="flex items-center">
            <span className="icon-[bxs--circle] w-4 h-4 text-primary-500 dark:text-primary-400 md:mr-4 mr-2">
              <svg
                className="mx-3 "
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="14"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#63E6BE"
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                />
              </svg>
            </span>
            <p className="md:text-2xl text-xl font-bold text-gray-700 dark:text-gray-300">
              Tin tức
            </p>
          </div>
          <p className="break-words text-gray-500 dark:text-gray-400 md:text-lg text-sm md:mt-1">
            Cập Nhật Các Tin Tức Mới Nhất
          </p>
        </div>
      </div>

      {/* Hiển thị các tin tức */}
      {news.map((item, index) => (
        <div key={index} className="xl:col-span-4 md:col-span-4 col-span-3">
          <Link href={`/tintuc/tinhot/${item.id}`}>
            <div className="relative transition-all overflow-hidden rounded-xl ring-gray-200 dark:ring-gray-800 dark:ring-1 ring-0 hover:ring-2 dark:hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 shadow-md hover:shadow-lg bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800">
              <div className="p-0 sm:p-0">
                <div
                  className="relative select-none"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <img
                    alt={item.title}
                    loading="lazy"
                    width="1000"
                    height="1000"
                    decoding="async"
                    className="object-cover w-full h-full select-none"
                    src={item.img_url} 
                    style={{ color: "transparent", borderRadius: "inherit" }}
                  />
                </div>
              </div>

              <div className="px-4 py-5 sm:p-6">
                <p className="break-words text-primary-500 dark:text-primary-400 font-bold truncate-2 mb-2">
                  {item.title} 
                </p>
                <p className="break-words text-gray-500 dark:text-gray-400 line-clamp-2 truncate-2">
                  {item.sub_title}  {/* Hiển thị phần mô tả tóm tắt */}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Tintuc;
