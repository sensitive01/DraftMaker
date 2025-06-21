import React from "react";
import { useParams } from "react-router-dom";

const DraftHeading = () => {
  const { type } = useParams();
  let agrType = "";
  console.log("Type", type);
  if (type === "commercial-lease") {
    agrType = "Commercial/Lease Aggrement";
  } else if (type === "residential-lease") {
    agrType = "Rental/Lease Aggrement";
  } else {
    agrType = type;
  }
  return (
    <div className="container max-w-5xl mx-auto px-4 py-14 ">
      <div className="bred_text">
        <h1 className="text-5xl font-bold text-red-900 mb-4 ">
          Draft Document
        </h1>
        <ul className="flex items-center text-gray-600 text-sm justify-center">
          <li>
            <a href="/" className="hover:text-red-900 transition-colors">
              Document
            </a>
          </li>
          <li>
            <span className="mx-2">»</span>
          </li>
          <li>
            <a
              href="/documents/rental/residential-lease"
              className="hover:text-red-900 transition-colors"
            >
              {agrType || ""}
            </a>
          </li>
        </ul>

        <div className="border-b border-gray-200 mt-6"></div>
      </div>
    </div>
  );
};

export default DraftHeading;
