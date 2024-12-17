"use client";

// import Products from "../tintuc/tintuc";
import Home from "../Component/homeproduct";
import SimpleSlider from "../Component/slideshow";
import "../css/trangchinh.css"

export default function Trangchinh() {
  return (
    <div>
      <div className="Menudoc col-start-3 sm:col-start-1 col-span-10 mx-6 md:mx-4 md:col-start-2 md:col-span-12">
        <div className="grid grid-cols-24 md:grid-cols-12">
          {/* Header */}
          <div className="Header w-full max-h-16 justify-between items-center capitalize mb-4 col-start-2 col-span-10 mt-4 md:col-start-1 md:col-span-12">
            <div className="grid grid-cols-12">
              {/* Logo và tên */}
              <div className="Logo col-start-1 col-span-3 md:col-span-6 flex flex-col items-start">
                <div className="w-full h-auto flex items-center justify-start text-3xl sm:text-lg md:text-3xl lg:text-4xl overflow-hidden font-bold text-center">
                  <svg
                    className="mx-3"
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
                  <span className="text-3xl">BinGo Nso</span>
                </div>
                <div className="SchoolName text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg mt-1 ml-0 sm:ml-3">
                  Ninja School Online
                </div>
              </div>

              {/* Nút Tải Game */}
              <div className="TaiGameButton col-start-11 col-span-2 flex items-center justify-end md:col-start-8 md:col-span-5 mt-3 sm:mt-0">
                <button className="w-full sm:w-2/3 bg-emerald-400 text-gray-800 font-bold border-solid rounded-xl flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-lg py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="10"
                    width="7.5"
                    viewBox="0 0 384 512"
                  >
                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                  </svg>
                  <span className="ml-1">Tải Game</span>
                </button>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="Slider w-full h-[600px] col-start-1 col-span-12 overflow-hidden md:col-start-1 md:col-span-12 md:h-[300px] lg:h-[550px]">
            <SimpleSlider />
          </div>

          {/* Home content */}
          <div className="HomeContent col-start-2 col-span-10 mt-4 md:col-start-1 md:col-span-12">
            <Home />
          </div>
        </div>
      </div>
    </div>
  );
}
