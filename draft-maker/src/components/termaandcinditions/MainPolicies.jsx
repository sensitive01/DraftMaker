import React, { useState } from "react";
import { FileText, Shield, RefreshCw, RotateCcw } from "lucide-react";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import TermsAndConditionsPage from "./TermsAndConditionsPage";
import RefundCancellationPolicyPage from "./RefundCancellationPolicyPage";
import RefundReturnPolicyPage from "./RefundReturnPolicyPage";

export default function MainPolicies() {
  const [activeTab, setActiveTab] = useState("terms");

  const tabs = [
    {
      id: "terms",
      label: "Terms & Conditions",
      icon: <FileText className="w-5 h-5" />,
      component: <TermsAndConditionsPage />,
    },
    {
      id: "privacy",
      label: "Privacy Policy",
      icon: <Shield className="w-5 h-5" />,
      component: <PrivacyPolicyPage />,
    },
    {
      id: "refund-cancellation",
      label: "Refund & Cancellation",
      icon: <RefreshCw className="w-5 h-5" />,
      component: <RefundCancellationPolicyPage />,
    },
    {
      id: "refund-return",
      label: "Refund & Return",
      icon: <RotateCcw className="w-5 h-5" />,
      component: <RefundReturnPolicyPage />,
    },
  ];

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Tabs Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-6 py-3.5 
                  font-medium text-sm whitespace-nowrap
                  transition-all duration-200
                  border-b-3 relative
                  ${
                    activeTab === tab.id
                      ? "text-white border-b-4"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-b-4 border-transparent"
                  }
                `}
                style={
                  activeTab === tab.id
                    ? {
                        backgroundColor: "#770000",
                        borderBottomColor: "#550000",
                      }
                    : {}
                }
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full">
        {activeTabData && activeTabData.component}
      </div>
    </div>
  );
}