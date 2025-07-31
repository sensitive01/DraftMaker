import React from "react";
import {
  FileText,
  Home,
  FileSignature,
  FilePlus,
  CalendarCheck,
  UserCheck,
  Car,
  FileSearch,
  FileCog,
  FileEdit,
  FileInput,
  FileOutput,
  FileQuestion,
} from "lucide-react";
import { Link } from "react-router-dom";

// Replace these icons with Lucide icons that make sense per item
const documentTypes = [
  {
    id: 1,
    title: "E Stamp",
    subtitle: "Electronic stamp paper services",
    path: "/services/e-stamp",
    icon: FileText,
  },
  {
    id: 2,
    title: "Rental Agreement",
    subtitle: "Create your rental agreements",
    path: "/services/rental-agreement",
    icon: Home,
  },
  {
    id: 3,
    title: "Affidavits",
    subtitle: "Draft and notarize affidavits",
    path: "/services/affidavits",
    icon: FileSignature,
  },
  {
    id: 4,
    title: "Notary",
    subtitle: "Notary attestation services",
    path: "/services/notary",
    icon: FilePlus,
  },
  {
    id: 5,
    title: "Pan Card",
    subtitle: "Apply or update PAN card",
    path: "/services/pan-card",
    icon: UserCheck,
  },
  {
    id: 6,
    title: "Passport",
    subtitle: "New passport & corrections",
    path: "/services/passport",
    icon: FileSearch,
  },
  {
    id: 7,
    title: "Police Verification Certificate",
    subtitle: "Background verification",
    path: "/services/police-verification",
    icon: FileInput,
  },
  {
    id: 8,
    title: "PVC ID Cards & Lamination",
    subtitle: "Print & laminate ID cards",
    path: "/services/pvc-id-cards",
    icon: FileOutput,
  },
  {
    id: 9,
    title: "Jeevan Pramaan Certificate",
    subtitle: "Digital life certificate for pensioners",
    path: "/services/jeevan-pramaan",
    icon: CalendarCheck,
  },
  {
    id: 10,
    title: "Voter ID New & Correction",
    subtitle: "Apply or correct voter ID",
    path: "/services/voter-id",
    icon: FileEdit,
  },
];

const WhatWeDo = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          <span className="text-red-600"  >Walk In </span>Services
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {documentTypes.map((doc) => {
          const Icon = doc.icon;
          return (
            <Link
              // to={doc.path}
              key={doc.id}
              className="flex flex-col items-center text-center p-4 rounded-lg border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 bg-white"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-3 border-2"
                style={{
                  borderColor: "#770000",
                  backgroundColor: "white",
                }}
              >
                <Icon size={28} style={{ color: "#770000" }} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {doc.title}
              </h3>
              <p className="text-sm text-gray-600">{doc.subtitle}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WhatWeDo;
