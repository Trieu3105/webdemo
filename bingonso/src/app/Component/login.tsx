"use client"; // Đảm bảo dòng này là dòng đầu tiên trong file

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../context/UserContext";
import Logout from "./logout";
import "../css/login.css";

const LoginModal = () => {
  const { user, setUser } = useUserContext(); // Lấy setUser từ UserContext
  const [isOpen, setIsOpen] = useState(false);
  const [formMode, setFormMode] = useState("login"); // "login" | "register" | "forgotPassword"
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fadeEffect, setFadeEffect] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Ngăn chặn hành động gửi mặc định của biểu mẫu

    try {
      let response;

      // Gửi yêu cầu đến API dựa trên formMode
      if (formMode === "login") {
        // Logic đăng nhập
        response = await axios.post("http://localhost:8080/api/login", {
          username, // Lấy username từ form
          password,
        });
        if (response.status === 200) {
          const message = response.data.message;
          const token = response.data.token;
          setSuccess(message);
          setUsername("");
          setPassword("");
          setSuccess("");
          setError("");
          Cookies.set("access_token", token); // Lưu token vào cookie
          setUser({ username: username, email: null }); // Hoặc lấy email từ API nếu có
          closeModal(); // Đóng modal khi đăng nhập thành công
        } else {
          setError("Có lỗi xảy ra: " + response.data.message);
        }
      } else if (formMode === "register") {
        // Logic đăng ký
        response = await axios.post("http://localhost:8080/api/register", {
          username,
          password,
          confirmPassword,
        });
        if (response.status === 200) {
          setSuccess("Đăng ký thành công!"); // Thông báo thành công
          setFormMode("login");
          // Reset các trường sau khi đăng ký
          setUsername("");
          setPassword("");
          setConfirmPassword("");
        } else {
          setError("Có lỗi xảy ra: " + response.data.message);
        }
      } else if (formMode === "forgotPassword") {
        // Logic quên mật khẩu
        response = await axios.post(
          "http://localhost:8080/api/forgotPassword",
          {
            email,
          }
        );
        if (response.status === 200) {
          setSuccess("Yêu cầu đã được gửi!"); // Thông báo thành công
        } else {
          setError("Có lỗi xảy ra: " + response.data.message);
        }
      }
      // console.log(response?.data); // Nếu response là undefined, đoạn mã này sẽ không gây lỗi
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("Có lỗi xảy ra:", error);
      setError("Tài Khoản or Mật Khẩu không đúng."); // Cập nhật lỗi cho người dùng
    }
  };

  const openModal = () => {
    setFadeEffect(false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setFadeEffect(true);
    setTimeout(() => setIsOpen(false), 300); // Thời gian khớp với độ mượt mà
  };

  const handleModeChange = (mode: React.SetStateAction<string>) => {
    setFadeEffect(true);
    setTimeout(() => {
      setFormMode(mode);
      setFadeEffect(false);
    }, 300); // Thời gian khớp với độ mượt mà
  };

  return (
    <div className="login-wrapper flex items-center justify-center ml-1">
      {/* Nút mở modal */}
      {user ? (
        <Logout />
      ) : (
        <button
        onClick={openModal}
        className="responsive-btn overflow-hidden bg-emerald-400 max-h-8 min-w-22  px-3 py-3 flex text-center items-center justify-center rounded-lg dark:text-gray-900 font-semibold "
      >
        <span>Đăng nhập</span>
      </button>// Hiển thị modal đăng nhập
      )}

      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div
          className="fixed inset-0 blur-xl bg-black bg-opacity-30 "
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel
            className="w-full max-w-xl p-6 bg-gray-900 rounded-xl shadow-lg min-h-92 transform transition-all duration-300 ease-in-out overflow-hidden"
            style={{ opacity: isOpen ? 1 : 0 }}
          >
            {/* Tiêu đề với các chế độ có thể nhấp */}
            <div className="w-full text-center space-x-2 mb-4 px-2 flex justify-center items-center border-2 border-gray-600 rounded-xl">
              <button
                onClick={() => handleModeChange("login")}
                className={`text-md w-1/3 font-semibold my-3 p-2 px-5 rounded-lg ${
                  formMode === "login"
                    ? "bg-gray-800 text-white"
                    : "text-gray-700 hover:bg-gray-600 dark:text-gray-400"
                }`}
              >
                Đăng nhập
              </button>
              <button
                onClick={() => handleModeChange("register")}
                className={`text-md w-1/3 font-semibold my-3 p-2 px-5 rounded-lg ${
                  formMode === "register"
                    ? "bg-gray-800 text-white"
                    : "text-gray-700 hover:bg-gray-600 dark:text-gray-400"
                }`}
              >
                Đăng ký
              </button>
              <button
                onClick={() => handleModeChange("forgotPassword")}
                className={`text-md w-1/3 font-semibold my-3 p-2 px-5 rounded-lg ${
                  formMode === "forgotPassword"
                    ? "bg-gray-800 text-white"
                    : "text-gray-700 hover:bg-gray-600 dark:text-gray-400"
                }`}
              >
                Quên Mật khẩu
              </button>
            </div>
            <p>{error}</p>
            <p>{success}</p>
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tài khoản */}
              <div
                className={`opacity-${
                  fadeEffect ? "0" : "100"
                } transition-opacity duration-300`}
              >
                <label className="block text-gray-200 text-xl font-bold">
                  Tài Khoản
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tài khoản của bạn"
                  required
                  className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 bg-gray-900 border-2 border-gray-600 rounded-xl"
                />
              </div>
              {/* Mật khẩu */}
              <div
                className={`opacity-${
                  fadeEffect ? "0" : "100"
                } transition-opacity duration-300`}
              >
                <label className="block text-gray-200 text-xl font-bold">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  required
                  className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 bg-gray-900 border-2 border-gray-600 rounded-xl"
                />
              </div>
              {/* Xác nhận mật khẩu */}
              {formMode === "register" && (
                <div
                  className={`opacity-${
                    fadeEffect ? "0" : "100"
                  } transition-opacity duration-300`}
                >
                  <label className="block text-gray-200 text-xl font-bold">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Xác nhận mật khẩu"
                    required
                    className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 bg-gray-900 border-2 border-gray-600 rounded-xl"
                  />
                </div>
              )}
              {/* Email cho quên mật khẩu */}
              {formMode === "forgotPassword" && (
                <div
                  className={`opacity-${
                    fadeEffect ? "0" : "100"
                  } transition-opacity duration-300`}
                >
                  <label className="block text-gray-200 text-xl font-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn"
                    required
                    className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 bg-gray-900 border-2 border-gray-600 rounded-xl"
                  />
                </div>
              )}
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="text-xl font-semibold text-white px-8 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
                >
                  {formMode === "login"
                    ? "Đăng nhập"
                    : formMode === "register"
                    ? "Đăng ký"
                    : "Gửi yêu cầu"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default LoginModal;
