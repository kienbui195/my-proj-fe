"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { IAuthState, updateUser } from "@/lib/features/authSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

const MainHeader = () => {
  const isClient = typeof window === 'object'
  const dispatch = useDispatch()
  // const userInfo:IAuthState = React.useMemo(() => {
  //   if (isClient) {
  //     const data = localStorage.getItem('KDEV_USER')
  //     if (data) {
        
  //     }
  //   }
  // }, [])
  

  return (
    <header className=" w-full fixed z-[49] top-0  left-0 border-b border-black shadow-md py-4">
      <div className="w-full max-w-[1060px] m-auto">
        <div className="flex items-center justify-between">
          <div></div>
          <div className="flex gap-2">
            <Link href={"/sign-up"}>
              <Button variant="ghost">Sign Up</Button>
            </Link>
            <Link href={"/sign-in"}>
              <Button className="">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
