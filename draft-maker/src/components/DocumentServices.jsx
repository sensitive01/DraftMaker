import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DocumentServices() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  const documentTypes = [
    {
      id: 1,
      title: "Commercial Rental / Lease Agreement",
      type: "agreement",
      path: "/documents/commercial/commercial-lease",
    },
    {
      id: 2,
      title: "Residential Rental / Lease Agreement",
      type: "agreement",
      path: "/documents/rental/residential-lease",
    },
    {
      id: 3,
      title: "Address Affadavit",
      type: "affidavit",
      path: "/documents/address/addressaffadavit",
    },
    {
      id: 4,
      title: "AFFIDAVITS",
      type: "affidavit",
      path: "/documents/affidavit-2",
    },
    {
      id: 5,
      title: "AFFIDAVITS",
      type: "affidavit",
      path: "/documents/affidavit-3",
    },
    {
      id: 6,
      title: "AFFIDAVITS",
      type: "affidavit",
      path: "/documents/affidavit-4",
    },
  ];

  const handleDocumentClick = (path) => {
    navigate(path);
  };

  return (
    <div className="max-w-5xl mx-auto text-center">
        <div className="w-full  p-8 font-sans">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {documentTypes.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-4 rounded shadow relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:bg-red-50"
              onMouseEnter={() => setHoveredId(doc.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleDocumentClick(doc.path)}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4 transition-all duration-300 hover:bg-red-600">
                  <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v1H7V5zm6 3H7v1h6V8zm-6 3h6v1H7v-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-gray-600 text-center text-sm font-medium">
                  {doc.title}
                </h3>
              </div>

              {/* Bottom animated line with consistent styling */}
              <div className="absolute bottom-0 left-0 w-full h-1">
                <div
                  className="absolute bottom-0 left-0 h-1 bg-red-600 transition-all duration-500 ease-out"
                  style={{
                    width: hoveredId === doc.id ? "100%" : "30%",
                    opacity: hoveredId === doc.id ? 1 : 0.5,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
