"use client";

import Link from "next/link";
import { CirclePlus, FolderPen, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SewaProviderStep2() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-6">
        <h3
          className="text-lg font-semibold text-center mb-2"
          style={{ color: "#878787" }}
        >
          Step 3/3
        </h3>
        <h3 className="text-lg font-semibold">
          Make Your Profile Shine: Add More Details!
        </h3>
        <p className="text-sm text-gray-500 mt-4">
          Let your customers get to know you better! Build credibility and gain
          their trust. Show them why they should choose YOU.
        </p>

        <form className="mt-4 space-y-4">
          <textarea
            className="h-[400px] w-[300px] border border-solid rounded-lg py-2 px-4 text-left resize-none"
            placeholder="Type here"
          />
          <div className="border border-solid border-black rounded-md h-[100px] flex items-center justify-between px-4">
            <label className="block text-sm font-medium text-gray-700">
              Experience <br />
              <span className="text-gray-300 text-[15px]">
                Showcase your skills and experience.{" "}
              </span>
            </label>
            <div className="border border-dotted border-black rounded-md h-[75px] w-[130px] flex flex-col items-center justify-center">
              <span className="text-green-500">
                <CirclePlus />
              </span>
              <span className="text-[12px] text-gray-700 mt-2">
                Add Experience
              </span>
            </div>
          </div>

          <div className="border border-solid border-black rounded-md h-[100px] flex items-center justify-between px-4">
            <label className="block text-sm font-medium text-gray-700">
              Licence <br />
              <span className="text-gray-300 text-[15px]">
                Verify your qualification & standout more.
              </span>
            </label>
            <div className="border border-dotted border-black rounded-md h-[75px] w-[140px] flex flex-col items-center justify-center">
              <span className="text-green-500">
                <CirclePlus />
              </span>
              <span className="text-[12px] text-gray-700 mt-2">
                Add Licence
              </span>
            </div>
          </div>
          <div className="border border-solid border-black rounded-md h-[100px] flex items-center justify-between px-4">
            <label className="block text-sm font-medium text-gray-700">
              Awards & Achievements <br />
              <span className="text-gray-300 text-[14px]">
                Build Reliability & Trust of Clients.{" "}
              </span>
            </label>
            <div className="border border-dotted border-black rounded-md h-[75px] w-[115px] flex flex-col items-center justify-center">
              <span className="text-green-500">
                <CirclePlus />
              </span>
              <span className="text-[12px] text-gray-700 mt-2">
                Add Certification
              </span>
            </div>
          </div>
          <div className="border border-solid border-black rounded-md h-[95px] flex items-center justify-between px-4">
            <label className="block text-sm font-medium text-gray-700">
              My Works <br />
              <span className="text-gray-300 text-[15px]">
                Show your previous works and attract customers.
              </span>
            </label>
            <div className="border border-dotted border-black rounded-md h-[75px] w-[162px] flex flex-col items-center justify-center">
              <span className="text-green-500">
                <CirclePlus />
              </span>
              <span className="text-[12px] text-gray-700 mt-2">Add Works</span>
            </div>
          </div>

          <Button
            variant={"brand"}
            className="w-full mt-2 text-white shadow-md hover:shadow-lg px-8 py-4"
            style={{ backgroundColor: "#2E3192" }}
          >
            Next
          </Button>
          <Button
            className="w-full mt-2 text-white shadow-md hover:shadow-lg px-8 py-4"
            style={{ backgroundColor: "#878787" }}
          >
            Previous
          </Button>
          <Link href="/sewaproviderstep1">
            <p className="w-full mt-2 text-gray-400 underline hover:text-gray-700 text-center">
              Skip
            </p>
          </Link>
        </form>
      </div>

      <div className="flex-1">
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <div className="flex items-center justify-start space-x-6">
            <div className="relative w-32 h-32 rounded-full bg-white px-10">
              <div className="absolute inset-0 m-4 w-24 h-24 rounded-full bg-blue-100"></div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="text-gray-500 text-right">
                <i className="fas fa-cog"></i>
              </div>

              <div className="mt-[-5px]">
                <h2
                  className="text-4xl font-bold "
                  style={{ color: "#2E3192" }}
                >
                  Bishal Shrestha{" "}
                  <span className="text-[13px] text-gray-500">Male</span>
                </h2>
                <p className="text-[12px] text-gray-500 mt-[-10px]">
                  Joined Date: 5th Jan, 2024
                </p>
              </div>

              <div className="mt-4 text-sm flex flex-row space-x-4">
                <div className="flex flex-col font-inter">
                  <p className="text-gray-500">Profession</p>
                  <p className="gradient-text">Barber</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Experience</p>
                  <p className="gradient-text text-[15px]">Experience Yrs</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Rating</p>
                  <p className="text-[20px]">
                    4.0 <span>⭐⭐⭐⭐</span>
                  </p>
                  <h5></h5>
                </div>
              </div>

              <div className="mt-4 text-sm flex flex-row space-x-4">
                <div className="flex flex-col">
                  <p className="text-gray-500">Offered Services</p>
                  <p className="gradient-text">Service Name</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Location of Services</p>
                  <p className="gradient-text">Kathmandu,Bhaktapur,Lalitpur</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-4">
                <div className="flex flex-col gap-2 text-gray-500">
                  <p>Skills</p>
                </div>

                <div className="flex justify-between gap-[186px] mt-[-21px]">
                  <div className="flex gap-4">
                    <Button
                      variant={"brand"}
                      className="mt-2 text-white shadow-md rounded-[19px] hover:shadow-lg px-5 py-4"
                    >
                      Your Skill
                    </Button>
                    <Button
                      variant={"brand"}
                      className="mt-2  text-white shadow-md rounded-[19px] hover:shadow-lg px-5 py-4"
                    >
                      Your Skill
                    </Button>
                    <Button
                      variant={"brand"}
                      className="mt-2 text-white shadow-md rounded-[19px] hover:shadow-lg px-5 py-4"
                    >
                      Your Skill
                    </Button>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      size="default"
                      className="mt-2 text-black border rounded-[25px] border-black bg-blue-100 hover:bg-blue-200 hover:shadow-lg"
                    >
                      Add to Favourite
                    </Button>

                    <Button
                      size="default"
                      className="mt-2 text-black border rounded-[25px] border-black bg-blue-100 hover:bg-blue-200 hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" /> Share
                    </Button>

                    <Button
                      size="default"
                      className="mt-2 text-black border rounded-[25px] border-black bg-blue-100 hover:bg-blue-200 hover:shadow-lg"
                    >
                      Write a review
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-6">
          <ul className="flex gap-4">
            <li className="text-md gradient-text">About Me </li>
            <li className="text-md">Experience</li>
            <li className="text-md">Awards & Certification</li>
            <li className="text-md">Offered Services</li>
          </ul>
        </div> */}
        <div className="h-[1100px] w-full mt-4 bg-white rounded border-2 border-gray-200 shadow-lg p-4">
          <div className="flex justify-between items-start gap-4">
            <div>
              <ul className="flex gap-4">
                <li className="text-md gradient-text">About Me</li>
                <li className="text-md">Experience</li>
                <li className="text-md">Awards & Certification</li>
                <li className="text-md">Offered Services</li>
              </ul>
              <h3 className="text-2xl font-medium mt-5 font-roboto">
                About Me
              </h3>
              <textarea className=" mt-2 w-[753px] h-[200px] px-4 py-2 border border-gray-200 rounded-lg"></textarea>
              {/* <div className=" mt-2 w-[750px] h-[200px] px-4 py-2 border border-gray-200 rounded-lg"></div> */}

              {/* work exoerience section */}
              <div>
                <h3 className="text-2xl mt-5 font-roboto font-medium flex justify-between items-center">
                  Work Experiences
                  <span className="ml-auto mt-3"><FolderPen size={14} className="text-gray-500" /></span>
                   
                </h3>
                <div className="flex flex-row justify-between gap-2">
                  <div className="flex-1 mt-2 h-[65px] px-4 py-1 border border-gray-200 rounded-lg flex justify-between items-center">
                    <div className="flex flex-col items-start">
                      <label className="text-sm font-medium">Title</label>
                      <span className="text-xs text-gray-400 mt-1">Info</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <label className="text-sm font-medium gradient-text">
                        Experience Years
                      </label>
                      <span className="text-xs text-gray-400 underline cursor-pointer mt-1">
                        View Document
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 mt-2 h-[65px] px-4 py-1 border border-gray-200 rounded-lg flex justify-between items-center">
                    <div className="flex flex-col items-start">
                      <label className="text-sm font-medium">Title</label>
                      <span className="text-xs text-gray-400 mt-1 ">Info</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <label className="text-sm font-medium gradient-text">
                        Experience Years
                      </label>
                      <span className="text-xs text-gray-400 underline cursor-pointer mt-1">
                        View Document
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* {licence sectio} */}
              <div>
                <h3 className="text-2xl mt-5 font-roboto font-medium">
                  Licence
                </h3>
                <div className="mt-2 h-[70px] px-4 py-1 w-[376px] border border-gray-200 rounded-lg flex items-center justify-between">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Licence</label>
                    <span className="text-xs text-gray-400 mt-1">
                      Licence From
                    </span>
                  </div>
                  <div className="border border-gray-500 w-28 py-7 square-md"></div>
                </div>
              </div>

              {/* Awards section */}
              <div>
                <h3 className="text-2xl mt-5 font-roboto font-medium flex justify-between items-center">
                  Awards & Certification
                  <span className="ml-[-118px8px] mt-3"><FolderPen size={14} className="text-gray-500" /></span>
                </h3>
                <div className="flex gap-4 mt-2">
                  <div className="flex flex-col items-center">
                    <div className="h-[100px] w-[200px] border-[2px] border-gray-400 square-lg flex items-center justify-between"></div>
                    <span className="text-sm mt-2">Certification</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-[100px] w-[200px] border-[2px] border-gray-400 square-lg flex items-center justify-between"></div>
                    <span className="text-sm mt-2">Certification</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-[100px] w-[200px] border-[2px] border-gray-400 square-lg flex items-center justify-between"></div>
                    <span className="text-sm mt-2">Certification</span>
                  </div>
                </div>
              </div>

              {/* My Works Section  */}
              <div>
                <h3 className="text-2xl mt-5 font-roboto font-medium">
                  Awards & Certification
                </h3>
                <div className="flex gap-4 mt-2">
                  <div className="flex flex-col items-center border border-gray-500 rounded-lg p-4 w-[220px] h-[250px]">
                    <div className="h-[100px] w-[180px] border-[3px] border-gray-400 square-lg flex items-center justify-between"></div>
                    <div className="flex flex-col items-start mt-2 w-full">
                      <div>Title</div>
                      <span className="text-gray-400">Description</span>
                    </div>
                  </div>

                  {/* Second bordered item */}
                  <div className="flex flex-col items-center border border-gray-500 rounded-lg p-4 w-[210px]">
                    <div className="h-[100px] w-[180px]  border-[3px] border-gray-400 border-solid square-lg  flex items-center justify-between"></div>
                    <div className="flex flex-col items-start mt-2 w-full">
                      <div>Title</div>
                      <span className="text-gray-400">Description</span>
                    </div>
                  </div>

                  {/* Third bordered item */}
                  <div className="flex flex-col items-center border border-gray-500 rounded-lg p-4 w-[210px]">
                    <div className="h-[100px] w-[180px] border-[3px] border-gray-400 square-lg flex items-center justify-between"></div>
                    <div className="flex flex-col items-start mt-2 w-full">
                      <div>Title</div>
                      <span className="text-gray-400">Description</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[300px] w-[313px] border-2 border-gray-200 rounded-lg p-6">
              <form className="space-y-4">
                <select className="w-full px-4 py-2 border rounded-lg">
                  <option>Choose a service</option>
                  <option>service 1</option>
                  <option>service 2</option>
                  <option>service 3</option>
                </select>
                <select className="w-full px-4 py-2 border rounded-lg">
                  <option>Select Location</option>
                  <option>Location 1</option>
                  <option>Location 2</option>
                  <option>Location 3</option>
                </select>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="time"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <Button
                  variant={"brand"}
                  className="w-full text-white font-medium py-4 rounded-lg shadow-md hover:opacity-90"
                >
                  Book Now
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
