"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <section className="w-full">
      <Card className="w-full shadow-md min-h-[80vh]">
        <CardTitle className="p-4">Admin Dashboard</CardTitle>
        <CardContent className="sm:grid sm:grid-cols-4 gap-2">
          <Card className="shadow-md p-1 h-fit">
            <Link href={`/admin-dashboard/hoc-lai-xe`}>
              <Button
                variant={"outline"}
                className={`w-full ${
                  pathname.includes("/admin-dashboard/hoc-lai-xe")
                    ? "font-semibold bg-green-300"
                    : ""
                }`}
              >
                Học lái xe
              </Button>
            </Link>
          </Card>

          <Card className="col-span-3 shadow-md p-2">{children}</Card>
        </CardContent>
      </Card>
    </section>
  );
};

export default Layout;
