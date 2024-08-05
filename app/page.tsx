import Link from "next/link";

export default function Home() {
  return (
    <main className="text-center">
      <h1 className="font-bold text-center mb-5 ">Home</h1>

      <div className="mt-4">
        <Link
          href="/serviceproviders/sendotp"
          className="border-2 rounded-lg p-2"
        >
          Go to send otp
        </Link>
      </div>
    </main>
  );
}
