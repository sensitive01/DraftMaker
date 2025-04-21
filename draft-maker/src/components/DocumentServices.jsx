import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // Make sure to install this dependency

export default function DocumentServices() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const documentTypes = [
    {
      id: 1,
      title: "Commercial Rental Agreement",
      subtitle: "Lease for business properties",
      type: "agreement",
      path: "/documents/commercial/commercial-lease",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    },
    {
      id: 2,
      title: "Residential Lease",
      subtitle: "Home rental agreements",
      type: "agreement",
      path: "/documents/rental/residential-lease",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      id: 3,
      title: "Address Affidavit",
      subtitle: "Proof of residence document",
      type: "Address-Affadavit",
      path: "/documents/address/addressaffadavit",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    },
    {
      id: 4,
      title: "Passport Name Change",
      subtitle: "Official name modification",
      type: "Passport Name change",
      path: "/documents/passport-name/passport-name-change",
      icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
    },
    {
      id: 5,
      title: "Passport Annexure",
      subtitle: "Supporting documentation",
      type: "affidavit",
      path: "/documents/passport-annaxure/passport-annaxure",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      id: 6,
      title: "Gap Period Affidavit",
      subtitle: "Verification for timeline gaps",
      type: "affidavit",
      path: "/documents/gap-period/gap-period",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    {
      id: 7,
      title: "HUF Agreement",
      subtitle: "Hindu Undivided Family docs",
      type: "affidavit",
      path: "/documents/huf/huf-aggrement",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
  ];

  const handleDocumentClick = (path) => {
    navigate(path);
  };

  // Navigation functions with sliding animation for arrows
  const moveLeft = () => {
    const arrowLeft = document.querySelector(".arrow-left");
    if (arrowLeft) {
      // Add slide animation class
      arrowLeft.classList.add("arrow-slide");

      // Remove the class after animation completes
      setTimeout(() => {
        arrowLeft.classList.remove("arrow-slide");
      }, 300);
    }

    const newActive = activeIndex - 1;
    setActiveIndex(newActive < 0 ? documentTypes.length - 1 : newActive);
    setDirection("left");
  };

  const moveRight = () => {
    const arrowRight = document.querySelector(".arrow-right");
    if (arrowRight) {
      // Add slide animation class
      arrowRight.classList.add("arrow-slide");

      // Remove the class after animation completes
      setTimeout(() => {
        arrowRight.classList.remove("arrow-slide");
      }, 300);
    }

    setActiveIndex((activeIndex + 1) % documentTypes.length);
    setDirection("right");
  };

  // Generate carousel items
  const generateCarouselItems = () => {
    const items = [];

    // Show 5 items (-2, -1, 0, 1, 2) relative to active
    for (let i = activeIndex - 2; i <= activeIndex + 2; i++) {
      let index = i;

      // Handle wrap-around for indices
      if (i < 0) {
        index = documentTypes.length + i;
      } else if (i >= documentTypes.length) {
        index = i % documentTypes.length;
      }

      // Calculate level (-2, -1, 0, 1, 2)
      const level = i - activeIndex;

      if (index >= 0 && index < documentTypes.length) {
        const doc = documentTypes[index];
        items.push(
          <CarouselItem
            key={doc.id}
            doc={doc}
            level={level}
            isHovered={hoveredIndex === doc.id}
            onMouseEnter={() => setHoveredIndex(doc.id)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleDocumentClick(doc.path)}
          />
        );
      }
    }

    return items;
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 py-4">
      <div className="max-w-6xl mx-auto px-4">


        <div className="relative h-80">
          {/* Left Navigation Arrow with Slide Effect */}
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

          {/* Right Navigation Arrow with Slide Effect */}
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

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {documentTypes.map((doc, index) => (
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
              }}
              aria-label={`Go to ${doc.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Carousel Item Component
const CarouselItem = ({
  doc,
  level,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  // Define style properties based on level and hover state
  const getItemStyles = () => {
    const styles = {
      position: "absolute",
      transition: "all 0.5s ease",
      cursor: "pointer",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    };

    // Center position
    const centerX = "50%";
    const centerY = "50%";

    // Base styles for each position
    const positionStyles = {
      "-2": {
        // Far left
        transform: "translate(-180%, -50%) scale(0.6)",
        left: centerX,
        top: centerY,
        zIndex: 1,
        opacity: 0.6,
      },
      "-1": {
        // Left
        transform: "translate(-100%, -50%) scale(0.8)",
        left: centerX,
        top: centerY,
        zIndex: 2,
        opacity: 0.8,
      },
      0: {
        // Center
        transform: "translate(-50%, -50%) scale(1)",
        left: centerX,
        top: centerY,
        zIndex: 5,
        opacity: 1,
        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
      },
      1: {
        // Right
        transform: "translate(0%, -50%) scale(0.8)",
        left: centerX,
        top: centerY,
        zIndex: 2,
        opacity: 0.8,
      },
      2: {
        // Far right
        transform: "translate(80%, -50%) scale(0.6)",
        left: centerX,
        top: centerY,
        zIndex: 1,
        opacity: 0.6,
      },
    };

    // Get base style for current level
    const baseStyle = positionStyles[level.toString()] || { display: "none" };

    // Apply hover effect for side items (but not the center item which is already at max scale)
    if (isHovered && level !== 0) {
      // Enhance the item on hover
      const hoverStyle = {
        ...baseStyle,
        transform: baseStyle.transform.replace(
          /scale\([^)]+\)/,
          level < 0 ? "scale(0.9)" : "scale(0.9)"
        ),
        opacity: 0.95,
        zIndex: baseStyle.zIndex + 2, // Elevate z-index
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
      };
      return { ...styles, ...hoverStyle };
    }

    // Center item hover effect
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

        <p className="text-gray-500 text-center text-sm">{doc.subtitle}</p>
      </div>
    </div>
  );
};
