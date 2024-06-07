"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { IAuthState, clearUser, updateUser } from "@/lib/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import apis from "@/lib/apis";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import { useToast } from "../ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Image from "next/image";
import { Profile } from "@/lib/svgExport";
import { LogOut, Settings, User } from "lucide-react";

const MainHeader = () => {
  const isClient = typeof window === "object";
  const dispatch = useDispatch();
  const router = useRouter();
  const userLocal = isClient
    ? localStorage.getItem("KDEV_USER")
      ? JSON.parse(localStorage.getItem("KDEV_USER") as string)
      : {}
    : {};
  const userInfo = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("KDEV_USER");
    toast({
      description: "You are sign out!",
    });
  };

  React.useEffect(() => {
    apis
      .getUser({ id: userLocal?.id ?? 0 })
      .then((res) => {
        dispatch(
          updateUser([
            {
              fieldName: "id",
              value: res.data.id,
            },
            {
              fieldName: "username",
              value: res.data.username,
            },
            {
              fieldName: "email",
              value: res.data.email,
            },
            {
              fieldName: "token",
              value: userLocal?.token ?? "",
            },
          ])
        );
      })
      .catch((err) => {
        if (err.statusCode === 401) {
          localStorage.removeItem("KDEV_USER");
          router.refresh();
        }
        toast({
          description: `Session's Login is expired!`,
          variant: "destructive",
        });
      });
  }, []);

  return (
    <header className=" w-full fixed z-[49] top-0  left-0 border-b border-black shadow-md py-4">
      <div className="w-full max-w-[1060px] m-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/chat-app">
              <Button variant={"ghost"}>Chat Chit</Button>
            </Link>
          </div>
          {userInfo.id !== 0 ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback className="font-bold bg-yellow-100">
                      {userInfo.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <Link href={"/my-profile"}>
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={"/my-settings"}>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href={"/sign-up"}>
                <Button variant="ghost">Sign Up</Button>
              </Link>
              <Link href={"/sign-in"}>
                <Button className="">Sign In</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
