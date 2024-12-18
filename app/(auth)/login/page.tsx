import Link from "next/link";
import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <div>
      <LoginForm />
      <div className="flex justify-center my-2">
        <p className="text-sm">
          {"Don't have an account?"}
          <Link href="/accountType" className="text-primary">
            {" "}
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
