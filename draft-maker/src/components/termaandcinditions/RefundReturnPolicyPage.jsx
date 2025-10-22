import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw, DollarSign, RefreshCw, Truck, AlertTriangle, Scale, Mail, Phone, MapPin } from 'lucide-react';

export default function RefundReturnPolicyPage() {
  const [expandedSections, setExpandedSections] = useState({});
  const [businessInfo] = useState({
    companyName: 'Draft Maker',
    contactEmail: 'info@draftmaker.in',
    contactPhone: '+91 8088774711',
    businessAddress: 'No 5, 1st floor, Site no 200, Muniraju Complex, Panathur Main Road, Kadubisanahalli, Bengaluru, Karnataka-560103',
    jurisdiction: 'Bengaluru',
    returnDays: '[Insert Number]',
    refundProcessingDays: '[Insert Number]',
    websitePortal: '[Insert Website Portal/Link]'
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: 1,
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Returns",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>We accept returns of products within {businessInfo.returnDays} days of purchase.</p>
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>Items must be unused, in their original packaging, and in the same condition as received.</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>To complete your return, we require a receipt or proof of purchase.</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-semibold">Note: Certain items are non-returnable, including:</p>
            <div className="flex items-start mt-2">
              <span className="mr-2 mt-1">•</span>
              <span>[Add non-returnable items here, e.g., perishable goods, custom items, personal care products]</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      icon: <DollarSign className="w-6 h-6" />,
      title: "Refunds",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>Once we receive and inspect your return, we will notify you of the approval or rejection of your refund.</p>
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>Approved refunds will be sent to you within {businessInfo.refundProcessingDays} business days.</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>A partial refund may be issued at our discretion for items that are not in their original condition, are damaged, or have missing parts for reasons not due to our error.</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <span>Refunds will be issued through a method communicated to you at the time of approval.</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Exchanges",
      content: (
        <p className="text-gray-700">
          To initiate a return or exchange, please contact our customer support at <span className="font-semibold" style={{ color: '#770000' }}>{businessInfo.contactEmail}</span> or <span className="font-semibold">{businessInfo.contactPhone}</span> or submit a return request through {businessInfo.websitePortal}. Our team will guide you through the process and provide necessary instructions.
        </p>
      )
    },
    {
      id: 4,
      icon: <Truck className="w-6 h-6" />,
      title: "Shipping Returns",
      content: (
        <p className="text-gray-700">
          You are responsible for paying your own shipping costs for returning your item. Shipping costs are non-refundable.
        </p>
      )
    },
    {
      id: 5,
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Force Majeure / Exceptional Circumstances",
      content: (
        <p className="text-gray-700">
          We are not liable for any delays in processing returns, exchanges, or refunds caused by circumstances beyond our reasonable control, including but not limited to natural disasters, strikes, government actions, or disruptions in transport or payment systems.
        </p>
      )
    },
    {
      id: 6,
      icon: <Scale className="w-6 h-6" />,
      title: "Governing Law",
      content: (
        <p className="text-gray-700">
          This Refund and Cancellation Policy shall be governed by and construed in accordance with the laws of India, including the Consumer Protection Act, 2019, and other applicable laws. Any disputes arising under or in connection with this policy shall be subject to the exclusive jurisdiction of the courts located in {businessInfo.jurisdiction}.
        </p>
      )
    },
    {
      id: 7,
      icon: <Mail className="w-6 h-6" />,
      title: "Contact Us",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>For questions or concerns regarding this policy, please contact us at:</p>
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <div>
                <span className="font-semibold">Email:</span> {businessInfo.contactEmail}
              </div>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <div>
                <span className="font-semibold">Phone:</span> {businessInfo.contactPhone}
              </div>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">•</span>
              <div>
                <span className="font-semibold">Address:</span> {businessInfo.businessAddress}
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-full" style={{ backgroundColor: '#770000' }}>
              <RotateCcw className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Refund and Return Policy</h1>
          <p className="text-center text-gray-700 text-lg mb-6">
            Thank you for shopping with <span className="font-semibold">{businessInfo.companyName}</span>. We value your satisfaction and strive to provide quality products. Please review our refund and return policy below.
          </p>
          
          {/* Disclaimer */}
          <div className="p-5 bg-amber-50 border-l-4 rounded" style={{ borderColor: '#770000' }}>
            <p className="text-sm text-gray-800 leading-relaxed">
              <span className="font-bold">Disclaimer:</span> Please ensure all placeholders (e.g., [Add Your Company Name], [Insert Number]) are filled in with your specific business information before publishing this policy. This template is a general guide and does not constitute legal advice. It is your responsibility to ensure this policy complies with all applicable laws and regulations relevant to your business and location.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4 mb-6">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div style={{ color: '#770000' }}>{section.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900">{section.id}. {section.title}</h3>
                </div>
                {expandedSections[section.id] ? (
                  <ChevronUp className="w-6 h-6 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {expandedSections[section.id] && (
                <div className="px-6 pb-6 pt-2">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}