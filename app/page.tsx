import Link from "next/link";

export default function Home() {
  return (
    <main className="text-center">
      <h1 className="font-bold text-center mb-5 text-2xl ">Home</h1>

      <div className="mt-4">
        <Link
          href="/serviceproviders/login"
          className="border-2 rounded-lg py-2 px-4"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
