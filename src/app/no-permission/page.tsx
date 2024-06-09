import Link from "next/link";
import * as React from "react";

const NoPermissionPage = () => {
  return (
    <section className="w-full h-[80vh] flex flex-col justify-center items-center">
      <div>You have no permission to see this page!</div>
      <Link href={"/"} className="text-blue-500">
        Go back Home
      </Link>
    </section>
  );
};

export default NoPermissionPage;
