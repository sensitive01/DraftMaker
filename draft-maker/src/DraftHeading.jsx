import React from "react";

const DraftHeading = () => {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-6">
      <div className="bred_text">
        <h1 className="text-4xl font-bold text-red-900 mb-4 ">Draft Document</h1>
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
              href="/documents/residential-lease"
              className="hover:text-red-900 transition-colors"
            >
              Rental / Lease Agreement
            </a>
          </li>
        </ul>

        <div className="border-b border-gray-200 mt-6"></div>
      </div>
    </div>
  );
};

export default DraftHeading;