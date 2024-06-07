import Link from "next/link";
import * as React from "react";

const BuildingPage = () => {
  return (
    <section className="w-full h-[80vh] flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="font-bold text-3xl">
          Oops! This feature are building by me!
        </div>
        <Link href="/" className="text-blue-500">
          Go back
        </Link>
      </div>
    </section>
  );
};

export default BuildingPage
