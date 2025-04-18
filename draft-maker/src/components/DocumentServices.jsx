import React from 'react';
import './documentservice.css'; // Import the CSS file

export default function DocumentServices() {
  const documentTypes = [
    { id: 1, title: "Commercial Rental / Lease Agreement", type: "agreement" },
    { id: 2, title: "Residential Rental / Lease Agreement", type: "agreement" },
    { id: 3, title: "AFFIDAVITS", type: "affidavit" },
    { id: 4, title: "AFFIDAVITS", type: "affidavit" },
    { id: 5, title: "AFFIDAVITS", type: "affidavit" },
    { id: 6, title: "AFFIDAVITS", type: "affidavit" }
  ];

  return (
    <div className="services-container">
      <div className="services-content">
        <h1 className="services-heading">Easy Drafting Services</h1>
        <h2 className="services-subheading">for Popular Documents</h2>
        
        <p className="services-description">
          Lorem Ipsum is simply dummy text of the printing and typese tting indus
          orem Ipsum has been the standard dummy.
        </p>
        
        <div className="card-grid">
          {documentTypes.map((doc) => (
            <div key={doc.id} className="document-card">
              <div className="card-icon">
                <div className="icon-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v1H7V5zm6 3H7v1h6V8zm-6 3h6v1H7v-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <h3 className="card-title">
                {doc.title}
              </h3>
              
              {doc.type === "affidavit" && (
                <div className="affidavit-indicator"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// export default function DocumentServices() {
//   const documentTypes = [
//     { id: 1, title: "Commercial Rental / Lease Agreement", type: "agreement" },
//     { id: 2, title: "Residential Rental / Lease Agreement", type: "agreement" },
//     { id: 3, title: "AFFIDAVITS", type: "affidavit" },
//     { id: 4, title: "AFFIDAVITS", type: "affidavit" },
//     { id: 5, title: "AFFIDAVITS", type: "affidavit" },
//     { id: 6, title: "AFFIDAVITS", type: "affidavit" },
//   ];

//   return (
//     <div className="w-full bg-white p-8 font-sans">
//       <div className="max-w-5xl mx-auto text-center">
//         <h1 className="text-4xl font-bold text-red-600 mb-2">
//           Easy Drafting Services
//         </h1>
//         <h2 className="text-3xl font-bold text-red-600 mb-6">
//           for Popular Documents
//         </h2>

//         <p className="text-gray-500 mb-12 max-w-3xl mx-auto">
//           Lorem Ipsum is simply dummy text of the printing and typese tting
//           indus orem Ipsum has been the standard dummy.
//         </p>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           {documentTypes.map((doc) => (
//             <div
//               key={doc.id}
//               className="bg-white p-4 rounded shadow-sm flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:bg-red-50 hover:-translate-y-1 cursor-pointer"
//             >
//               <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4 transition-all duration-300 hover:bg-red-600">
//                 <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v1H7V5zm6 3H7v1h6V8zm-6 3h6v1H7v-1z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//               </div>

//               <h3 className="text-gray-600 text-center text-sm">{doc.title}</h3>

//               {doc.type === "affidavit" && (
//                 <div className="w-full h-1 bg-red-700 mt-2 rounded-sm"></div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
