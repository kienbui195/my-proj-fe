'use client'

import * as React from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import Link from "next/link";

const MainHeader = () => {
  return (
    <header className="flex items-center w-full fixed z-[99] top-0 justify-between left-0 border-b border-black shadow-md py-4">
      <NavigationMenu className="w-full max-w-[1060px] m-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href={"/test-crawler"} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Test Crawler
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default MainHeader;
