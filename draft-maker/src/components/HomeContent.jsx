import React from "react";
import { ArrowRight } from "lucide-react";
import homeImg from "../assets/images/new/slider-inner-2.png";
import { useNavigate } from "react-router-dom";

export default function HomeContent() {
  const navigate = useNavigate();
  const handleAboutClick = () => {
    navigate("/home/about-us");
  };

  return (
    <div className=" py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content Section */}
          <div className="space-y-6 relative z-10">
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-3xl font-black leading-tight tracking-tight">
                <span className="text-green-600 block font-extrabold">
                  CITIZEN SERVICES
                </span>
                <span className="text-orange-500 block font-extrabold">
                  DIGITAL PLATFORM
                </span>
              </h1>

              <p className="text-gray-600 text-lg lg:text-xl leading-relaxed font-medium max-w-2xl">
                Draft Maker is envisaged to be developed as a single platform to
                deliver the G2C, B2C and Financial services at the doorsteps of
                the citizens. Draft Maker will be integrated with various service
                delivery channels of the central, state government and public
                utility services on one platform.
              </p>

              <div className="w-1 h-20 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>

              <button
                onClick={handleAboutClick}
                className="relative z-10 inline-flex items-center text-red-800 text-lg font-semibold hover:text-green-600 transition-all duration-300 group cursor-pointer"
              >
                <span className="mr-3">ABOUT MORE</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md overflow-hidden">
              <img
                src={homeImg}
                alt="Home Image"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
