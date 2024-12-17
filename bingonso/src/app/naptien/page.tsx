"use client";

import Naptien from "./naptien";
// import LoginModal from "../Component/login";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import { useUserContext } from "../context/UserContext";

export default function Home() {
  const { user } = useUserContext();

  // Hiển thị trang nếu user đã đăng nhập
  if (!user) {return null;}

  return (
    <div>
      <Naptien />
    </div>
  );
}
