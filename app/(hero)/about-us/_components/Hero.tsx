import Image from "next/image";

interface heroData {
  image: string;
  title: string;
  subtitle: string;
  smileImage: string;
  description: string;
}

interface HeroProps {
  heroData: heroData;
}

const Hero = ({ heroData }: HeroProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${heroData.image})`,
        backgroundSize: "cover",
        backgroundPosition: "",
        backgroundRepeat: "no-repeat",
        height: "145vh",
        width: "100%",
      }}
    >
      <div className="text-white  flex flex-col items-center justify-center py-80">
        <h1 className="text-6xl font-bold">{heroData.title}</h1>
        <p className="text-4xl  ">{heroData.description}</p>
      </div>
      <div className=" flex flex-col  items-center ">
        <Image src={heroData.smileImage} alt="smile" width={100} height={94} />
        <p className="text-3xl font-semibold text-white">{heroData.subtitle}</p>
      </div>
    </div>
  );
};

export default Hero;
