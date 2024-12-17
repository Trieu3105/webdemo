'use client'
import Doiluong from "./doiluong";

import { useUserContext } from "../context/UserContext";


export default function Home(){
  const { user } = useUserContext();

    if (!user) return null;
    return(
        <div>
            <Doiluong/>
        </div>
    );
}