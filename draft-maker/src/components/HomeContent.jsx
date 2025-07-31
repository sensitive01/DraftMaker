import React from "react";
import { ArrowRight } from "lucide-react";
import homeImg from "../assets/images/draftmaker2.png";
import { useNavigate } from "react-router-dom";

export default function HomeContent() {
  const navigate = useNavigate();
  const handleAboutClick = () => {
    navigate("/home/about-us");
  };

  return (
    <div className="py-8 bg-rgba(59, 130, 246, 0.5)">
      <div className="max-w-full mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content Section */}
          <div className="space-y-6 pl-0 lg:pl-12">
            <h1 className="text-4xl lg:text-4xl font-black leading-tight">
              <span
                style={{ color: "#e02016" }}
                className="block font-extrabold text-red-500"
              >
                WELCOME TO DRAFT MAKER
              </span>

              <span className="text-black text-base">
                YOUR TRUSTED LEGAL AGREEMENT PARTNER
              </span>
            </h1>

            <div className="max-w-md">
              <p className="text-gray-600 text-base leading-relaxed text-center">
                At Draft Maker, we specialize in drafting, reviewing, and
                managing legally binding agreements tailored to meet the needs
                of individuals, businesses, and organizations. Whether you're
                starting a business, renting a property, or entering into a
                partnership, we provide clear, enforceable agreements that
                protect your rights and define your responsibilities.
              </p>
            </div>

            <div>
              <button
                onClick={handleAboutClick}
                className="inline-flex items-center text-red-600 text-base font-bold hover:text-red-700 transition-colors duration-200 group"
              >
                <span className="mr-2">ABOUT MORE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex justify-start lg:justify-start pr-0 lg:pr-12">
            <div className="w-full max-w-md">
              <img
                src={homeImg}
                alt="Legal Agreement Services"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
