import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Shield,
  Lock,
  Eye,
  FileText,
  Clock,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const [expandedSections, setExpandedSections] = useState({});
  const [businessInfo] = useState({
    businessName: "DRAFT MAKER",
    websiteUrl: "https://draftmaker.in",
    contactEmail: "draftmakerinfo@gmail.com",
    contactPhone: "8088774711",
    businessAddress:
      "No 5, 1st floor, Site no 200, Muniraju Complex, Panathur Main Road, Kadubisanahalli, Bengaluru, Karnataka-560103",
    responseDays: "1-3",
    effectiveDate: "[Insert Date]",
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      id: 1,
      icon: <FileText className="w-6 h-6" />,
      title: "Information We Collect",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 mb-3">
            We may collect the following information:
          </p>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <div>
                <span className="font-semibold">Personal Information:</span>{" "}
                name, email, phone number, and other details you provide during checkout, or service requests.
              </div>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <div>
                <span className="font-semibold">Payment Information:</span>{" "}
                [Note: Specify if you collect payment details directly or use
                third-party payment processors.]
              </div>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <div>
                <span className="font-semibold">Usage Data:</span> Information
                about how you use our website, including IP address, browser
                type, pages visited, and time spent on pages.
              </div>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <div>
                <span className="font-semibold">Cookies:</span> We use cookies
                to enhance your browsing experience. You can choose to disable
                cookies through your browser settings.
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 mb-3">
            We use the collected information to:
          </p>
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>Process and fulfil orders and deliver services.</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>
                Communicate with you about your orders, inquiries, or other
                requests.
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>Improve our website and services.</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>
                Send promotional emails or newsletters, if you have opted in.
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      icon: <Shield className="w-6 h-6" />,
      title: "Sharing Your Information",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>
            We do not sell or rent your personal information to third parties.
            We may share your information with:
          </p>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <div>
                <span className="font-semibold">Service Providers:</span>{" "}
                Third-party vendors who assist us in operating our website,
                conducting our business, or servicing you.
              </div>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <div>
                <span className="font-semibold">Legal Requirements:</span> If
                required by law, we may disclose your information to comply with
                legal obligations or protect our rights.
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content: (
        <p className="text-gray-700">
          We implement appropriate security measures to protect your personal
          information from unauthorized access, alteration, disclosure, or
          destruction.
        </p>
      ),
    },
    {
      id: 5,
      icon: <Clock className="w-6 h-6" />,
      title: "Data Retention",
      content: (
        <p className="text-gray-700">
          We retain your personal information only as long as necessary to
          fulfil the purposes described in this policy or to comply with legal
          requirements. Afterward, data is securely deleted or anonymized.
        </p>
      ),
    },
    {
      id: 6,
      icon: <FileText className="w-6 h-6" />,
      title: "Changes to This Policy",
      content: (
        <p className="text-gray-700">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated effective date.
        </p>
      ),
    },
    {
      id: 7,
      icon: <Shield className="w-6 h-6" />,
      title: "Your Rights",
      content: (
        <p className="text-gray-700">
          You have the right to access, correct, or delete your personal
          information. To exercise these rights, please contact us at{" "}
          <span className="font-semibold" style={{ color: "#770000" }}>
            {businessInfo.contactEmail}
          </span>
          . We will respond within {businessInfo.responseDays} business days.
        </p>
      ),
    },
    {
      id: 8,
      icon: <Mail className="w-6 h-6" />,
      title: "Your Privacy Matters to Us",
      content: (
        <div className="space-y-4 text-gray-700">
          <p>
            In accordance with the Information Technology Act, 2000 and
            applicable rules, we are committed to addressing any concerns or
            feedback you may have regarding this Privacy Policy or the handling
            of your personal information. For any privacy-related questions,
            concerns, or feedback, please contact us at:
          </p>
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                {businessInfo.contactEmail}
              </div>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <div>
                <span className="font-semibold">Phone:</span>{" "}
                {businessInfo.contactPhone}
              </div>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <div>
                <span className="font-semibold">Office Address:</span>{" "}
                {businessInfo.businessAddress}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
       

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-center justify-center mb-6">
            <div
              className="p-4 rounded-full"
              style={{ backgroundColor: "#770000" }}
            >
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-3">
            Privacy Policy
          </h1>
          <p className="text-center text-gray-700 text-lg mb-2">
            <span className="font-semibold">{businessInfo.businessName}</span>{" "}
            is committed to protecting your privacy.
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            This Privacy Policy outlines how we collect, use, and safeguard your
            personal information when you visit our website{" "}
            <span className="font-semibold" style={{ color: "#770000" }}>
              {businessInfo.websiteUrl}
            </span>{" "}
            or use our services.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4 mb-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div style={{ color: "#770000" }}>{section.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {section.id}. {section.title}
                  </h3>
                </div>
                {expandedSections[section.id] ? (
                  <ChevronUp className="w-6 h-6 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {expandedSections[section.id] && (
                <div className="px-6 pb-6 pt-2">{section.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}