"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const CustomPagination = ({ totalPage }: { totalPage: number }) => {
  const pathname = usePathname();
  const page = useSearchParams().get("page");
  const [currentPage, setCurrentPage] = React.useState<number>(
    page ? +page : 1
  );

  React.useEffect(() => {
    setCurrentPage(page ? +page : 1);
  }, [pathname, page]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Link
            href={pathname + `/?page=${currentPage > 1 ? currentPage - 1 : 1}`}
            className="flex items-center bg-white py-2 px-4 rounded-sm select-none"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="ml-2">Previous</span>
          </Link>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{currentPage}</PaginationLink>
        </PaginationItem>
        <div>/</div>
        <PaginationItem>
          <PaginationLink className="hover:bg-transparent">{totalPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <Link
            className="flex items-center bg-white py-2 px-4 rounded-sm select-none"
            href={
              pathname +
              `/?page=${
                currentPage && currentPage < totalPage ? currentPage + 1 : 1
              }`
            }
          >
            <span className="mr-2">Next</span>
            <ChevronLeft className="w-4 h-4 rotate-180" />
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
