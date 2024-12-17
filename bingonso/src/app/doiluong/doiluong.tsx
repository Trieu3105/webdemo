import "boxicons/css/boxicons.min.css";

export default function Doiluong() {
  return (
    <div className="transition-opacity duration-300 opacity-100">
      <div className="transition-opacity duration-300 opacity-100">
        <div className="relative mb-7">
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
                <div className=" md:text-2xl text-xl font-bold text-gray-700 dark:text-gray-300">
                  Đổi lượng
                </div>
              </div>
              <p className="break-words text-gray-500 dark:text-gray-400 md:text-lg text-sm md:mt-1 m-auto">
                Các gói quy đổi lượng
              </p>
            </div>
          </div>
          <div className="">
            <div className="flex items-center p-4 mb-4 text-sm text-primary-800 border border-primary-300 rounded-lg bg-primary-50 dark:bg-gray-800 dark:text-primary-400 dark:border-primary-800">
              <svg
                className="w-[20px] h-[20px] text-gray-800 dark:text-white"
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
                  strokeWidth="2.2"
                  d="M5 11.917 9.724 16.5 19 7.5"
                />
              </svg>
              <div>
                <span className="font-semibold">Lưu ý!</span> Các nhân vật{" "}
                <span className="font-medium">Nso+ 1</span> vẫn áp dụng bảng giá
                quy đổi cũ
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="overflow-visible relative transition-all cursor-pointer rounded-xl ring-gray-200 dark:ring-gray-800 dark:ring-1 ring-0 hover:ring-2 dark:hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 shadow-md hover:shadow-lg bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 xl:col-span-3 sm:col-span-4 col-span-6 focus:outline-none">
                <div className="col-start-1 col-span-3 border-slate-400 rounded-xl">
                  <div className="sm:p-6 px-2 sm:px-2 py-6 sm:py-6">
                    {/* <!-- Hình ảnh ảo --> */}
                    <div className="relative select-none transition-all rounded-xl mt-4 mb-6 mx-auto flex justify-center items-center">
                      <img
                        alt="image"
                        loading="lazy"
                        width="200"
                        height="200"
                        decoding="async"
                        className="w-1/2 h-1/2 select-none "
                        src="https://cdn.nsoplus.com/items/7085.png"
                      />
                    </div>

                    {/* <!-- Tiêu đề ảo --> */}
                    <p className="break-words text-primary-500 dark:text-primary-400 font-bold text-center truncate lg:text-base text-sm mb-1 px-2">
                      Gói 2000 lượng
                    </p>

                    {/* <!-- Thông tin phụ --> */}
                    <div className="mb-3">
                      <p className="break-words text-gray-500 dark:text-gray-400 font-semibold text-center truncate lg:text-xs text-[11px]">
                        Mua bằng số dư
                      </p>
                    </div>

                    {/* <!-- Các nút bấm --> */}
                    <div className="flex justify-center items-center">
                      <div className="inline-flex -space-x-px rounded-md shadow-sm bg-gray-200">
                        {/* <!-- Nút giả định --> */}
                        <button
                          type="button"
                          className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-s-md text-xs gap-x-1.5 px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
                        >
                          <span>10.000</span>
                        </button>

                        {/* <!-- Nút có icon từ thư viện boxicons --> */}
                        <button
                          type="button"
                          className="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-e-md text-xs gap-x-1.5 p-1.5 shadow-sm text-white dark:text-gray-900 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500 dark:disabled:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:focus-visible:outline-primary-400 inline-flex items-center"
                        >
                          <span
                            className="bx bxs-dollar-circle flex-shrink-0 h-4 w-4"
                            aria-hidden="true"
                          ></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-visible relative transition-all cursor-pointer rounded-xl ring-gray-200 dark:ring-gray-800 dark:ring-1 ring-0 hover:ring-2 dark:hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 shadow-md hover:shadow-lg bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 xl:col-span-3 sm:col-span-4 col-span-6 focus:outline-none">
                <div className="col-start-1 col-span-3 border-slate-400 rounded-xl">
                  <div className="sm:p-6 px-2 sm:px-2 py-6 sm:py-6">
                    {/* <!-- Hình ảnh ảo --> */}
                    <div className="relative select-none transition-all rounded-xl mt-4 mb-6 mx-auto flex justify-center items-center">
                      <img
                        alt="image"
                        loading="lazy"
                        width="200"
                        height="200"
                        decoding="async"
                        className="w-1/2 h-1/2 select-none "
                        src="https://cdn.nsoplus.com/items/7085.png"
                      />
                    </div>

                    {/* <!-- Tiêu đề ảo --> */}
                    <p className="break-words text-primary-500 dark:text-primary-400 font-bold text-center truncate lg:text-base text-sm mb-1 px-2">
                      Gói 2000 lượng
                    </p>

                    {/* <!-- Thông tin phụ --> */}
                    <div className="mb-3">
                      <p className="break-words text-gray-500 dark:text-gray-400 font-semibold text-center truncate lg:text-xs text-[11px]">
                        Mua bằng số dư
                      </p>
                    </div>

                    {/* <!-- Các nút bấm --> */}
                    <div className="flex justify-center items-center">
                      <div className="inline-flex -space-x-px rounded-md shadow-sm bg-gray-200">
                        {/* <!-- Nút giả định --> */}
                        <button
                          type="button"
                          className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-s-md text-xs gap-x-1.5 px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
                        >
                          <span>10.000</span>
                        </button>

                        {/* <!-- Nút có icon từ thư viện boxicons --> */}
                        <button
                          type="button"
                          className="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-e-md text-xs gap-x-1.5 p-1.5 shadow-sm text-white dark:text-gray-900 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500 dark:disabled:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:focus-visible:outline-primary-400 inline-flex items-center"
                        >
                          <span
                            className="bx bxs-dollar-circle flex-shrink-0 h-4 w-4"
                            aria-hidden="true"
                          ></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-visible relative transition-all cursor-pointer rounded-xl ring-gray-200 dark:ring-gray-800 dark:ring-1 ring-0 hover:ring-2 dark:hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 shadow-md hover:shadow-lg bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 xl:col-span-3 sm:col-span-4 col-span-6 focus:outline-none">
                <div className="col-start-1 col-span-3 border-slate-400 rounded-xl">
                  <div className="sm:p-6 px-2 sm:px-2 py-6 sm:py-6">
                    {/* <!-- Hình ảnh ảo --> */}
                    <div className="relative select-none transition-all rounded-xl mt-4 mb-6 mx-auto flex justify-center items-center">
                      <img
                        alt="image"
                        loading="lazy"
                        width="200"
                        height="200"
                        decoding="async"
                        className="w-1/2 h-1/2 select-none "
                        src="https://cdn.nsoplus.com/items/7085.png"
                      />
                    </div>

                    {/* <!-- Tiêu đề ảo --> */}
                    <p className="break-words text-primary-500 dark:text-primary-400 font-bold text-center truncate lg:text-base text-sm mb-1 px-2">
                      Gói 2000 lượng
                    </p>

                    {/* <!-- Thông tin phụ --> */}
                    <div className="mb-3">
                      <p className="break-words text-gray-500 dark:text-gray-400 font-semibold text-center truncate lg:text-xs text-[11px]">
                        Mua bằng số dư
                      </p>
                    </div>

                    {/* <!-- Các nút bấm --> */}
                    <div className="flex justify-center items-center">
                      <div className="inline-flex -space-x-px rounded-md shadow-sm bg-gray-200">
                        {/* <!-- Nút giả định --> */}
                        <button
                          type="button"
                          className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-s-md text-xs gap-x-1.5 px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
                        >
                          <span>10.000</span>
                        </button>

                        {/* <!-- Nút có icon từ thư viện boxicons --> */}
                        <button
                          type="button"
                          className="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-e-md text-xs gap-x-1.5 p-1.5 shadow-sm text-white dark:text-gray-900 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500 dark:disabled:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:focus-visible:outline-primary-400 inline-flex items-center"
                        >
                          <span
                            className="bx bxs-dollar-circle flex-shrink-0 h-4 w-4"
                            aria-hidden="true"
                          ></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-visible relative transition-all cursor-pointer rounded-xl ring-gray-200 dark:ring-gray-800 dark:ring-1 ring-0 hover:ring-2 dark:hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 shadow-md hover:shadow-lg bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 xl:col-span-3 sm:col-span-4 col-span-6 focus:outline-none">
                <div className="col-start-1 col-span-3 border-slate-400 rounded-xl">
                  <div className="sm:p-6 px-2 sm:px-2 py-6 sm:py-6">
                    {/* <!-- Hình ảnh ảo --> */}
                    <div className="relative select-none transition-all rounded-xl mt-4 mb-6 mx-auto flex justify-center items-center">
                      <img
                        alt="image"
                        loading="lazy"
                        width="200"
                        height="200"
                        decoding="async"
                        className="w-1/2 h-1/2 select-none "
                        src="https://cdn.nsoplus.com/items/7085.png"
                      />
                    </div>

                    {/* <!-- Tiêu đề ảo --> */}
                    <p className="break-words text-primary-500 dark:text-primary-400 font-bold text-center truncate lg:text-base text-sm mb-1 px-2">
                      Gói 2000 lượng
                    </p>

                    {/* <!-- Thông tin phụ --> */}
                    <div className="mb-3">
                      <p className="break-words text-gray-500 dark:text-gray-400 font-semibold text-center truncate lg:text-xs text-[11px]">
                        Mua bằng số dư
                      </p>
                    </div>

                    {/* <!-- Các nút bấm --> */}
                    <div className="flex justify-center items-center">
                      <div className="inline-flex -space-x-px rounded-md shadow-sm bg-gray-200">
                        {/* <!-- Nút giả định --> */}
                        <button
                          type="button"
                          className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-s-md text-xs gap-x-1.5 px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
                        >
                          <span>10.000</span>
                        </button>

                        {/* <!-- Nút có icon từ thư viện boxicons --> */}
                        <button
                          type="button"
                          className="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-e-md text-xs gap-x-1.5 p-1.5 shadow-sm text-white dark:text-gray-900 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500 dark:disabled:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:focus-visible:outline-primary-400 inline-flex items-center"
                        >
                          <span
                            className="bx bxs-dollar-circle flex-shrink-0 h-4 w-4"
                            aria-hidden="true"
                          ></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
