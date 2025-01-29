import Image from "next/image"

interface ourMissionData{
    name:string,
    title:string,
    description:string
}
interface ourMissionProps{
    ourMissionData:ourMissionData
}
const OurMission = ({ourMissionData}:ourMissionProps) => {
  return (
       <div className="bg-[#F7F7F7] ">
          <div className="flex flex-col items-center py-5 ">
            <h1 className="md:text-4xl font-semibold gradient-text ">
              {ourMissionData.name}
            </h1>
            <Image src={"/images"} alt="redLine" width={100} height={20} className="md:w-[170px] md:h-[30px]" />
          </div>
    
          <div className=" md:mx-4">
            <div className=" md:mx-20 mx-2">
              <h1 className="md:text-3xl  font-semibold  text-center ">
                {ourMissionData.title}
              </h1>
              <p className="md:text-2xl text-center md:py-6 ">
                {ourMissionData.description}
              </p>
            </div>
          </div>
        </div>
  )
}

export default OurMission