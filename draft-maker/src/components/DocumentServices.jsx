import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocumentName } from "../api/service/axiosService";

export default function DocumentServices() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [autoNavigationEnabled, setAutoNavigationEnabled] = useState(true);
  const [visibleDocumentTypes, setVisibleDocumentTypes] = useState([]);

  const documentTypes = [
    {
      id: 1,
      title: "Commercial Rental Agreement",
      subtitle: "Lease for business properties",
      type: "agreement",
      path: "/documents/commercial/commercial-lease",
      apiTitle: "Rental Agreement  (commercial)", // Match with API
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    },
    {
      id: 2,
      title: "Residential Lease",
      subtitle: "Home rental agreements",
      type: "agreement",
      path: "/documents/rental/residential-lease",
      apiTitle: "Rental Agreement (residential)", // Match with API
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      id: 3,
      title: "Address Affidavit",
      subtitle: "Proof of residence document",
      type: "Address-Affadavit",
      path: "/documents/address/addressaffadavit",
      apiTitle: "Address Proof Affidavit", // Match with API
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    },
    {
      id: 4,
      title: "Passport Name Change",
      subtitle: "Official name modification",
      type: "Passport Name change",
      path: "/documents/passport-name/passport-name-change",
      apiTitle: "Passport Name Change", // Match with API
      icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
    },
    {
      id: 5,
      title: "Passport Annexure",
      subtitle: "Supporting documentation",
      type: "affidavit",
      path: "/documents/passport-annaxure/passport-annaxure",
      apiTitle: "Passport Annexure F", // Match with API
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      id: 6,
      title: "Gap Period Affidavit",
      subtitle: "Verification for timeline gaps",
      type: "affidavit",
      path: "/documents/gap-period/gap-period",
      apiTitle: "Gap Period", // Match with API
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    {
      id: 7,
      title: "HUF Agreement",
      subtitle: "Hindu Undivided Family docs",
      type: "affidavit",
      path: "/documents/huf/huf-aggrement",
      apiTitle: "Huf Correction", // Match with API
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      id: 8,
      title: "Vehicle Insurance Claming",
      subtitle: "Claim Your Vehicle insurance",
      type: "affidavit",
      path: "/documents/vehicle-insurance/vehicle-insurance-claiming",
      apiTitle: "Vehicle Insurance Claiming", // Match with API
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      id: 9,
      title: "Khata Transfer Document",
      subtitle: "Joint Khata Transfer document",
      type: "affidavit",
      path: "/documents/khata-transfer/khata-transfer-document",
      apiTitle: "Joint Khata Transfer", // Match with API
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      id: 10,
      title: "Metriculation",
      subtitle: "Metriculation certificate",
      type: "affidavit",
      path: "/documents/metriculation/metriculation-document",
      apiTitle: "Matriculation Certificate Lost", // Match with API
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      id: 11,
      title: "GST NOC BY OWNER",
       subtitle: "GST NOC by Owner",
      type: "affidavit",
      path: "/documents/gst/gst-document",
      apiTitle: "Gst Noc By Owner", // Match with API
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      id: 12,
      title: "Birth Certificate Correction",
      subtitle: "Birth Certificate Correction",
      type: "affidavit",
      path: "/documents/birth-certificate/birth-certificate-correction",
      apiTitle: "Birth Cert Minor Name Correction", // Match with API
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      id: 13,
      title: "Birth Certificate Parent Name Correction",
      subtitle: "Birth Certificate Parent Name Correction",
      type: "affidavit",
      path: "/documents/birth-certificate-parent/birth-certificate-parent-name-correction",
      apiTitle: "Birth Cert Name Correction Minor Parents", // Match with API
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      id: 14,
      title: "Document Lost Correction",
      subtitle: "Document Lost",
      type: "affidavit",
      path: "/documents/document-lost/document-lost-correction",
      apiTitle: "Document Lost", // Match with API
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      id: 15,
      title: "Gas Document",
      subtitle: "Gas document",
      type: "affidavit",
      path: "/documents/gas/gas-document",
      apiTitle: "Gas", // Match with API
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      id: 16,
      title: "DOB Correction",
      subtitle: "Date of Birth correction",
      type: "affidavit",
      path: "/documents/dob/dob-correction",
      apiTitle: "Date Of Birth Correction", // Match with API
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      id: 17,
      title: "Name Correction",
      subtitle: "Name correction document",
      type: "affidavit",
      path: "/documents/name/name-correction",
      apiTitle: "Name Correction Change", // Match with API
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      id: 18,
      title: "Dual Name Correction",
      subtitle: "Dual name correction",
      type: "affidavit",
      path: "/documents/dual-name/dual-name-correction",
      apiTitle: "Dual Name Change", // Match with API
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDocumentName();

        if (response.status === 200) {
          // Filter documentTypes based on API visibility
          const visibleDocs = documentTypes.filter((doc) => {
            const apiDoc = response.data.data.find(
              (apiItem) =>
                apiItem.documentType === doc.apiTitle && apiItem.status === true
            );
            return apiDoc !== undefined;
          });

          setVisibleDocumentTypes(visibleDocs);

          // Reset activeIndex if current index is out of bounds
          if (visibleDocs.length > 0 && activeIndex >= visibleDocs.length) {
            setActiveIndex(0);
          }
        }
      } catch (error) {
        console.error("Error fetching document data:", error);
        // Fallback to show all documents if API fails
        setVisibleDocumentTypes(documentTypes);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (visibleDocumentTypes.length === 0) return;

    const currentPath = location.pathname;
    const foundIndex = visibleDocumentTypes.findIndex(
      (doc) => doc.path === currentPath
    );

    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
    }
  }, [location.pathname, visibleDocumentTypes]);

  // Modified to only navigate when user explicitly clicks on a carousel item
  const handleDocumentClick = (index) => {
    setActiveIndex(index);
    const path = visibleDocumentTypes[index].path;
    navigate(path);
  };

  // Navigation functions with sliding animation for arrows
  const moveLeft = () => {
    if (visibleDocumentTypes.length === 0) return;

    const arrowLeft = document.querySelector(".arrow-left");
    if (arrowLeft) {
      arrowLeft.classList.add("arrow-slide");
      setTimeout(() => {
        arrowLeft.classList.remove("arrow-slide");
      }, 300);
    }

    const newActive = activeIndex - 1;
    const newIndex =
      newActive < 0 ? visibleDocumentTypes.length - 1 : newActive;

    setActiveIndex(newIndex);
    setDirection("left");

    const path = visibleDocumentTypes[newIndex].path;
    navigate(path);
  };

  const moveRight = () => {
    if (visibleDocumentTypes.length === 0) return;

    const arrowRight = document.querySelector(".arrow-right");
    if (arrowRight) {
      arrowRight.classList.add("arrow-slide");
      setTimeout(() => {
        arrowRight.classList.remove("arrow-slide");
      }, 300);
    }

    const newIndex = (activeIndex + 1) % visibleDocumentTypes.length;

    setActiveIndex(newIndex);
    setDirection("right");

    const path = visibleDocumentTypes[newIndex].path;
    navigate(path);
  };

  // Generate carousel items - now using visibleDocumentTypes
  const generateCarouselItems = () => {
    const items = [];

    // Show 5 items (-2, -1, 0, 1, 2) relative to active
    for (let i = activeIndex - 2; i <= activeIndex + 2; i++) {
      let index = i;

      // Handle wrap-around for indices
      if (i < 0) {
        index = visibleDocumentTypes.length + i;
      } else if (i >= visibleDocumentTypes.length) {
        index = i % visibleDocumentTypes.length;
      }

      // Calculate level (-2, -1, 0, 1, 2)
      const level = i - activeIndex;

      if (index >= 0 && index < visibleDocumentTypes.length) {
        const doc = visibleDocumentTypes[index];
        items.push(
          <CarouselItem
            key={doc.id}
            doc={doc}
            level={level}
            isHovered={hoveredIndex === doc.id}
            onMouseEnter={() => setHoveredIndex(doc.id)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleDocumentClick(index)}
          />
        );
      }
    }

    return items;
  };

  // Show loading or empty state if no visible documents
  if (visibleDocumentTypes.length === 0) {
    return (
      <div className="py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-20">
            <p className="text-gray-500">Loading documents...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative h-80">
          {/* Left Navigation Arrow */}
          <button
            onClick={moveLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg border border-gray-100 transition-all duration-300 hover:bg-red-50 arrow-left"
            aria-label="Previous document"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-500"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* 3D Carousel Container */}
          <div className="carousel-container overflow-hidden h-full w-full relative">
            <div className="carousel-items relative h-full w-full">
              {generateCarouselItems()}
            </div>
          </div>

          {/* Right Navigation Arrow */}
          <button
            onClick={moveRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg border border-gray-100 transition-all duration-300 hover:bg-red-50 arrow-right"
            aria-label="Next document"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-500"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator - now using visibleDocumentTypes */}
        <div className="flex justify-center mt-6 gap-2">
          {visibleDocumentTypes.map((doc, index) => (
            <button
              key={doc.id}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index
                  ? "w-8 bg-red-500"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => {
                setDirection(index > activeIndex ? "right" : "left");
                setActiveIndex(index);
                navigate(doc.path);
              }}
              aria-label={`Go to ${doc.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Carousel Item Component remains the same
const CarouselItem = ({
  doc,
  level,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const getItemStyles = () => {
    const styles = {
      position: "absolute",
      transition: "all 0.5s ease",
      cursor: "pointer",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    };

    const centerX = "50%";
    const centerY = "50%";

    const positionStyles = {
      "-2": {
        transform: "translate(-180%, -50%) scale(0.6)",
        left: centerX,
        top: centerY,
        zIndex: 1,
        opacity: 0.6,
      },
      "-1": {
        transform: "translate(-100%, -50%) scale(0.8)",
        left: centerX,
        top: centerY,
        zIndex: 2,
        opacity: 0.8,
      },
      0: {
        transform: "translate(-50%, -50%) scale(1)",
        left: centerX,
        top: centerY,
        zIndex: 5,
        opacity: 1,
        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
      },
      1: {
        transform: "translate(0%, -50%) scale(0.8)",
        left: centerX,
        top: centerY,
        zIndex: 2,
        opacity: 0.8,
      },
      2: {
        transform: "translate(80%, -50%) scale(0.6)",
        left: centerX,
        top: centerY,
        zIndex: 1,
        opacity: 0.6,
      },
    };

    const baseStyle = positionStyles[level.toString()] || { display: "none" };

    if (isHovered && level !== 0) {
      const hoverStyle = {
        ...baseStyle,
        transform: baseStyle.transform.replace(
          /scale\([^)]+\)/,
          level < 0 ? "scale(0.9)" : "scale(0.9)"
        ),
        opacity: 0.95,
        zIndex: baseStyle.zIndex + 2,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
      };
      return { ...styles, ...hoverStyle };
    }

    if (isHovered && level === 0) {
      return {
        ...styles,
        ...baseStyle,
        transform: "translate(-50%, -50%) scale(1.05)",
        boxShadow: "0 12px 25px rgba(0, 0, 0, 0.25)",
      };
    }

    return { ...styles, ...baseStyle };
  };

  return (
    <div
      className="bg-white overflow-hidden cursor-pointer"
      style={getItemStyles()}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="h-3 bg-gradient-to-r from-red-500 to-red-600"></div>
      <div className="p-6 w-64">
        <div className="mb-4 bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d={doc.icon}
            />
          </svg>
        </div>

        <h3 className="text-gray-800 text-center text-lg font-semibold mb-2">
          {doc.title}
        </h3>

        {/* <p className="text-gray-500 text-center text-sm">{doc.subtitle}</p> */}
      </div>
    </div>
  );
};
