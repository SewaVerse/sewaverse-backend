import Image from "next/image";

const awardImage = "/images/servicesImage/awards.svg";
const businessIamge = "/images/servicesImage/business.svg";
const communityImage = "/images/servicesImage/Community.svg";
const ConvenienceImage = "/images/servicesImage/Convenience.svg";
const CustomerImage = "/images/servicesImage/Customer.svg";
const onlineImage = "/images/servicesImage/online.svg";
const respectImage = "/images/servicesImage/respect.svg";

const OurValues = () => {
  return (
    <div className=" md:mt-12">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold md:text-4xl gradient-text">Our Values</h1>
        <Image
          src={"/images/redline.png"}
          alt="redLine"
          width={100}
          height={20}
          className="md:w-[170px] md:h-[30px]"
        />
      </div>

      <div className=" md:mx-52 px-2 border-[1px] md:mt-5">
        <div className="">
          <div className="flex items-center gap-5">
            <Image src={awardImage} alt="award" height={120} width={120} />
            <div>
              <h1 className="font-bold gradient-text md:text-xl">
                Go for Best:{" "}
                <span className="font-bold text-black md:text-lg">
                  Excellence is our standard.
                </span>
              </h1>
              <p className="font-medium md:text-base">
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
              height={110}
              width={110}
            />
            <div>
              <h1 className="font-bold gradient-text md:text-xl">
                Innovation::{" "}
                <span className="font-bold text-black md:text-lg">
                  Always thinking ahead.
                </span>
              </h1>
              <p className="font-medium md:text-base">
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
              height={110}
              width={110}
            />
            <div>
              <h1 className="font-bold gradient-text md:text-xl">
                Respect:{" "}
                <span className="md:text-lg text-black font-bold">
                  Treat others as you&apos;d be treated.
                </span>
              </h1>
              <p className="font-medium md:text-base">
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
              height={110}
              width={110}
            />
            <div>
              <h1 className="font-bold gradient-text md:text-xl">
                Trust & Reliability:{" "}
                <span className="font-bold text-black md:text-lg">
                  Your peace of mind is our priority.
                </span>
              </h1>
              <p className="font-medium md:text-base">
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
              height={110}
              width={110}
            />
            <div>
              <h1 className="font-bold gradient-text md:text-xl">
                Community:{" "}
                <span className="font-bold text-black md:text-lg">
                  Growing together, succeeding together.
                </span>
              </h1>
              <p className="font-medium md:text-base">
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
              height={110}
              width={110}
            />
            <div>
              <h1 className="font-bold gradient-text md:text-xl">
                Convenience:{" "}
                <span className="font-bold text-black md:text-lg">
                  Services at your fingertips.
                </span>
              </h1>
              <p className="font-medium md:text-base">
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
              height={110}
              width={110}
            />
            <div>
              <h1 className="font-bold gradient-text md:text-xl">
                Customer-Centricity:{" "}
                <span className="text-lg font-bold text-black">
                  You’re at the heart of everything we do
                </span>
              </h1>
              <p className="font-medium md:text-base">
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
