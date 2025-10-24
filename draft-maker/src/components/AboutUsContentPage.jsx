import React from "react";
import {
  Target,
  Eye,
  Users,
  Award,
  FileText,
  Clock,
  Home,
  FileCheck,
  User,
  Calendar,
  AlertCircle,
  Fuel,
  Baby,
  CreditCard,
  MapPin,
  Car,
  UserCheck,
  BookOpen,
  IdCard,
  Newspaper,
  Stamp,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutUsContentPage = () => {
  // Services data with icons and navigation paths
  const documentDraftingServices = [
    {
      name: "Residential Lease Agreement",
      icon: <Home className="w-5 h-5" />,
      path: "/documents/rental/residential-lease",
    },
    {
      name: "Commercial Lease Agreement",
      icon: <FileCheck className="w-5 h-5" />,
      path: "/documents/commercial/commercial-lease",
    },
    {
      name: "Address Proof Affidavit",
      icon: <MapPin className="w-5 h-5" />,
      path: "/documents/address/addressaffadavit",
    },
    {
      name: "Dual Name/One and Same",
      icon: <User className="w-5 h-5" />,
      path: "/documents/dual-name/dual-name-correction",
    },
    {
      name: "Name Change",
      icon: <UserCheck className="w-5 h-5" />,
      path: "/documents/name/name-correction",
    },
    {
      name: "DOB Mismatch",
      icon: <Calendar className="w-5 h-5" />,
      path: "/documents/dob/dob-correction",
    },
    {
      name: "Gas Voucher Lost",
      icon: <Fuel className="w-5 h-5" />,
      path: "/documents/gas/gas-document",
    },
    {
      name: "Document Lost Declaration",
      icon: <AlertCircle className="w-5 h-5" />,
      path: "/documents/document-lost/document-lost-correction",
    },
    {
      name: "Birth Certificate Parent's Name",
      icon: <Baby className="w-5 h-5" />,
      path: "/documents/birth-certificate-parent/birth-certificate-parent-name-correction",
    },
    {
      name: "Birth Certificate Name Change",
      icon: <FileText className="w-5 h-5" />,
      path: "/documents/birth-certificate/birth-certificate-correction",
    },
    {
      name: "GST NOC Premises",
      icon: <CreditCard className="w-5 h-5" />,
      path: "/documents/gst/gst-document",
    },
    {
      name: "Matriculation Certificate Lost",
      icon: <BookOpen className="w-5 h-5" />,
      path: "/documents/metriculation/metriculation-document",
    },
    {
      name: "Khata Transfer",
      icon: <FileCheck className="w-5 h-5" />,
      path: "/documents/khata-transfer/khata-transfer-document",
    },
    {
      name: "Vehicle Insurance Claiming",
      icon: <Car className="w-5 h-5" />,
      path: "/documents/vehicle-insurance/vehicle-insurance-claiming",
    },
    {
      name: "HUF PAN Deed",
      icon: <FileText className="w-5 h-5" />,
      path: "/documents/huf/huf-aggrement",
    },
    {
      name: "Gap Period Tata",
      icon: <Clock className="w-5 h-5" />,
      path: "/documents/gap-period/gap-period",
    },
    {
      name: "Passport Annexure-F",
      icon: <IdCard className="w-5 h-5" />,
      path: "/documents/passport-annaxure/passport-annaxure",
    },
    {
      name: "Passport Name Change",
      icon: <IdCard className="w-5 h-5" />,
      path: "/documents/passport-name/passport-name-change",
    },
  ];

  const newspaperServices = [
    {
      name: "Passport Name Change Ad",
      icon: <Newspaper className="w-5 h-5" />,
      path: "/documents/passport-name/passport-name-change",
    },
    {
      name: "Other Newspaper Ads",
      icon: <Newspaper className="w-5 h-5" />,
      path: "#",
    },
  ];

  const inShopServices = [
    { name: "Notary Services", icon: <Stamp className="w-5 h-5" />, path: "#" },
    {
      name: "Police Verification Certificate",
      icon: <Shield className="w-5 h-5" />,
      path: "#",
    },
    {
      name: "Passport Services",
      icon: <IdCard className="w-5 h-5" />,
      path: "#",
    },
    {
      name: "PAN Card Services",
      icon: <CreditCard className="w-5 h-5" />,
      path: "#",
    },
    {
      name: "Voter ID Services",
      icon: <UserCheck className="w-5 h-5" />,
      path: "#",
    },
    {
      name: "Jeevan Pramaan Certificate",
      icon: <FileCheck className="w-5 h-5" />,
      path: "#",
    },
  ];

  const ServiceCard = ({ service }) => (
    <Link
      to={service.path}
      className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 hover:border-red-200"
    >
      <div className="flex items-center space-x-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          style={{ background: "#770000" }}
        >
          <div className="text-white">{service.icon}</div>
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-800 group-hover:text-red-700 transition-colors duration-300 text-sm">
            {service.name}
          </h4>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="text-white py-16" style={{ background: "#770000" }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <nav className="text-sm">
            <span className="opacity-80">Home</span>
            <span className="mx-2">/</span>
            <span>About Us</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* About Section Header */}
        <div className="text-center mb-12">
          <p
            className="font-semibold text-sm uppercase tracking-wide mb-2"
            style={{ color: "#770000" }}
          >
            ABOUT US
          </p>
          <h2 className="text-3xl font-bold text-gray-800">
            Know More <span style={{ color: "#770000" }}>About Us</span>
          </h2>
        </div>

        {/* Company Overview */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              What We Offer
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Over time, Draft Maker has introduced innovative approaches to
              service delivery, enhancing both the accessibility and quality of
              services provided to citizens. To elevate this further, we are
              moving towards delivering services that are fully digital —
              eliminating the need for physical paperwork, cash transactions, or
              in-person visits — ensuring citizens receive prompt and guaranteed
              assistance.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              This initiative aims to make public services more accessible,
              affordable, transparent, and accountable for everyone.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h4
                  className="font-semibold text-gray-800 mb-2"
                  style={{ color: "#770000" }}
                >
                  Government-to-Citizen Services
                </h4>
                <p className="text-gray-600 text-sm">
                  Streamlined digital solutions for government documentation and
                  citizen services
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h4
                  className="font-semibold text-gray-800 mb-2"
                  style={{ color: "#770000" }}
                >
                  Business-to-Citizen Solutions
                </h4>
                <p className="text-gray-600 text-sm">
                  Professional business documentation and commercial service
                  solutions
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h4
                  className="font-semibold text-gray-800 mb-2"
                  style={{ color: "#770000" }}
                >
                  Financial Assistance Services
                </h4>
                <p className="text-gray-600 text-sm">
                  Support and documentation for financial assistance and
                  advisory services
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision and Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Vision Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "#770000" }}
              >
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
            </div>
            <p className="text-gray-600 text-center leading-relaxed">
              Our Visionary Founder and Proprietor Nagaraj Ajay Kumar vision is to revolutionize citizen services through complete digital transformation, creating a paperless, cashless, and contactless
              ecosystem where every citizen can access government and business
              services with transparency, accountability, and guaranteed
              delivery — making quality public services a fundamental right
              rather than a privilege.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "#770000" }}
              >
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-gray-600 text-center leading-relaxed">
              To innovate and deliver fully digital service solutions that
              eliminate traditional barriers of physical paperwork, cash
              transactions, and in-person visits. We are committed to making
              Government-to-Citizen services, Business-to-Citizen solutions, and
              Financial Assistance services more accessible, affordable,
              transparent, and accountable through cutting-edge technology and
              citizen-centric approaches.
            </p>
          </div>
        </div>

        {/* Our Services - Clickable Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <p
              className="font-semibold text-sm uppercase tracking-wide mb-2"
              style={{ color: "#770000" }}
            >
              OUR SERVICES
            </p>
            <h2 className="text-3xl font-bold text-gray-800">
              Comprehensive{" "}
              <span style={{ color: "#770000" }}>Document Solutions</span>
            </h2>
          </div>

          {/* Document Drafting Services */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-2" style={{ color: "#770000" }} />
              Document Drafting Services
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {documentDraftingServices.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>

          {/* E-Stamp Service */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Stamp className="w-6 h-6 mr-2" style={{ color: "#770000" }} />
              E-Stamp Services
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <ServiceCard
                service={{
                  name: "Buy E-Stamp",
                  icon: <Stamp className="w-5 h-5" />,
                  path: "/documents/buy-e-stamp",
                }}
              />
            </div>
          </div>

          {/* Newspaper Ad Services */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Newspaper
                className="w-6 h-6 mr-2"
                style={{ color: "#770000" }}
              />
              Newspaper Advertisement Services
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {newspaperServices.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>

          {/* In-Shop Services */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-2" style={{ color: "#770000" }} />
              In-Shop Services
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {inShopServices.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>

          {/* Track Order Service */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2" style={{ color: "#770000" }} />
              Track Your Order
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <ServiceCard
                service={{
                  name: "Track My Documents",
                  icon: <Clock className="w-5 h-5" />,
                  path: "/documents/track-my-documents",
                }}
              />
            </div>
          </div>
        </div>

        {/* Features/Services Overview */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <p
              className="font-semibold text-sm uppercase tracking-wide mb-2"
              style={{ color: "#770000" }}
            >
              WHY CHOOSE US
            </p>
            <h2 className="text-3xl font-bold text-gray-800">
              What Makes Us <span style={{ color: "#770000" }}>Different</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-lg shadow-lg p-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "#770000" }}
              >
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Professional Documents
              </h3>
              <p className="text-gray-600">
                Expertly crafted documents that meet legal standards and
                requirements with precision and accuracy.
              </p>
            </div>

            <div className="text-center bg-white rounded-lg shadow-lg p-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "#770000" }}
              >
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Quick Turnaround
              </h3>
              <p className="text-gray-600">
                Fast and efficient service delivery without compromising on
                quality or attention to detail.
              </p>
            </div>

            <div className="text-center bg-white rounded-lg shadow-lg p-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "#770000" }}
              >
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Trusted Service
              </h3>
              <p className="text-gray-600">
                Reliable and trustworthy service with a proven track record of
                satisfied customers.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact us today to discuss your document requirements and let us
              help you with professional, reliable solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/home/all-about-us">
                <button
                  className="text-white py-3 px-8 rounded-lg font-semibold transition-colors cursor-pointer hover:bg-red-800"
                  style={{ background: "#770000" }}
                >
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsContentPage;
