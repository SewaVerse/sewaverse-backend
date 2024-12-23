import Link from "next/link";

import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <div className="md:px-10">
      <LoginForm />
      <div className="flex justify-center my-2">
        <p className="text-sm">
          {"Don't have an account?"}
          <Link
            href={{ pathname: "/account-type", query: { role: "user" } }}
            className="text-primary"
          >
            {" "}
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
