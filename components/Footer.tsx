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

const Footer = () => {
  return (
    <footer className="p-4 md:pt-10 md:pb-4">
      <div className="flex gap-5 h-full px-8">
        <div className="flex flex-col justify-between md:max-w-[18rem]">
          <div className="flex flex-col gap-2">
            <Image
              src="/images/sewaverse.svg"
              alt="logo"
              width={200}
              height={200}
            />
            <p className="ms-[2.5rem] text-sm">
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
                    width={20}
                    height={20}
                    className="object-cover"
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
              <h5 className="mb-4">Company</h5>
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
                  />
                  +977-21234567
                </li>
                <li className="flex gap-2">
                  <Image
                    src={"/images/footer-mail.svg"}
                    alt="phoone"
                    width={20}
                    height={20}
                  />
                  support@gmail.com
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant={"outline"} className="py-1 px-4 h-auto w-auto">
              <Image
                src={"/images/playstore.svg"}
                alt="playstore"
                width={25}
                height={25}
              />
              <div className="text-left">
                <p className="text-[10px]">Get it from</p>
                <p className="text-sm">Google Play</p>
              </div>
            </Button>
            <Button variant={"outline"} className="py-1 px-4 h-auto w-auto">
              <Image
                src={"/images/apple.svg"}
                alt="playstore"
                width={25}
                height={25}
              />
              <div className="text-left">
                <p className="text-[10px]">Download from</p>
                <p className="text-sm">Apple Store</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Separator className="w-full mt-2" />
      <div className="pt-4">
        <p className="text-center text-brand-grey">
          Copyright 2024 © All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
