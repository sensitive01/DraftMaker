import React from "react";
import aboutUsImg from "../assets/images/draftmaker4.png";
import { CheckCircle, Shield, Clock, Banknote, Users } from "lucide-react";
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
                className="w-96 h-96 object-contain"
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
                Why Choose <span className="text-red-600">Us?</span>
              </h2>
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                At Draft Maker, we are committed to providing exceptional legal
                documentation services that meet the highest standards of
                quality and reliability. Our expertise and dedication ensure
                that your legal agreements are crafted with precision and care.
              </p>

              <p>
                We understand the importance of having legally sound documents
                that protect your interests while being accessible and
                affordable for everyone.
              </p>
            </div>

            {/* Why Choose Us List */}
            <div className="space-y-4 mt-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-gray-800 font-semibold">
                    Legally Compliant
                  </span>
                  <p className="text-gray-600 text-sm">
                    All documents are crafted as per current legal standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-gray-800 font-semibold">
                    Quick Turnaround
                  </span>
                  <p className="text-gray-600 text-sm">
                    Get your agreements ready within 24–48 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Banknote className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-gray-800 font-semibold">
                    Affordable Pricing
                  </span>
                  <p className="text-gray-600 text-sm">
                    Transparent and competitive pricing for all services.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-gray-800 font-semibold">
                    Confidential & Secure
                  </span>
                  <p className="text-gray-600 text-sm">
                    Your information is always protected.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-gray-800 font-semibold">
                    Expert Legal Team
                  </span>
                  <p className="text-gray-600 text-sm">
                    Drafted and reviewed by qualified legal professionals.
                  </p>
                </div>
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
