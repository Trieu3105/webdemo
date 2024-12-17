"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import "boxicons/css/boxicons.min.css";

export interface GiftItem {
  id: number; // ID của item
  name: string; // Tên item
  icon: string; // Đường dẫn icon của item
  quantity: number; // Số lượng item
}

export interface giftsLogin {
  id: number; // ID của gift
  day: string; // Ngày nhận thưởng
  luong: number; // Số lượng Lượng
  xu: number; // Số lượng Xu
  yen: number; // Số lượng Yên
  gift_name: GiftItem[]; // Mảng các item
  status: boolean; // Trạng thái nhận quà
}

export default function Dangnhatl() {
  const [giftsLogin, setGiftsLogin] = useState<giftsLogin[]>([]);

  // Lấy dữ liệu từ API
  useEffect(() => {
    async function fetchGiftsLogin() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/giftlogin"
        );
        // Loại bỏ trùng lặp trong gift_name dựa trên id
        const filteredData = response.data.map((gift: giftsLogin) => ({
          ...gift,
          gift_name: gift.gift_name.filter(
            (item, index, self) =>
              self.findIndex((i) => i.id === item.id) === index
          ),
        }));
        setGiftsLogin(filteredData);
      } catch (error) {
        console.error("Error fetching gifts login data:", error);
      }
    }
    fetchGiftsLogin();
  }, []);

  return (
    <div className="transition-opacity duration-300 opacity-100">
      <div className="relative mb-7">
        <div className="flex justify-between items-center capitalize mb-4">
          <div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-primary-500 dark:text-primary-400 md:mr-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="14"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#63E6BE"
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                ></path>
              </svg>
              <p className="md:text-2xl text-xl font-bold text-gray-700 dark:text-gray-300">
                Đăng nhập
              </p>
            </div>
            <p className="break-words text-gray-500 dark:text-gray-400 md:text-lg text-sm md:mt-1">
              Đăng nhập mỗi ngày nhận quà
            </p>
          </div>
        </div>
        <div className="relative overflow-visible rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900">
          <table className="min-w-full table-fixed divide-y divide-gray-300 dark:divide-gray-700">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="text-left rtl:text-right whitespace-nowrap px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm"
                >
                  <span>Mốc</span>
                </th>
                <th
                  scope="col"
                  className="text-left rtl:text-right whitespace-nowrap px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm"
                >
                  <span>Phần thưởng</span>
                </th>
                <th
                  scope="col"
                  className="text-left rtl:text-right whitespace-nowrap px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm"
                >
                  <span>Trạng thái</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {giftsLogin.map((gift) => (
                <tr key={gift.id}>
                  <td className="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                    <p className="break-words font-semibold">Ngày {gift.day}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                    <div className="flex items-center flex-wrap gap-2 sm:min-w-[auto] min-w-[250px]">
                      {gift.gift_name.map((item) => (
                        <div
                          key={item.id}
                          className="relative inline-block hover:ring-primary-500 dark:hover:ring-primary-400 cursor-pointer rounded-xl select-none transition-all p-1 overflow-hidden hover:ring ring-primary-500 dark:hover:ring-primary-400 "
                        >
                          <div
                            className="relative select-none transition-all rounded-xl p-1 overflow-hidden cursor-pointer"
                            style={{ maxWidth: "55px", maxHeight: "55px" }}
                          >
                            <img
                              alt={item.name}
                              loading="lazy"
                              width="110"
                              height="110"
                              decoding="async"
                              data-nimg="1"
                              className="object-cover select-none"
                              src={`/images/icon/Small${item.icon}.png`}
                              style={{
                                color: "transparent",
                                maxHeight: "50px",
                              }}
                            />
                          </div>
                          <div className="flex items-center absolute bottom-1 right-1 rounded-md px-[5px] bg-gray-600 dark:bg-gray-700 cursor-pointer">
                            <p
                              className="break-words font-bold text-center"
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontSize: "10px",
                              }}
                            >
                              {item.quantity || 0}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                    <button
                      type="button"
                      disabled={!gift.status}
                      className="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-xs gap-x-1.5 px-2.5 py-1.5 shadow-sm inline-flex items-center focus-visible:outline-0 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
                    >
                      {gift.status ? "Đã nhận" : "Chưa đạt"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
