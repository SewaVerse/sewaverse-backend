import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { SignOut } from "./SignOut";

const Header = async () => {
  const session = await auth();

  const isLoggedin = !!session?.user;
  return (
    <header className="bg-white p-4 shadow-md flex justify-center items-center border-b-2 border-blue-500">
      <div className="flex items-center w-full max-w-6xl justify-between">
        {/* Logo */}
        <div className="logo">
          <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
        </div>

        {/* Search Bar */}
        <div className="flex items-center flex-1 mx-5 bg-gray-100 rounded-full overflow-hidden shadow-md">
          <input
            type="text"
            placeholder="Search services..."
            className="flex-1 border-none p-2.5 text-lg outline-none"
          />
          <div className="flex items-center px-3 border-l border-gray-300">
            <Image
              src="/images/location.svg"
              alt="location"
              width={16}
              height={16}
            />
            <span>Jorpati</span>
          </div>
          <button className="bg-purple-600 p-2.5 flex items-center justify-center cursor-pointer">
            <Image
              src="/images/search.svg"
              alt="search"
              width={16}
              height={16}
              className="filter brightness-0 invert"
            />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-5">
          <a
            href="#why-sewaverse"
            className="text-gray-800 text-sm hover:text-purple-600"
          >
            Why Sewaverse
          </a>
          <a
            href="#provider"
            className="text-[#2E3192] text-sm hover:text-[#1a2573]"
          >
            Become a Sewa provider
          </a>

          {isLoggedin ? (
            <SignOut />
          ) : (
            <div>
              <Link
                href="/login"
                className="text-gray-800 text-sm hover:text-purple-600"
              >
                Login
              </Link>
              <button className="bg-purple-600 text-white py-2 px-5 rounded-full text-sm cursor-pointer hover:bg-purple-700">
                Sign up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
