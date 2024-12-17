"use client"; // Đảm bảo đây là dòng đầu tiên trong file

import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "../globals.css"; // Tạo file CSS để định dạng
import "slick-carousel/slick/slick.css"; // Thêm CSS cho slick-carousel
import "slick-carousel/slick/slick-theme.css"; // Thêm theme CSS cho slick-carousel
import "../css/slide.css";
const slides = [
  { id: 1, image: "./images/sl2.webp", alt: "Slide 1" },
  { id: 2, image: "./images/sl3.webp", alt: "Slide 2" },
  { id: 3, image: "./images/sl1.webp", alt: "Slide 3" },
];

const Slideshow = () => {
  const sliderRef = useRef<Slider | null>(null); // Tạo ref cho slider
  const [currentSlide, setCurrentSlide] = useState(0); // State để theo dõi slide hiện tại

  const settings = {
    dots: false, // Tắt dots mặc định của slick
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };

  // Hàm điều hướng
  const prevSlide = () => sliderRef.current?.slickPrev();
  const nextSlide = () => sliderRef.current?.slickNext();

  return (
    <div className="slidercontainer overflow-hidden w-full rounded-2xl relative ">
      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <img
              src={slide.image}
              alt={slide.alt}
              className="slide-image w-full h-auto rounded-2xl object-cover"
            />
          </div>
        ))}
      </Slider>

      {/* Nút điều hướng (Prev/Next) */}
      <button
        onClick={prevSlide}
        className="slider-controls absolute left-4 top-1/2 transform -translate-y-1/2 p-3 text-white rounded-full shadow-lg z-30 hover:bg-gray-600 hover:bg-opacity-30 transition duration-200 ease-in-out"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m15 19-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="slider-controls  absolute right-4 top-1/2 transform -translate-y-1/2 p-3 text-white rounded-full shadow-lg z-30 hover:bg-gray-600 hover:bg-opacity-30 transition duration-200 ease-in-out"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m9 5 7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div className="slider-indicators absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => {
              if (sliderRef.current) {
                sliderRef.current.slickGoTo(index);
              }
            }}
            className={`w-4 h-4 border-2 rounded-full transition-transform duration-300 ${
              currentSlide === index
                ? "bg-blue-500 border-blue-500 scale-15"
                : "bg-transparent border-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
