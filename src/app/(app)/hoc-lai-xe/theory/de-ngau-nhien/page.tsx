import * as React from "react";
import RandomLesson from "./Home";
import ErrorPage from "@/app/not-found";

const IndexPage = () => {
  return (
    <React.Suspense fallback={<ErrorPage />}>
      <RandomLesson />
    </React.Suspense>
  );
};

export default IndexPage;
