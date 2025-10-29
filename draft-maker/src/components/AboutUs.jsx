import React from "react";
import aboutUsImg from "../assets/images/new/about-02 (1).png";
import { CheckCircle, Shield, Clock, Banknote, User } from "lucide-react";
import WhatWeDo from "./WhatWeDo";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="text-white py-16" style={{ background: "#770000" }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About</h1>
          <nav className="text-red-100">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span>About</span>
          </nav>
        </div>
      </div>

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
                Over time, Draft Maker has introduced innovative approaches 
                to service delivery, enhancing both the accessibility and quality
                of services provided to citizens.To elevate this further, we
                are moving towards delivering services that are fully digital —
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

            {/* Management Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <User size={20} className="text-red-600" />
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-800">Managed by:</span>{" "}
                  <span className="text-red-700 font-medium">Nagaraj Ajay Kumar</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Banner */}
      <div className="text-white py-12" style={{ background: "#770000" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Easy Accessible */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle size={48} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy</h3>
              <p className="text-red-100">Accessible</p>
            </div>

            {/* High Secure */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield size={48} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">High</h3>
              <p className="text-red-100">Secure</p>
            </div>

            {/* Instant Confirmation */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Clock size={48} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant</h3>
              <p className="text-red-100">Confirmation</p>
            </div>

            {/* Cost Effective */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Banknote size={48} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cost</h3>
              <p className="text-red-100">Effective</p>
            </div>
          </div>
        </div>
      </div>
      <WhatWeDo/>
    </div>
  );
};

export default AboutUs;