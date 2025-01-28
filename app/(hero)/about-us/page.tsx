import BottomSection from "./_components/BottomSection";
import Hero from "./_components/Hero";
import OurMission from "./_components/OurMission";
import OurStory from "./_components/OurStory";
import OurValues from "./_components/OurValues";
import OurVision from "./_components/OurVision";
import WhatWeDo from "./_components/WhatWeDo";

const heroData = {
  image: "/images/servicesImage/about-us.svg",
  smileImage: "/images/servicesImage/smile.svg",
  title: "Sewaverse",
  description: "  Your Gateway to the Universe of  Services",
  subtitle: "Delivering comfort and joy !",
};

const ourStoryData = {
  title: "Our Story",
  description1: [
    "How would your life be if the services you need are just a click away?",
    "Imagine a world where reliable and skilled Sewa Providers are always within reach—a world where your needs are met effortlessly with just a simple click.",
    "That's the world we're building at Sewaverse. The world where you will be connected with an ever-expanding array of trusted Sewa Providers.",
    "Therefore, Sewaverse, as a digital service marketplace, connects you with the right services for your needs. Here, Sewa Providers showcase their portfolio, experiences, skills, talents, and services, along with ratings and reviews, while you enjoy seamless booking of the best services.",
  ],

  description2: [
    "Further, the modern life is full of challenges. The stress of finding reliable services, the frustration of dealing with inefficient solutions. That's why we created Sewaverse - a platform designed to simplify your life.",

    "Togeteher, let's revolutionize the way we access to services; let's join hands to make life simpler, more convenient, and fulfilling.",

    "Welcome to this one-stop platform of reliable and high quality services. Join Sewaverse community now!",
  ],
};

const ourVisionData ={
  name:'Our Vision',
  title:'To make life easier, better, and more fulfilling by providing instant and seamless access to the services people need.',
  description:'We aim to enhance the quality of life by making services accessible, reliable, and tailored to the specific needs of every individual.'
}
const ourMissionData ={
  name:'Our Mission',
  title:'To revolutionize access to services through a community-driven platform that empowers both users and sewa providers.',
  description:'For users, we offer a universe of services to meet their daily needs with ease. For sewa providers, we deliver a platform where their skills and expertise can be showcased, helping them grow their businesses and achieve success.'
}


export const redLine = "/images/servicesImage/underline.svg";

const Page = () => {
  return (
    <div>
      <Hero heroData={heroData} />
      <div className="md:px-16 py-2">
        <OurStory ourStoryData={ourStoryData} />
        <OurVision  ourVisionData ={ourVisionData}/>
        <OurMission ourMissionData={ourMissionData}/>
        <OurValues/>
        <WhatWeDo/>
        <BottomSection/>
      </div>
    </div>
  );
};

export default Page;
