import React from "react";
import Image from "next/image"; // Assuming you're using Next.js for image optimization

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto flex flex-wrap justify-between px-4">
        {/* Logo Section with Social Media Section below it */}
        <div className="flex-1 max-w-xs">
          <Image src="/images/sewaverse.svg" alt="Sewaverse Logo" width={120} height={40} />
          <p className="text-sm text-gray-600 mt-2">
            Seamlessly offer or receive services simply, conveniently, and with.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Image src="/images/facebook.svg" alt="Facebook" width={25} height={25} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Image src="/images/linkin.svg" alt="LinkedIn" width={25} height={25} />
            </a>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer">
              <Image src="/images/google.svg" alt="Google" width={25} height={25} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Image src="/images/insta.svg" alt="Instagram" width={25} height={25} />
            </a>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="flex flex-wrap justify-between space-x-4 mt-4 md:mt-0 w-full">
          <div className="w-full sm:w-1/4 md:w-auto mb-4 md:mb-0">
            <h3 className="text-lg text-blue-800 font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-600 hover:text-blue-800">About us</a></li>
              <li><a href="#services" className="text-gray-600 hover:text-blue-800">Services</a></li>
              <li><a href="#testimonial" className="text-gray-600 hover:text-blue-800">Testimonial</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/4 md:w-auto mb-4 md:mb-0">
            <h3 className="text-lg text-blue-800 font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#help-center" className="text-gray-600 hover:text-blue-800">Help Center</a></li>
              <li><a href="#feedback" className="text-gray-600 hover:text-blue-800">Feedback</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/4 md:w-auto mb-4 md:mb-0">
            <h3 className="text-lg text-blue-800 font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#painting" className="text-gray-600 hover:text-blue-800">Painting</a></li>
              <li><a href="#cleaning" className="text-gray-600 hover:text-blue-800">Cleaning</a></li>
              <li><a href="#babysitting" className="text-gray-600 hover:text-blue-800">Baby sitting</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/4 md:w-auto mb-4 md:mb-0">
            <h3 className="text-lg text-blue-800 font-semibold mb-4">Contact us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">+977-2131222211</li>
              <li><a href="mailto:support@gmail.com" className="text-gray-600 hover:text-blue-800">support@gmail.com</a></li>
            </ul>
          </div>
        </div>

        {/* App Download Links */}
        <div className="flex flex-wrap justify-start md:justify-end space-x-4 mt-8 md:mt-0 w-full md:w-auto">
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
            <Image src="/images/google-play.svg" alt="Google Play" width={160} height={55} />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <Image src="/images/app-store.svg" alt="App Store" width={160} height={55} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
