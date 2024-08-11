import { Button, Input, InputNumber, Modal, notification } from "antd";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Sewaverse from "../../assets/images/Sewaverse.png";

const Header = () => {
  const [inputOtp, setInputOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState<string>("");
  const [viewType, setViewType] = useState<string>("send-otp");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const validateOtp = () => {
    const enteredOtp = inputOtp.join("");
    if (enteredOtp === generatedOtp) {
      notification.success({
        message: "OTP Valid",
        description: "The OTP is valid.",
      });
    } else {
      notification.error({
        message: "OTP Invalid",
        description: "The OTP is invalid.",
      });
    }
  };

  const handleChange = (value: string, index: number) => {
    const newOtp = [...inputOtp];
    newOtp[index] = value;
    setInputOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !inputOtp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const sendOTP = () => {
    setViewType("otp-view");
    notification.success({
      message: "OTP is sent to your mobile number",
    });

    //WIP
  };

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="#">
              <span className="sr-only">Home</span>
              <Image src={Sewaverse} alt={"Sewa Verse"} width={70} />
            </a>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    About{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Services{" "}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                href="#"
              >
                Login
              </a>

              <div className="hidden sm:flex">
                <a
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                  onClick={showModal}
                >
                  Register
                </a>
              </div>
            </div>

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title=""
        open={isModalOpen}
        width={405}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex flex-col items-center justify-center ">
          <Image src={Sewaverse} alt={"Sewa Verse"} width={70} />
          <p className="my-4">
            Please continue with your mobile number for registration
          </p>
          {viewType === "send-otp" ? (
            <>
              <InputNumber addonBefore="+977" style={{ width: "100%" }} />
              <Button type="primary" className="mt-4" onClick={sendOTP}>
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <div className="flex space-x-2 mt-4">
                {inputOtp.map((value, index) => (
                  <Input
                    key={index}
                    className="w-12 text-center"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el: any) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>
              <Button type="primary" className="mt-4" onClick={validateOtp}>
                Validate OTP
              </Button>
            </>
          )}
        </div>
      </Modal>
    </header>
  );
};

export default Header;
