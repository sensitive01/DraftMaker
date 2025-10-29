import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  RefreshCw,
  XCircle,
  CheckCircle,
  Clock,
  DollarSign,
  AlertTriangle,
  Scale,
  Mail,
} from "lucide-react";

export default function RefundCancellationPolicyPage() {
  const [expandedSections, setExpandedSections] = useState({});
  const [businessInfo] = useState({
    businessName: "DRAFT MAKER",
    contactEmail: "draftmakerinfo@gmail.com",
    contactPhone: "8088774711",
    businessAddress:
      "No 5, 1st floor, Site no 200, Muniraju Complex, Panathur Main Road, Kadubisanahalli, Bengaluru, Karnataka-560103",
    legalEntity: "NAGARAJ AJAY KUMAR",
    refundProcessingDays: "3",
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
      icon: <XCircle className="w-6 h-6" />,
      title: "Service Cancellation",
      content: (
        <p className="text-gray-700">
          We do not accept Service Cancellation as the partial payment directly
          goes to the government of Karnataka.
        </p>
      ),
    },
    {
      id: 2,
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Refund Eligibility",
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 mb-3">
            Refunds are considered under the following circumstances only:
          </p>
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>When the server is down.</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>
                When The service was not delivered due to unforeseen
                circumstances on our part.
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Non-Refundable Services",
      content: <p className="text-gray-700">All services are non-refundable.</p>,
    },
    {
      id: 4,
      icon: <Clock className="w-6 h-6" />,
      title: "Processing Refunds",
      content: (
        <p className="text-gray-700">
          Approved refunds will be processed and issued within{" "}
          {businessInfo.refundProcessingDays} business days. Processing times
          may vary depending on your financial institution.
        </p>
      ),
    },
    {
      id: 5,
      icon: <DollarSign className="w-6 h-6" />,
      title: "Partial Refunds",
      content: (
        <p className="text-gray-700">
          If a service has been partially rendered or partially completed,
          partial refunds may be issued at our discretion, based on the
          proportion of the service completed.
        </p>
      ),
    },
    {
      id: 6,
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Force Majeure",
      content: (
        <p className="text-gray-700">
          We are not liable for delays or cancellations caused by events beyond
          our reasonable control, including but not limited to natural
          disasters, strikes, governmental actions, or other force majeure
          events.
        </p>
      ),
    },
    {
      id: 7,
      icon: <Scale className="w-6 h-6" />,
      title: "Governing Law",
      content: (
        <p className="text-gray-700">
          This Refund and Cancellation Policy shall be governed by and construed
          in accordance with the laws of India, including the Consumer
          Protection Act, 2019, and other applicable laws. Any disputes arising
          under or in connection with this policy shall be subject to the
          exclusive jurisdiction of the courts located in Bengaluru.
        </p>
      ),
    },
    {
      id: 8,
      icon: <Mail className="w-6 h-6" />,
      title: "Contact Us",
      content: (
        <div className="space-y-4 text-gray-700">
          <p>
            For questions or concerns regarding this policy, please contact us
            at:
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
                <span className="font-semibold">Address:</span>{" "}
                {businessInfo.businessAddress}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm">
              <span className="font-semibold">Legal Entity Name:</span>{" "}
              {businessInfo.legalEntity}
            </p>
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
              <RefreshCw className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-3">
            Refund and Cancellation Policy
          </h1>
          <p className="text-center text-gray-700 text-lg">
            Thank you for choosing{" "}
            <span className="font-semibold">{businessInfo.businessName}</span>.
            We strive to provide excellent service and ensure customer
            satisfaction. Please review our refund and cancellation policy
            below.
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