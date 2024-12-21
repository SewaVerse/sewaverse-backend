"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BusinessProfile() {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState<'about' | 'experience' | 'awards' | 'services'>('about');


  const handleTabClick = (tab: 'about' | 'experience' | 'awards' | 'services') => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6">
      {/* Left Section: Form */}
      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700">
          Create your business profile
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          This is where people learn about you. Your customer will book your
          services based on the information you provide here. So, make sure you
          have all the required information for your probable customer.
        </p>

        <form className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profession <span className="text-red-500">(Required*)</span>
            </label>
            <input
              type="text"
              placeholder="Enter your profession"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills <span className="text-red-500">(Required*)</span>
            </label>
            <input
              type="text"
              placeholder="Enter your skills"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location of Service{" "}
              <span className="text-red-500">(Required*)</span>
            </label>
            <input
              type="text"
              placeholder="Enter service location"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              About Me
            </label>
            <textarea
              rows={4}
              placeholder="Share your story, expertise, and experiences in your own unique words. Make your clients trust in you!"
              className="w-full p-3 border rounded-lg "
            ></textarea>
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

      {/* Right Section: Profile Preview */}
      <div className="flex-1">
        {/* Profile Card */}
        {/* Profile Card */}
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <div className="flex items-center justify-start space-x-6">
            {/* Profile Picture */}
            <div className="relative w-32 h-32 rounded-full bg-gray-200">
  {/* White circle over the gray circle */}
  <div className="absolute inset-0 m-4 w-24 h-24 rounded-full bg-white"></div>
</div>

            {/* Right Section */}
            <div className="flex flex-col justify-between">
              {/* Edit Icon */}
              <div className="text-gray-500 text-right">
                <i className="fas fa-cog"></i>
              </div>

              <div className="mt-4">
                <h2 className="text-2xl font-bold text-indigo-700">
                  Bishal Shrestha
                </h2>
                <p className="text-sm text-gray-600">Male</p>
                <p className="text-sm text-gray-600 mt-1">
                  Joined Date: 5th Jan, 2024
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-4">
                <span className="font-medium text-gray-700">Rating:</span>
                <div >
                  <span className="text-yellow-400">⭐⭐⭐⭐</span>
                </div>
              </div>

              {/* Profession, Experience, Location */}
              <div className="mt-4 text-sm">
                <p>Profession: Your Profession</p>
                <p>Experience: Your Exp</p>
                <p>Location of Services: Kathmandu, Bhaktapur, Lalitpur</p>
              </div>

              {/* Skills */}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant={"brand"}
                  className="mt-2 text-white shadow-md hover:shadow-lg px-8 py-4"
                >
                  Your Skill
                </Button>
                <Button
                  variant={"brand"}
                  className="mt-2 text-white shadow-md hover:shadow-lg px-8 py-4"
                >
                  Your Skill
                </Button>
                <Button
                  variant={"brand"}
                  className="mt-2 text-white shadow-md hover:shadow-lg px-8 py-4"
                >
                  Your Skill
                </Button>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex items-center gap-4">
                <Button
                  variant={"brand"}
                  className="text-sm py-2 px-4  text-white rounded-lg shadow hover:bg-indigo-600"
                >
                  Message
                </Button>
                <Button
                  variant={"brand"}
                  className="text-sm border  text-white py-2 px-4 rounded-lg shadow"
                >
                  Add to Favourites
                </Button>
              </div>
            </div>
          </div>

          {/* About Me Section */}
          {/* <div className="mt-6 bg-white rounded-lg shadow p-6">
            <ul className="flex gap-6 text-sm border-b pb-2">
              <li className="font-semibold ">
                About Me
              </li>
              <li className="text-gray-500">Experience</li>
              <li className="text-gray-500">Awards & Certifications</li>
              <li className="text-gray-500">Offered Services</li>
            </ul>
            <div className="mt-4">
              <textarea
                rows={4}
                className="w-full p-3 border rounded-lg "
                placeholder="About Me"
              ></textarea>
            </div>
          </div> */}

<div className="mt-6 bg-white rounded-lg shadow p-6">
      {/* Tab Buttons */}
      <ul className="flex gap-6 text-sm border-b pb-2">
        <li
          className={`font-semibold cursor-pointer ${activeTab === 'about' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => handleTabClick('about')}
        >
          About Me
        </li>
        <li
          className={`cursor-pointer ${activeTab === 'experience' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => handleTabClick('experience')}
        >
          Experience
        </li>
        <li
          className={`cursor-pointer ${activeTab === 'awards' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => handleTabClick('awards')}
        >
          Awards & Certifications
        </li>
        <li
          className={`cursor-pointer ${activeTab === 'services' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => handleTabClick('services')}
        >
          Offered Services
        </li>
      </ul>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'about' && (
          <textarea
            rows={4}
            className="w-full p-3 border rounded-lg"
            placeholder="About Me"
          ></textarea>
        )}
        {activeTab === 'experience' && (
          <textarea
            rows={4}
            className="w-full p-3 border rounded-lg"
            placeholder="Experience"
          ></textarea>
        )}
        {activeTab === 'awards' && (
          <textarea
            rows={4}
            className="w-full p-3 border rounded-lg"
            placeholder="Awards & Certifications"
          ></textarea>
        )}
        {activeTab === 'services' && (
          <textarea
            rows={4}
            className="w-full p-3 border rounded-lg"
            placeholder="Offered Services"
          ></textarea>
        )}
      </div>
    </div>
        </div>

        {/* Book an Appointment Section */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold text-lg mb-4">
            Book an appointment from Bishal
          </h4>
          <form className="space-y-4">
            <select className="w-full px-4 py-2 border rounded-lg">
              <option>Choose a service</option>
            </select>
            <select className="w-full px-4 py-2 border rounded-lg">
              <option>Select Location</option>
            </select>
            <input type="date" className="w-full px-4 py-2 border rounded-lg" />
            <input type="time" className="w-full px-4 py-2 border rounded-lg" />
            <Button
              variant={"brand"}
              className="w-full var  text-white font-medium py-4 rounded-lg shadow-md hover:opacity-90"
            >
              Book Now
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
