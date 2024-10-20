import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaGoogle,
  FaLinkedinIn,
} from "react-icons/fa";
import sewaverse from "../../assets/images/Sewaverse-full.svg";
export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center mb-4">
            <Image src={sewaverse} alt="Sewaverse Logo" className="h-10" />
          </div>
          <p className="text-gray-600 mb-4">
            Seamlessly offer or receive services simply, conveniently and with.
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

        {/* Company Links */}
        <div>
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

        {/* Support Links */}
        <div>
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

        {/* Services Links */}
        <div>
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

        {/* Contact Information */}
        <div>
          <h4 className="font-bold text-lg mb-4">Contact Us</h4>
          <ul className="space-y-2">
            <li className="text-gray-600">
              <span className="font-bold">📞</span> +977-2132122211
            </li>
            <li className="text-gray-600">
              <span className="font-bold">📧</span> support@gmail.com
            </li>
          </ul>
          <div className="mt-4 space-y-2">
            <a href="#" className="block">
              <img
                src="/google-play-badge.png"
                alt="Google Play"
                className="h-10"
              />
            </a>
            <a href="#" className="block">
              <img
                src="/app-store-badge.png"
                alt="App Store"
                className="h-10"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
