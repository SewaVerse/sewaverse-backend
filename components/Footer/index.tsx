import sewaverse from "../../assets/images/Sewaverse-full.svg";
import appleStore from "../../assets/images/apple-store.svg";
import googlePlay from "../../assets/images/google-play.svg";
import Image from "next/image";
import { BsFillTelephoneFill } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagram,
  FaGoogle,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-16">
      <div className="px-20 text-start">
        <div className="flex justify-between">
          <div className="w-[310px]">
            <div className="flex items-center mb-4">
              <Image src={sewaverse} alt="Sewaverse Logo" className="h-10" />
            </div>
            <p className="text-gray-600 mb-4">
              Seamlessly offer or receive services simply, conveniently and
              with.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FaGoogle />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className="flex">
            <div className="w-[200px]">
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Testimonial
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-[200px]">
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Feedback
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Mail Us
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-[200px]">
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Painting
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Cleaning
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Baby Sitting
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-[200px]">
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="font-bold">
                    <BsFillTelephoneFill color="#023994" />
                  </span>{" "}
                  +977-2132122211
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="font-bold">
                    <IoMail color="#023994" />
                  </span>{" "}
                  support@gmail.com
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-5 mt-4">
          <div className="flex rounded-lg	 w-[200px] h-[57px] bg-white px-[30px] py-2">
            {/* <a href="#"> */}
            <div>
              <Image src={googlePlay} alt="Google Play" className="h-10" />
            </div>
            <div>
              <p style={{ fontSize: "10px" }}>Get it from </p>
              <p style={{ fontSize: "16px" }}>Google Play</p>
            </div>
            {/* </a> */}
          </div>
          <div className="flex rounded-lg	 w-[200px] h-[57px] bg-white px-[30px] py-2">
            {/* <a href="#"> */}
            <div>
              <Image src={appleStore} alt="App Store" className="h-10" />
            </div>
            <div>
              <p style={{ fontSize: "10px" }}>Download from</p>
              <p style={{ fontSize: "16px" }}>App Store</p>
            </div>
            {/* </a> */}
          </div>
        </div>
      </div>
      <div className="divider mt-[18px]"></div>
    </footer>
  );
}
