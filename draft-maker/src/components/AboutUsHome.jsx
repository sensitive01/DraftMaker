import React from "react";
import aboutUsImg from "../assets/images/new/about-02 (1).png";
import { CheckCircle, Shield, Clock, Banknote } from "lucide-react";
import WhatWeDo from "./WhatWeDo";

const AboutUsHome = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Illustration */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={aboutUsImg}
                alt="About Us"
                className="w-96 h-96 object"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            <div>
              <p className="text-red-700 font-semibold text-sm uppercase tracking-wide mb-2">
                ABOUT US
              </p>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What We <span className="text-red-600">Offer</span>
              </h2>
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Over time, Draft Maker has introduced innovative approaches to
                service delivery, enhancing both the accessibility and quality
                of services provided to citizens.To elevate this further, we are
                moving towards delivering services that are fully digital —
                eliminating the need for physical paperwork, cash transactions,
                or in-person visits — ensuring citizens receive prompt and
                guaranteed assistance.
              </p>

              <p>
                This initiative aims to make public services more accessible,
                affordable, transparent, and accountable for everyone.
              </p>
            </div>

            {/* Services List */}
            <div className="space-y-3 mt-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-gray-700">
                  Government-to-Citizen Services
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-gray-700">
                  Business-to-Citizen Solutions
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-gray-700">
                  Financial Assistance Services
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhatWeDo />
    </div>
  );
};

export default AboutUsHome;
