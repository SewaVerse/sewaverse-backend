"use client"
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import FeedbackForm from "@/app/(hero)/partner/_components/FeedbackForm";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import FooterAccordion from "./FooterAccordoin";

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

const Terms = ({ className }: { className: string }) => {
  return (
    <div className={clsx(" mt-auto", className)}>
      <p>Terms of Service</p>
      <p>Privacy Policy</p>
    </div>
  );
};

const Footer = () => {
  const [open, setOpen] = useState(false)
  return (
    <footer className="p-4 md:pt-5 md:pb-4 border-t shadow-md rounded-md">
      <div className="flex flex-col md:flex-row gap-5 h-full px-2 md:px-8">
        <div className="flex flex-col justify-between md:max-w-[18rem]">
          <div className="flex flex-col gap-2 justify-center items-center">
            <Image
              src="/images/sewaverse.svg"
              alt="logo"
              width={150}
              height={180}
              className="h-auto w-auto"
            />
            <p className="text-center justify-center md:ms-[4rem] md:text-left text-sm">
              Offer or Receive Sewas with Ease and Convenience.
            </p>
            <div className="flex justify-center gap-4 md:justify-between items-center my-2">
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
          <Terms className="hidden md:flex justify-between" />
        </div>
        <div className="flex flex-col gap-2 w-full md:px-10">
          <div className="flex flex-col md:flex-row md:justify-around">
            <FooterAccordion title="Company">
              <ul className="flex flex-col gap-1">
                <Link href={"/about-us"}>
                  <li>About Us</li>
                </Link>
                <li>Sewaverse Academy</li>
                <li>Careers</li>
                <li>Newsroom</li>
              </ul>
            </FooterAccordion>

            <FooterAccordion title="Support">
              <ul className="flex flex-col gap-1">
                <li>Help Center</li>
                <li>FAQs</li>
              </ul>
            </FooterAccordion>

            <FooterAccordion title="Services">
              <ul className="flex flex-col gap-1">
                <Link href="/beasewaprovider">
                <li>Be a Sewa Provider</li>
                </Link>
                <li>Explore Services</li>
                <Link href={"/partner"}>
                <li>Partner with us</li>
                </Link>
              </ul>
            </FooterAccordion>
            <FooterAccordion title="Contact us">
              <ul className="flex flex-col gap-1">
                <li>Message Us</li>
                <li onClick={() => setOpen(true)}>Provide Feedback</li>
                
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
            </FooterAccordion>
          </div>
          <div className="flex md:justify-end md:gap-4 gap-2">
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
                  className="w-[2rem] h-[2rem] md:w-auto md:h-auto"
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
      <Separator className="w-full mt-2 hidden md:block" />
      <div className="mb-2 md:mb-0 pt-1">
        <p className="text-center text-brand-grey text-sm">
          ©2024 Sewaverse. All rights reserved.
        </p>
      </div>
      <Terms className="flex flex-col justify-center items-center gap-2 md:hidden" />
      {
        open && <FeedbackForm open={open} onOpenChange={setOpen}/>
      }
    </footer>
  );
};

export default Footer;
