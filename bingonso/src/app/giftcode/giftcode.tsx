"use client";
// import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";

interface Item {
  id: number;
  name: string;
  icon: string | null;
}

interface GiftCode {
  id: number;
  server_id: string | null;
  code: string;
  items: Item[];
  coin: number;
  yen: number;
  gold: number;
  created_at: string;
  expired_at: string;
  updated_at: string;
  status: string;
}

export default function Giftcode() {
  function formatYen(value: number): string {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + "ty"; // Rút gọn thành "ty" nếu giá trị > 1 tỷ
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "tr"; // Rút gọn thành "tr" nếu giá trị > 1 triệu
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + "k"; // Rút gọn thành "k" nếu giá trị > 1 nghìn
    }
    return value.toString(); // Nếu giá trị nhỏ hơn 1000, giữ nguyên
  }
  const [giftCodes, setGiftCodes] = useState<GiftCode[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/giftcode")
      .then((response) => {
        const giftCodes = response.data;
        if (Array.isArray(giftCodes)) {
          setGiftCodes(giftCodes);
        } else {
          console.error("Invalid data format from API");
        }
      })
      .catch((error) => {
        console.error("Error fetching gift codes:", error);
      });
  }, []);
  const openModal = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };
  return (
    <div className="transition-opacity duration-300 opacity-100">
      <div className="relative mb-7">
        <div className="capitalize mb-4">
          <div className="flex items-center">
            <svg
              className="w-3 h-3 text-primary-500 dark:text-primary-400 md:mr-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              height="10"
              width="10"
              viewBox="0 0 512 512"
            >
              <path
                fill="#63E6BE"
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
              ></path>
            </svg>
            <p className="md:text-2xl text-xl font-bold text-gray-700 dark:text-gray-300">
              Gift Code
            </p>
          </div>
          <p className="text-gray-500 dark:text-gray-400 md:text-lg text-sm">
            Mã quà tặng công khai
          </p>
        </div>
        <div className="overflow-visible rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900">
          <table className="min-w-full table-fixed divide-y divide-gray-300 dark:divide-gray-700 overflow-hidden">
            <thead>
              <tr>
                <th className="text-left px-3 py-3.5 font-semibold text-sm">
                  Máy chủ
                </th>
                <th className="text-left px-3 py-3.5 font-semibold text-sm">
                  Mã
                </th>
                <th className="text-left px-3 py-3.5 font-semibold text-sm">
                  Phần thưởng
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {giftCodes.length > 0 ? (
                giftCodes.map((giftCode) => (
                  <tr key={giftCode.id}>
                    <td className="px-3 py-4 text-gray-500 text-sm font-semibold">
                      {giftCode.server_id || "Tất cả máy chủ"}
                    </td>
                    <td className="px-3 py-4 text-gray-500 text-sm font-semibold">
                      {giftCode.code}
                    </td>
                    <td className="px-3 py-4 text-gray-500 text-sm">
                      <div className="flex flex-wrap gap-1">
                        <div className="relative inline-block transition-all hover:ring ring-primary-500 dark:hover:ring-primary-400 cursor-pointer rounded-xl">
                          {/* Container của ảnh */}
                          {giftCode.yen !== 0 && ( // Kiểm tra giá trị yen trước khi render
                            <div
                              className="relative select-none transition-all rounded-xl p-1 overflow-hidden hover:ring ring-primary-500 dark:hover:ring-primary-400 cursor-pointer"
                              style={{
                                aspectRatio: "1 / 1",
                                maxWidth: "35px",
                                maxHeight: "40px",
                              }}
                            >
                              <img
                                src={"/images/icon/Small493.png"}
                                width={110}
                                height={110}
                                className="object-cover select-none rounded-xl"
                                style={{ color: "transparent" }}
                                loading="lazy"
                                alt="Gift icon"
                              />
                            </div>
                          )}

                          {/* Số lượng hiển thị */}
                          {giftCode.yen !== 0 && ( // Kiểm tra giá trị yen trước khi render số lượng
                            <div className="flex items-center absolute bottom-1 right-1 rounded-md px-[5px] bg-gray-600 dark:bg-gray-700 cursor-pointer">
                              <p
                                className="break-words font-bold text-center"
                                style={{
                                  color: "rgb(255, 255, 255)",
                                  fontSize: "10px",
                                }}
                              >
                                {formatYen(giftCode.yen)}{" "}
                                {/* Gọi hàm để rút gọn giá trị từ dữ liệu */}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="relative inline-block transition-all hover:ring ring-primary-500 dark:hover:ring-primary-400 cursor-pointer rounded-xl">
                          {/* Container của ảnh */}
                          {giftCode.yen !== 0 && ( // Kiểm tra giá trị yen trước khi render
                            <button
                              className="relative select-none transition-all rounded-xl p-1 overflow-hidden"
                              // onClick={() => openModal(item)}
                              style={{
                                aspectRatio: "1 / 1",
                                maxWidth: "40px",
                                maxHeight: "50px",
                              }}
                            >
                              <img
                                src={"/images/icon/Small3225.png"}
                                width={110}
                                height={110}
                                className="object-cover select-none rounded-xl"
                                style={{ color: "transparent" }}
                                loading="lazy"
                                alt="Gift icon"
                              />
                            </button>
                          )}

                          {/* Số lượng hiển thị */}
                          {giftCode.yen !== 0 && ( // Kiểm tra giá trị yen trước khi render số lượng
                            <div className="flex items-center absolute bottom-1 right-1 rounded-md px-[5px] bg-gray-600 dark:bg-gray-700 cursor-pointer">
                              <p
                                className="break-words font-bold text-center"
                                style={{
                                  color: "rgb(255, 255, 255)",
                                  fontSize: "10px",
                                }}
                              >
                                {formatYen(giftCode.coin)}{" "}
                                {/* Gọi hàm để rút gọn giá trị từ dữ liệu */}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="relative inline-block transition-all hover:ring ring-primary-500 dark:hover:ring-primary-400 cursor-pointer rounded-xl">
                          {/* Container của ảnh */}
                          {giftCode.yen !== 0 && ( // Kiểm tra giá trị yen trước khi render
                            <div
                              className="relative select-none transition-all rounded-xl p-1 overflow-hidden hover:ring ring-primary-500 dark:hover:ring-primary-400 cursor-pointer"
                              style={{
                                aspectRatio: "1 / 1",
                                maxWidth: "50px",
                                maxHeight: "50px",
                              }}
                            >
                              <img
                                src={"/images/icon/Small7085.png"}
                                width={110}
                                height={110}
                                className="object-cover select-none rounded-xl"
                                style={{ color: "transparent" }}
                                loading="lazy"
                                alt="Gift icon"
                              />
                            </div>
                          )}

                          {/* Số lượng hiển thị */}
                          {giftCode.yen !== 0 && ( // Kiểm tra giá trị yen trước khi render số lượng
                            <div className="flex items-center absolute bottom-1 right-1 rounded-md px-[5px] bg-gray-600 dark:bg-gray-700 cursor-pointer">
                              <p
                                className="break-words font-bold text-center"
                                style={{
                                  color: "rgb(255, 255, 255)",
                                  fontSize: "10px",
                                }}
                              >
                                {formatYen(giftCode.gold)}{" "}
                                {/* Gọi hàm để rút gọn giá trị từ dữ liệu */}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="relative inline-block transition-all hover:ring-primary-500 dark:hover:ring-primary-400 cursor-pointer rounded-xl">
                          {giftCode.items
                            .filter((item) => item.icon) // Lọc các item có icon
                            .map((item, index) => (
                              <div
                                key={`${item.id}-${index}`}
                                className="relative inline-block transition-all rounded-xl overflow-hidden hover:ring ring-primary-500 dark:hover:ring-primary-400 cursor-pointer mr-1 "
                                onClick={() => openModal(item)}
                              >
                                <div className="p-1 rounded-xl max-w-[70px] max-h-[70px]">
                                  {item.icon ? (
                                    <img
                                      src={`/images/icon/Small${item.icon}.png`}
                                      alt={item.name}
                                      className="object-cover max-h-[40px] w-[40px] h-[35px]"
                                    />
                                    
                                  ) : (
                                    <div>No icon available</div>
                                  )}
                                  {/* <span>{item.name}</span> */}
                                </div>
                              </div>
                            ))}
                          ;
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    Không có mã quà tặng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className="fixed inset-0 z-50"
      >
        {/* Overlay */}
        <div
          className="relative text-left rtl:text-right flex flex-col overflow-visible bg-white dark:bg-gray-900 shadow-xl w-full rounded-lg sm:my-8 max-w-[220px] sm:max-w-[220px]"
          aria-hidden="true"
        ></div>
        <div className="flex items-center justify-center min-h-screen p-4">
          {selectedItem && (
            <Dialog.Panel className="relative text-left rtl:text-right flex flex-col overflow-visible bg-white dark:bg-gray-900 shadow-xl w-full rounded-lg sm:my-8 max-w-[220px] sm:max-w-[220px]">
              <div className="flex flex-col items-center pt-5 h-[120px] ">
                <img
                  src={`/images/icon/Small${selectedItem.icon}.png`}
                  alt={selectedItem.name}
                  className="object-cover  max-h-[70px] w-[60px] h-[50px] rounded-lg"
                />
                <p className="mt-4 text-lg text-center font-semibold text-gray-700 dark:text-gray-300">
                  {selectedItem.name}
                </p>
              </div>
              {/* <button
                onClick={closeModal}
                className="mt-3 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                Đóng
              </button> */}
            </Dialog.Panel>
          )}
        </div>
      </Dialog>
    </div>
  );
}
