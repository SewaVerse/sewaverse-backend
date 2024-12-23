import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const socialLinks = [
  {
    path: "/images/facebook.svg",
    link: "https://www.facebook.com/",
    alt: "facebook",
  },
  {
    path: "/images/linkedin.svg",
    link: "https://www.facebook.com/",
    alt: "linkedin",
  },
  {
    path: "/images/instagram.svg",
    link: "https://www.instagram.com/",
    alt: "instagram",
  },
  {
    path: "/images/tiktok.svg",
    link: "https://www.tikok.com/",
    alt: "tiktok",
  },
  {
    path: "/images/youtube.svg",
    link: "https://www.youtube.com/",
    alt: "youtube",
  },
];

const mobileLinks = [
  {
    path: "/images/playstore.svg",
    alt: "playstore",
    title: "Get it from",
    description: "Google Play",
  },
  {
    path: "/images/apple.svg",
    alt: "apple store",
    title: "Download from",
    description: "Apple Store",
  },
];
const Footer = () => {
  return (
    <footer className="p-4 md:pt-5 md:pb-4 border-t shadow-md rounded-md">
      <div className="flex gap-5 h-full px-8">
        <div className="flex flex-col justify-between md:max-w-[18rem]">
          <div className="flex flex-col gap-2">
            <Image
              src="/images/sewaverse.svg"
              alt="logo"
              width={150}
              height={180}
              className="h-auto w-auto"
            />
            <p className="ms-[4rem] text-sm">
              Offer or receive services with simplicity, convenience, and
              seamless ease.
            </p>
            <div className="flex justify-between items-center my-2">
              {socialLinks.map((socialLink) => (
                <Link
                  href={socialLink.link}
                  key={socialLink.alt}
                  target="_blank"
                >
                  <Image
                    src={socialLink.path}
                    alt={socialLink.alt}
                    width={0}
                    height={0}
                    className="h-6 w-6"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-auto">
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full md:px-10">
          <div className="flex justify-around">
            <div>
              <h5 className="mb-4">Company</h5>
              <ul className="flex flex-col gap-1">
                <li>About Us</li>
                <li>Sewaverse Academy</li>
                <li>Careers</li>
                <li>Newsroom</li>
              </ul>
            </div>
            <div>
              <h5 className="mb-4">Support</h5>
              <ul className="flex flex-col gap-1">
                <li>Help Center</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div>
              <h5 className="mb-4">Services</h5>
              <ul className="flex flex-col gap-1">
                <li>Be a Sewa Provider</li>
                <li>Explore Services</li>
                <li>Partner with us</li>
              </ul>
            </div>
            <div>
              <h5 className="mb-4">Contact us</h5>
              <ul className="flex flex-col gap-1">
                <li>Message Us</li>
                <li>Provide Feedback</li>
                <li className="flex gap-2">
                  <Image
                    src={"/images/phone.svg"}
                    alt="phoone"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                  +977-21234567
                </li>
                <li className="flex gap-2">
                  <Image
                    src={"/images/footer-mail.svg"}
                    alt="phoone"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                  support@gmail.com
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            {mobileLinks.map((socialLink) => (
              <Button
                key={socialLink.alt}
                variant={"outline"}
                className="py-1 px-4 h-auto w-auto"
              >
                <Image
                  src={socialLink.path}
                  alt={socialLink.alt}
                  width={20}
                  height={20}
                  className="w-auto h-auto"
                />
                <div className="text-left">
                  <p className="text-[10px]">{socialLink.title}</p>
                  <p className="text-sm">{socialLink.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Separator className="w-full mt-2" />
      <div className="pt-1">
        <p className="text-center text-brand-grey">
          Copyright 2024 © All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
