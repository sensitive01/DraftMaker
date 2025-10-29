import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Shield,
  Users,
  ShoppingCart,
  Link,
  Copyright,
  AlertTriangle,
  Scale,
  RefreshCw,
  Mail,
} from "lucide-react";

export default function TermsAndConditionsPage() {
  const [expandedSections, setExpandedSections] = useState({});
  const [businessInfo] = useState({
    companyName: "DRAFT MAKER",
    websiteUrl: "https://draftmaker.in",
    contactEmail: "draftmakerinfo@gmail.com",
    contactPhone: "8088774711",
    businessAddress:
      "No 5, 1st floor, Site no 200, Muniraju Complex, Panathur Main Road, Kadubisanahalli, Bengaluru, Karnataka-560103",
    location: "BENGALURU, KARNATAKA",
    legalEntity: "NAGARAJ AJAY KUMAR",
    minAge: "18",
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      id: 0,
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "⚖️ Legal Disclaimer",
      content: (
        <div className="space-y-4 text-gray-700">
          <p>
            Our platform provides document preparation and e-stamp services
            based on the information entered by users. We do not verify,
            validate, or authenticate the accuracy of the information provided.
          </p>
          <p>By using this service, the user acknowledges and agrees that:</p>
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="mr-2 mt-1">1.</span>
              <span>
                All information entered is true, correct, and provided
                voluntarily.
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">2.</span>
              <span>
                The website and its operators are not responsible or liable for
                any errors, false information, or misrepresentations made by the
                user.
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">3.</span>
              <span>
                If any dispute, legal issue, or police matter arises in the
                future due to incorrect or fraudulent information, the entire
                responsibility shall rest solely with the user.
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">4.</span>
              <span>
                The company and its operators will not participate in or be held
                liable for any court proceedings, police complaints, or
                third-party disputes resulting from such misinformation.
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">5.</span>
              <span>
                By proceeding, the user agrees to indemnify and hold harmless
                the company, its employees, and partners against any claims or
                losses arising from the misuse of the service.
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      icon: <FileText className="w-6 h-6" />,
      title: "Introduction",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>
            These terms and conditions shall govern your use of our website.
          </p>
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="mr-2 mt-1">i.</span>
              <span>
                By using our website, you accept these terms and conditions in
                full; accordingly, if you disagree with these terms and
                conditions or any part of these terms and conditions, you must
                not use our website.
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">ii.</span>
              <span>
                If you [register with our website, submit any material to our
                website or use any of our website services], we will ask you to
                expressly agree to these terms and conditions.
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">iii.</span>
              <span>
                By using our website or agreeing to these terms and conditions,
                you warrant and represent to us that you are at least [
                {businessInfo.minAge}] years of age.
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">iv.</span>
              <span>
                Our website uses cookies; by using our website or agreeing to
                these terms and conditions, you consent to our use of cookies in
                accordance with the terms of our [privacy policy].
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      icon: <Shield className="w-6 h-6" />,
      title: "Acceptable use",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>You must not:</p>
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="mr-2 mt-1">i.</span>
              <span>
                use our website in any way or take any action that causes, or
                may cause, damage to the website or impairment of the
                performance, availability or accessibility of the website;
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">ii.</span>
              <span>
                use our website in any way that is unlawful, illegal, fraudulent
                or harmful, or in connection with any unlawful, illegal,
                fraudulent or harmful purpose or activity;
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">iii.</span>
              <span>
                use our website to copy, store, host, transmit, send, use,
                publish or distribute any material which consists of (or is
                linked to) any spyware, computer virus, Trojan horse, worm,
                keystroke logger, rootkit or other malicious computer software;
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">iv.</span>
              <span>
                conduct any systematic or automated data collection activities
                (including without limitation scraping, data mining, data
                extraction and data harvesting) on or in relation to our website
                without our express written consent;
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">v.</span>
              <span>
                access or otherwise interact with our website using any robot,
                spider or other automated means except for the purpose of
                [search engine indexing or ___________];
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">vi.</span>
              <span>
                use data collected from our website for any direct marketing
                activity (including without limitation email marketing, SMS
                marketing, telemarketing and direct mailing);
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">vii.</span>
              <span>
                You must ensure that all the information you supply to us
                through our website, or in relation to our website, is [true,
                accurate, current, complete and non-misleading];
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">viii.</span>
              <span>
                You agree to use this website only for lawful purposes and in a
                way that does not infringe the rights of, restrict, or inhibit
                anyone else's use and enjoyment of the site. Prohibited
                behaviour includes transmitting offensive or unlawful content or
                disrupting the normal operation of the site.
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      icon: <Users className="w-6 h-6" />,
      title: "User Accounts",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>
            To access certain features, you may need to create an account. You
            are responsible for maintaining the confidentiality of your account
            details and are fully responsible for all activities that occur
            under your account. We may:
          </p>
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="mr-2 mt-1">i.</span>
              <span>suspend your account;</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">ii.</span>
              <span>cancel your account; and/or</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 mt-1">iii.</span>
              <span>edit your account details</span>
            </div>
          </div>
          <p className="mt-3">
            at any time in our sole discretion without notice or explanation.
            You may cancel your account on our website [using your account
            control panel on the website].
          </p>
        </div>
      ),
    },
    {
      id: 4,
      icon: <ShoppingCart className="w-6 h-6" />,
      title: "Product & Service Information",
      content: (
        <p className="text-gray-700">
          We aim to provide accurate descriptions and pricing of our products
          and services on the website. However, we do not guarantee that the
          information, including availability and pricing, is always accurate,
          complete, or current. We reserve the right to correct errors and
          update information without prior notice.
        </p>
      ),
    },
    {
      id: 5,
      icon: <Link className="w-6 h-6" />,
      title: "Third-Party Links",
      content: (
        <p className="text-gray-700">
          Our website may contain links to third-party websites that are not
          under our control. We are not responsible for the content, policies,
          or practices of these external sites. Accessing third-party links is
          at your own risk.
        </p>
      ),
    },
    {
      id: 6,
      icon: <Copyright className="w-6 h-6" />,
      title: "Intellectual Property Rights",
      content: (
        <p className="text-gray-700">
          All content on this site — including text, images, graphics, logos,
          and software — is owned or licensed by {businessInfo.companyName} and
          protected by applicable intellectual property laws. You may not
          reproduce, distribute, or use our content without our prior written
          consent.
        </p>
      ),
    },
    {
      id: 7,
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Limitation of Liability",
      content: (
        <p className="text-gray-700">
          To the extent permitted by law, {businessInfo.companyName} shall not
          be liable for any indirect, incidental, or consequential damages
          arising out of or related to your use of the website, including but
          not limited to damages for loss of profits, data, or other intangible
          losses.
        </p>
      ),
    },
    {
      id: 8,
      icon: <Shield className="w-6 h-6" />,
      title: "Disclaimer of Warranties",
      content: (
        <p className="text-gray-700">
          This website is provided "as is" and "as available" without any
          warranties of any kind, either express or implied. We do not guarantee
          that the site will always be available, secure, or free from errors or
          viruses.
        </p>
      ),
    },
    {
      id: 9,
      icon: <Scale className="w-6 h-6" />,
      title: "Indemnity",
      content: (
        <p className="text-gray-700">
          You agree to indemnify, defend, and hold harmless{" "}
          {businessInfo.companyName} and its affiliates, directors, officers,
          employees, and agents from and against all claims, liabilities,
          damages, losses, or expenses, including reasonable legal fees, arising
          out of your use of the website or your violation of these Terms &
          Conditions.
        </p>
      ),
    },
    {
      id: 10,
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Changes to Terms",
      content: (
        <p className="text-gray-700">
          We reserve the right to modify or update these Terms & Conditions at
          any time without prior notice. Changes will be effective once posted
          on this page. We recommend checking this page periodically for
          updates.
        </p>
      ),
    },
    {
      id: 11,
      icon: <Scale className="w-6 h-6" />,
      title: "Governing Law",
      content: (
        <p className="text-gray-700">
          These Terms & Conditions shall be governed by and interpreted in
          accordance with the laws of India, without regard to its conflict of
          law principles. Any disputes arising from or relating to these terms,
          your use of the website, or our services shall be subject to the
          exclusive jurisdiction of the courts located in{" "}
          {businessInfo.location}, India.
        </p>
      ),
    },
    {
      id: 12,
      icon: <Mail className="w-6 h-6" />,
      title: "Contact Us",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>
            If you have any questions or concerns about these Terms &
            Conditions, please contact us at:
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
              <FileText className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
            Terms & Conditions
          </h1>

          {/* IT Act Notice */}
          <div className="bg-gray-50 p-5 rounded-lg mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              This document is an electronic record generated under the
              provisions of the Information Technology Act, 2000 and the
              applicable rules, including any amendments. This document is
              published in line with Rule 3(1) of the Information Technology
              (Intermediaries Guidelines) Rules, 2011, which mandates the
              publication of the website's terms of use, privacy policy, and
              rules for user access and interaction on{" "}
              <span className="font-semibold" style={{ color: "#770000" }}>
                {businessInfo.websiteUrl}
              </span>
            </p>
          </div>
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
                    {section.id === 0
                      ? section.title
                      : `${section.id}. ${section.title}`}
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
