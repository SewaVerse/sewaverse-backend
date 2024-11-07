"use client";

import Banner from "@/components/Banner";
import FeaturedServices from "@/components/FeaturedService";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PopularSewaCategories from "@/components/PopularSewa";
import ServiceDetails from "@/components/ServiceDetails";
import ServicesSection from "@/components/ServiceSection";
import SewaList from "@/components/SewaAllList";
import SewaServiceBanner from "@/components/SewaServicesBanner";
import TestimonialCard from "@/components/Testimonials";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="text-center">
      <Header />
      <Banner />
      <ServicesSection />
      <PopularSewaCategories />
      <SewaServiceBanner />
      <FeaturedServices />
      <Testimonials />

      {/* added for test */}
      <SewaList />
      <ServiceDetails />

      <Footer />
      {/* <h1 className="font-bold text-center mb-5 text-2xl ">Home</h1>

      <div className="mt-4">
        <Link href="/auth/login" className="border-2 rounded-lg py-2 px-4">
          Login
        </Link>
        <div className="p-6">
          <Button variant="default">Click Me</Button>
        </div>
      </div> */}
    </main>
  );
}
