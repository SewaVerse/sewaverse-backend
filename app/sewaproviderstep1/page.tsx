"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus, Share2 } from "lucide-react";


export default function SewaProviderStep1() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6">
      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-6">
        <h3
          className="text-lg font-semibold text-center mb-2"
          style={{ color: "#878787" }}
        >
          Step 2/3
        </h3>
        <h3 className="text-lg font-semibold">Create your business profile</h3>
        <p className="text-sm text-gray-500 mt-4">
          Create your business profile Your Profile is Your First Impression. It
          is the face of your services. Customers rely on it to learn about your
          expertise and decide if you're the right fit for their needs. Ensure
          it’s accurate, professional, and showcases your strengths.
        </p>

        <form className="mt-4 space-y-4">
          <div className="border border-solid border-black rounded-md h-20 flex items-center justify-between px-4">
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture <br />
              <span className="text-gray-500">(Required*)</span>
            </label>
            <div className="border border-dotted border-black rounded-md h-[57px] w-[158px] flex flex-col items-center justify-center">
              <span className="text-green-500">
                <CirclePlus />
              </span>
              <span className="text-[12px] text-gray-700">Upload Picture</span>
            </div>
          </div>

          <div>
            {/* <label className="block text-sm font-medium text-gray-700">
              Profession <span className="text-red-500">(Required*)</span>
            </label> */}
            <input
              type="text"
              placeholder="Profession (Required*)"
              className="w-full p-2 border border-solid border-black rounded-lg "
            />
          </div>
          <div>
            <select
              className="w-full p-2 border border-solid border-black rounded-lg"
              defaultValue=""
            >
              <option value="" disabled>
                Experienced (Required*)
              </option>
              <option value="1"> 1</option>
              <option value="2"> 2</option>
              <option value="3"> 3</option>
            </select>
          </div>

          <div className="border border-solid border-black rounded-md h-20 flex items-center justify-between px-4">
            <label className="block text-sm font-medium text-gray-700">
              Offered Service <br />
              <span className="text-gray-500">(Required*)</span>
            </label>
            <div className="border border-dotted border-black rounded-md h-[57px] w-[158px] flex flex-col items-center justify-center">
              <span className="text-green-500">
                <CirclePlus />
              </span>
              <span className="text-[12px] text-gray-700">Add Sewa</span>
            </div>
          </div>

          <div>
            {/* <label className="block text-sm font-medium text-gray-700">
              Profession <span className="text-red-500">(Required*)</span>
            </label> */}
            <input
              type="text"
              placeholder="Skills (Required*)"
              className="w-full p-2 border border-solid border-black rounded-lg "
            />
          </div>
          <div>
            <select
              className="w-full p-2 border border-solid border-black rounded-lg"
              defaultValue=""
            >
              <option value="" disabled>
                Location of Service (Required*)
              </option>
              <option value="location1">Location 1</option>
              <option value="location2">Location 2</option>
              <option value="location3">Location 3</option>
            </select>
          </div>

          <Button
            variant={"brand"}
            className="w-full mt-2 text-white shadow-md hover:shadow-lg px-8 py-4"
            style={{ backgroundColor: "#2E3192" }}
          >
            Next
          </Button>
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
                  <p className="gradient-text">Your Profession</p>
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
        <div className="h-[440px] w-full mt-4 bg-white rounded border-2 border-gray-200 shadow-lg p-4">
          <div className="flex justify-between items-start gap-4">
            <div>
              <ul className="flex gap-4">
                <li className="text-md gradient-text">About Me</li>
                <li className="text-md">Experience</li>
                <li className="text-md">Awards & Certification</li>
                <li className="text-md">Offered Services</li>
              </ul>
              {/* <input className=" mt-2 w-[600px] h-[200px] px-4 py-2 border border-gray-200 rounded-lg"></input> */}
              <div className=" mt-2 w-[750px] h-[200px] px-4 py-2 border border-gray-200 rounded-lg"></div>
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
