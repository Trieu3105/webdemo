"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface User {
  username: string;
  email: string | null;
}

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextType {
  user: User | null;
  email: string | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const token = Cookies.get("access_token");

  const fetchUserData = async (accessToken: string) => {
    try {
      const response = await axios.get("http://localhost:8080/api/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });

      if (response.status === 200 && response.data.profile) {
        const { username, email } = response.data.profile;
        setUser({ username, email });
        setEmail(email); // Cập nhật email
        // console.log(
        //   "User information fetched successfully:",
        //   response.data.profile
        // );
      } else {
        console.warn("User not found or other error.");
        // return
        setUser(null);
        setEmail(null);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return
      // console.error("Error fetching user data:", error);
      // setUser(null);
      // setEmail(null);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData(token); // Nếu có token, fetch thông tin người dùng
    } else {
      setUser(null); // Nếu không có token, đảm bảo không có thông tin người dùng
    }
  }, [token]);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        { username, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const newToken = response.data.token;
        Cookies.set("access_token", newToken, { expires: 1 }); // Lưu token vào cookies
        await fetchUserData(newToken); // Cập nhật thông tin người dùng sau khi đăng nhập
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setEmail(null);
    Cookies.remove("access_token"); // Xóa token khi đăng xuất
  };

  return (
    <UserContext.Provider value={{ user, email, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUserContext };
