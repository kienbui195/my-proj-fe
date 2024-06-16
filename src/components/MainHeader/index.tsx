"use client";

import * as React from "react";
import Link from "next/link";
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
import { Crown, LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import { Button } from "../ui/button";

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
    if (!userLocal.id || userLocal.id === 0) return;
    apis
      .getUser({ id: userLocal.id })
      .then((res) => {
        if (!res) return console.log("get user");

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
            {
              fieldName: "role",
              value: res.data.user_role,
            },
            {
              fieldName: "acc_status",
              value: res.data.acc_status,
            },
          ])
        );
      })
      .catch((err) => {
        if (err.statusCode === 401) {
          localStorage.removeItem("KDEV_USER");
          toast({
            description: `Session's Login is expired!`,
            variant: "destructive",
          });
          router.push("/");
        }
        router.push("/");
        toast({
          description: `Session's Login is expired!`,
          variant: "destructive",
        });
      });
  }, []);

  return (
    <header className=" w-full fixed z-[49] top-0  left-0 border-b border-black shadow-md py-4 bg-slate-300">
      <div className="w-full max-w-[1060px] m-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/hoc-lai-xe">
              <Button variant={"ghost"}>Học lái xe</Button>
            </Link>
          </div>
          {userInfo.id !== 0 ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className={`outline-none relative`}>
                  <Avatar
                    className={`${
                      userInfo.role === "admin"
                        ? "border-2 border-yellow-400 rounded-full"
                        : ""
                    }`}
                  >
                    <AvatarFallback className="font-bold bg-yellow-100">
                      {userInfo.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {userInfo.role === "admin" && (
                    <Crown className="w-4 h-4 absolute -top-1/4 left-1/3 bg-yellow-400" />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {userInfo.role === "admin" && (
                    <Link href={"/admin-dashboard"}>
                      <DropdownMenuItem>
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                    </Link>
                  )}
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
