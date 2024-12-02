import LoginForm from "./_components/LoginForm";
import React, { Suspense } from "react";

const Login = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default Login;
