"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Naptien = () => {
  const [isOpen, setIsOpen] = useState(false); // Quản lý trạng thái của Modal
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Quản lý trạng thái của Dropdown
  const [selectedOption, setSelectedOption] = useState({
    id: 4,
    name: "Chọn cổng nạp",
    ratio: "100%", // Thêm thông tin tỷ lệ nạp
  }); // Tùy chọn được chọn
  const [amount, setAmount] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const paymentOptions = [
    { id: 1, name: "Thẻ cào", ratio: "100%" },
    { id: 2, name: "Momo", ratio: "100%" },
    { id: 3, name: "Ngân hàng", ratio: "100%" },
  ];

  // const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  // const [error, setError] = useState(""); // Error message state

  // Đóng Dropdown khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const [qrCodeUrl, setQrCodeUrl] = useState(""); // URL của QR code
  // Hàm mở modal và xử lý submit
  const [isProcessing, setIsProcessing] = useState(false); // Để kiểm tra trạng thái gửi yêu cầu
  const [showErrorModal, setShowErrorModal] = useState(false); // Dùng để hiển thị modal thông báo lỗi

  const handleOpenModalAndSubmit = async () => {
    // Kiểm tra nếu chưa nhập đủ dữ liệu
    if (!amount || !selectedOption) {
      setShowErrorModal(true); // Hiển thị modal lỗi nếu thiếu dữ liệu
      return;
    }

    setIsOpen(true); // Mở modal khi người dùng nhấn nút

    // Kiểm tra nếu đang trong quá trình gửi yêu cầu
    if (isProcessing) {
      return; // Nếu đang gửi yêu cầu trước đó, không làm gì
    }

    setIsProcessing(true); // Đánh dấu là đang xử lý yêu cầu

    try {
      const response = await axios.post("http://localhost:8080/api/banking", {
        amount,
        paymentOption: selectedOption.name,
        ratio: selectedOption.ratio,
      });

      if (response.data.success) {
        const amountValue = response.data.data.amount;
        setQrCodeUrl(
          `https://api.vietqr.io/970405/2004206236286/${amountValue}/nt%20Trieu/qr_only.jpg`
        );
      } else {
        console.error("Giao dịch không thành công");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi gửi yêu cầu", error);
    } finally {
      setIsProcessing(false); // Khi xử lý xong, đánh dấu kết thúc
    }
  };

  return (
    <div className="transition-opacity duration-300 opacity-100 col-start-3 col-span-8">
      <div className="max-w-[700px] mx-auto">
        <div className="flex justify-between items-center capitalize mb-4">
          <div>
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
                Nạp coin
              </p>
            </div>
            <p className="break-words text-gray-500 dark:text-gray-400 md:text-lg text-sm md:mt-1">
              Tạo giao dịch nạp coin
            </p>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <div className="relative mt-2">
              <div className="relative overflow-visible rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900">
                <div className="p-0 sm:p-0">
                  <div className="relative overflow-x-auto">
                    <table className="min-w-full table-fixed divide-y divide-gray-300 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <th className="text-left rtl:text-right whitespace-nowrap px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">
                            <span>Cổng</span>
                          </th>
                          <th className="text-left rtl:text-right whitespace-nowrap px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">
                            <span>Trạng thái</span>
                          </th>
                          <th className="text-left rtl:text-right whitespace-nowrap px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">
                            <span>Nạp tối đa</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        <tr>
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm font-medium">
                            Thẻ cào
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                            <span className="text-red-500 dark:text-red-400">
                              <span className="icon-[bxs--circle] w-2.5 h-2.5"></span>{" "}
                              Bảo Trì !!
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                            <span>1.000.000</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm font-medium">
                            Momo
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                            <span className="text-red-500 dark:text-red-400">
                              <span className="icon-[bxs--circle] w-2.5 h-2.5"></span>{" "}
                              Bảo trì !!
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                            <span>Không giới hạn</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm font-medium">
                            Ngân hàng
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                            <span className="text-green-500 dark:text-green-400">
                              <span className="icon-[bxs--circle] w-2.5 h-2.5"></span>{" "}
                              Hoạt động
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                            <span>Không giới hạn</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* Dropdown Menu */}
            <div className="mb-4">
              <div className="flex content-center items-center justify-between text-sm">
                <label className="block font-medium text-gray-700 dark:text-gray-200">
                  Cổng nạp
                </label>
              </div>
              <div className="relative mt-1 " ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="relative w-full border-0 inline-flex items-center text-left cursor-pointer rounded-md mb-0.5 text-sm gap-x-2.5 px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-1.5 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                >
                  {selectedOption ? selectedOption.name : "Chọn cổng nạp"}
                  <span className="absolute inset-y-0 end-0 flex items-center pointer-events-none px-3.5">
                    <svg
                      className={`w-[18px] h-[18px] ${
                        isDropdownOpen ? "rotate-90" : "rotate-0"
                      } text-gray-800 dark:text-white transform transition-transform`}
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
                        strokeWidth="1.6"
                        d="m9 5 7 7-7 7"
                      />
                    </svg>
                  </span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-20 w-full transition-all py-1 mt-1 max-h-60 overflow-y-auto rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700">
                    {paymentOptions.map((option) => (
                      <div
                        key={option.id}
                        onClick={() => {
                          setSelectedOption(option); // Cập nhật giá trị khi chọn
                          setIsDropdownOpen(false);
                        }}
                        className={`cursor-pointer select-none transition-all relative hover:rounded-md px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          selectedOption?.id === option.id
                            ? "text-primary-500"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {option.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Form */}
            {selectedOption.id !== 4 && (
              <>
                <div className="mb-4">
                  <label className="block font-medium text-gray-700 dark:text-gray-200">
                    Tỉ lệ nạp
                  </label>
                  <input
                    readOnly
                    autoComplete="ratio"
                    placeholder="Tỉ lệ nạp"
                    className="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-1.5"
                    value={selectedOption.ratio}
                    name="ratio"
                  />
                </div>

                <div className="mb-4">
                  <div className="flex content-center items-center justify-between text-sm">
                    <label
                      htmlFor="amount"
                      className="block font-medium text-gray-700 dark:text-gray-200"
                    >
                      Số tiền
                    </label>
                  </div>
                  <div className="relative mt-1">
                    <input
                      inputMode="numeric"
                      placeholder="Số tiền"
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      name="amount"
                      className="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-gray-400 dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-600 dark:ring-gray-700 focus:ring-1.5"
                    />
                    {!amount && (
                      <p className="mt-2 text-red-500 dark:text-red-400 text-sm">
                        Không được bỏ trống
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-between items-center mt-4">
              <button
                type="button"
                className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
              >
                Lịch sử
              </button>
              <button
                className="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 rounded-md text-sm gap-x-2 px-3 py-2 shadow-sm text-white dark:text-gray-900 bg-emerald-400 hover:bg-emerald-600 disabled:bg-emerald-500 dark:bg-emerald-400 dark:hover:bg-emerald-500 dark:disabled:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:focus-visible:outline-emerald-400 mb-2 font-semibold"
                onClick={handleOpenModalAndSubmit}
                disabled={isProcessing}
              >
                <span >{isProcessing ? "Đang xử lý..." : "Xác nhận"}</span>
              </button>
            </div>
            {showErrorModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative text-left h-[200px] rtl:text-right flex flex-col justify-center items-center overflow-visible bg-white dark:bg-gray-900 shadow-xl w-1/2 rounded-lg sm:my-8 sm:max-w-lg">
                  <div className="flex items-end justify-end w-full px-14 pb-4">
                    <button
                      type="button"
                      onClick={() => setShowErrorModal(false)}
                      className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
                    >
                      Đóng
                    </button>
                  </div>
                  <div className="select-none w-[250px] md:max-w-[300px]">
                    <h2 className="text-xl text-center text-rose-500">Thông báo!!</h2>
                    <p className="text-center mt-4 rounded-md border-2 p-3 border-rose-500">
                      Vui lòng nhập đầy đủ thông tin trước khi xác nhận.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Modal */}
            {isOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative text-left h-[380] rtl:text-right flex flex-col justify-center items-center overflow-visible bg-white dark:bg-gray-900 shadow-xl w-1/2 rounded-lg sm:my-8 sm:max-w-lg">
                  <div className="flex items-end justify-end w-full px-14 pb-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
                    >
                      Đóng
                    </button>
                  </div>
                  <div className="relative flex justify-center items-center select-none w-[250px] md:max-w-[300px]">
                    {/* Hiển thị ảnh QR */}
                    {qrCodeUrl && (
                      <img
                        alt="QR code"
                        loading="lazy"
                        width="300"
                        height="300"
                        decoding="async"
                        className="object-cover w-full h-full select-none"
                        src={qrCodeUrl}
                        style={{
                          color: "transparent",
                          borderRadius: "inherit",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Naptien;
