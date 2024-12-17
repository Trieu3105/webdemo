"use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
import { UserProvider} from "./context/UserContext";
import Trangchinh from "./home/trangchinh";

export default function Home() {

  return (
    <div>
      <UserProvider>
        <Trangchinh />
      </UserProvider>
    </div>
  );
}
