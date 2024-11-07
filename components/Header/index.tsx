import img from "../../assets/images/Sewaverse.svg";
import loginImg from "../../assets/images/loginImg.png";
import { Button } from "../ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useState } from "react";

const Header = () => {
  const [location, setLocation] = useState("Jorpati");
  const [category, setCategory] = useState("Category");

  return (
    <header className="flex items-center justify-between px-6 py-3 shadow-md">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Image src={img} alt="Logo" width={80} height={53} />
          </div>

          <div className="flex gap-8 border border-gray-300 box-shadow rounded-lg w-full">
            <select
              value={category}
              className="p-4"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Category">Category</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
            </select>

            <input
              type="text"
              placeholder="Search services..."
              className="py-4"
            />

            <div className="flex items-center py-4">
              <span className="material-icons text-blue-500">location_on</span>
              <span className="font-medium">{location}</span>
            </div>
            <Button className="h-auto bg-primary  text-white rounded-lg">
              <span className="material-icons">search</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="link">Why Sewaverse</Button>
        <Button variant="link">Become a Sewa provider</Button>
        <Button variant="link">Login</Button>
        <Button
          variant="default"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Register
        </Button>
      </div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="btn-primary">Open Modal</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-0 bg-white z-10 h-[660px] shadow-lg md:rounded-lg">
            <div className="flex h-full w-full">
              <div>
                <Image
                  src={loginImg}
                  alt="Logo"
                  width={500}
                  height={700}
                  className="h-full"
                />
              </div>
              <div className="p-32">
                <div className="w-[420px]">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Welcome back!</h2>
                    <Dialog.Close className="btn-icon">X</Dialog.Close>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    Get instant access to the services you need.
                  </p>
                  <form>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="sr-only">
                          Email address or phone number
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Email address or phone number"
                          className="w-full p-3 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          placeholder="Password"
                          className="w-full p-3 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox" />
                        <span>Remember me</span>
                      </label>
                      <a href="#" className="text-sm text-blue-600">
                        Forgot Password?
                      </a>
                    </div>
                    <button type="submit" className="btn-primary w-full mt-4">
                      Login
                    </button>
                  </form>
                  <div className="relative flex py-6 items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400">
                      Or login with
                    </span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>
                  <button className="btn-google w-full flex items-center justify-center">
                    {/* <GoogleIcon className="mr-2" /> */}
                    Continue with Google
                  </button>
                  <p className="text-center mt-6 text-sm">
                    Don’t have an account?{" "}
                    <a href="#" className="text-blue-600">
                      Register here
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
};

export default Header;
