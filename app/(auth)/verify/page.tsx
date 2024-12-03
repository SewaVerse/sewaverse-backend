import VerifyPageComponent from "./_components/VerifyPage";
import React, { Suspense } from "react";

const VerifyPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyPageComponent />
      </Suspense>
    </>
  );
};

export default VerifyPage;
