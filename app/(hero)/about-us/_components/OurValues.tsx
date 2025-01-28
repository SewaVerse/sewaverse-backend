import Image from "next/image";

import { redLine } from "../page";

const awardImage = "/images/servicesImage/awards.svg";
const businessIamge = "/images/servicesImage/business.svg";
const communityImage = "/images/servicesImage/Community.svg";
const ConvenienceImage = "/images/servicesImage/Convenience.svg";
const CustomerImage = "/images/servicesImage/Customer.svg";
const onlineImage = "/images/servicesImage/online.svg";
const respectImage = "/images/servicesImage/respect.svg";

const OurValues = () => {
  return (
    <div className="py-4">
      <div className="flex flex-col items-center">
        <h1 className="md:text-4xl font-semibold gradient-text">Our Values</h1>
        <Image
          src={redLine}
          alt="redLine"
          width={100}
          height={20}
          className="md:w-[170px] md:h-[30px]"
        />
      </div>

      <div className=" md:mx-52 px-2">
        <div className="">
          <div className="flex items-center gap-5">
            <Image src={awardImage} alt="award" height={140} width={140} />
            <div>
              <h1 className=" gradient-text md:text-xl font-bold">
                Go for Best:{" "}
                <span className="md:text-lg text-black font-bold">
                  Excellence is our standard.
                </span>
              </h1>
              <p className="md:text-base font-medium">
                {" "}
                We are dedicated to setting new benchmarks in service
                excellence.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <Image
              src={onlineImage}
              alt="onlineImage"
              height={120}
              width={120}
            />
            <div>
              <h1 className=" gradient-text md:text-xl font-bold">
                Innovation::{" "}
                <span className="md:text-lg text-black font-bold">
                  Always thinking ahead.
                </span>
              </h1>
              <p className="md:text-base font-medium">
                {" "}
                We continually seek fresh ideas and advancements, enhancing the
                way you access and experience services.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <Image
              src={respectImage}
              alt="respectImage"
              height={120}
              width={120}
            />
            <div>
              <h1 className=" gradient-text md:text-xl font-bold">
                Respect:{" "}
                <span className="md:text-lg text-black font-bold">
                  Treat others as you'd be treated.
                </span>
              </h1>
              <p className="md:text-base font-medium">
                {" "}
                We believe that mutual respect is the foundation for growth and
                collaboration within the Sewaverse community.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <Image
              src={businessIamge}
              alt="businessIamge"
              height={120}
              width={120}
            />
            <div>
              <h1 className=" gradient-text md:text-xl font-bold">
                Trust & Reliability:{" "}
                <span className="md:text-lg text-black font-bold">
                  Your peace of mind is our priority.
                </span>
              </h1>
              <p className="md:text-base font-medium">
                {" "}
                Building trust and reliability on service delievery is what we
                do in Sewaverse.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <Image
              src={communityImage}
              alt="communityImage"
              height={120}
              width={120}
            />
            <div>
              <h1 className=" gradient-text md:text-xl font-bold">
                Community:{" "}
                <span className="md:text-lg text-black font-bold">
                  Growing together, succeeding together.
                </span>
              </h1>
              <p className="md:text-base font-medium">
                {" "}
                More than a marketplace, we cultivate a supportive community
                that empowers everyone to achieve their goals.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <Image
              src={ConvenienceImage}
              alt="Convenience"
              height={120}
              width={120}
            />
            <div>
              <h1 className=" gradient-text md:text-xl font-bold">
                Convenience:{" "}
                <span className="md:text-lg text-black font-bold">
                  Services at your fingertips.
                </span>
              </h1>
              <p className="md:text-base font-medium">
                {" "}
                We focus on providing hassle-free access to services, ensuring
                you get what you need quickly and effortlessly.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <Image
              src={CustomerImage}
              alt="Customer"
              height={120}
              width={120}
            />
            <div>
              <h1 className=" gradient-text md:text-xl font-bold">
                Customer-Centricity:{" "}
                <span className="text-lg text-black font-bold">
                  You’re at the heart of everything we do
                </span>
              </h1>
              <p className="md:text-base font-medium">
                {" "}
                Every decision we make is centered around enhancing your
                experience, making sure your expectations are not just met but
                exceeded.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurValues;
