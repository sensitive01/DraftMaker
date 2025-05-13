import React, { useEffect, useState } from "react";
import { Plus, Edit, X, Check, AlertCircle } from "lucide-react";
import {
  createDocumentPrice,
  deleteDocumentPrice,
  getDocumentsPriceData,
  updateDocumentPrice,
} from "../../../../api/service/axiosService";

const DocumentPriceTable = () => {
  const [documentPrices, setDocumentPrices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newItem, setNewItem] = useState({
    documentType: "",
    draftCharge: "",
    pdfCharge: "",
    homeDropCharge: "",
    status: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDocumentsPriceData();
        if (response.status === 200) {
          // Ensure status property exists on all items
          const formattedData = response.data.map((item) => ({
            ...item,
            status: item.status !== undefined ? item.status : true,
          }));
          setDocumentPrices(formattedData);
        }
      } catch (error) {
        showNotification("Failed to load document prices", "error");
      }
    };
    fetchData();
  }, []);

  // Format document type with proper capitalization
  const formatDocumentType = (documentType) => {
    return documentType
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setNewItem({
      documentType: "",
      draftCharge: "",
      pdfCharge: "",
      homeDropCharge: "",
      status: true,
    });
    setShowModal(true);
  };

  // Open edit modal
  const openEditModal = (item) => {
    setIsEditMode(true);
    setCurrentEditId(item._id);
    setNewItem({
      documentType: item.documentType,
      draftCharge: item.draftCharge.toString(),
      pdfCharge: item.pdfCharge.toString(),
      homeDropCharge: item.homeDropCharge.toString(),
      status: item.status !== undefined ? item.status : true,
    });
    setShowModal(true);
  };

  // Close modal and reset state
  const closeModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setCurrentEditId(null);
    setNewItem({
      documentType: "",
      draftCharge: "",
      pdfCharge: "",
      homeDropCharge: "",
      status: true,
    });
  };

  // Handle input changes in the modal form
  const handleInputChange = (field, value) => {
    if (field === "status") {
      setNewItem({
        ...newItem,
        [field]: value === "true", // Convert string to boolean
      });
    } else {
      setNewItem({
        ...newItem,
        [field]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate inputs
    if (
      newItem.documentType.trim() === "" ||
      newItem.draftCharge === "" ||
      newItem.pdfCharge === "" ||
      newItem.homeDropCharge === ""
    ) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    try {
      // Format document type
      const formattedItem = {
        ...newItem,
        documentType: formatDocumentType(newItem.documentType),
      };

      if (isEditMode) {
        const response = await updateDocumentPrice(
          currentEditId,
          formattedItem
        );
        if (response.status === 200) {
          const updatedItems = documentPrices.map((item) => {
            if (item._id === currentEditId) {
              return {
                ...item,
                documentType: formattedItem.documentType,
                draftCharge: Number(formattedItem.draftCharge),
                pdfCharge: Number(formattedItem.pdfCharge),
                homeDropCharge: Number(formattedItem.homeDropCharge),
                status: formattedItem.status,
              };
            }
            return item;
          });
          setDocumentPrices(updatedItems);
          showNotification("Document price updated successfully");
        }
      } else {
        const response = await createDocumentPrice(formattedItem);
        if (response.status === 201 || response.status === 200) {
          // Assuming the API returns the created document with an ID
          const newDocument = response.data;
          setDocumentPrices([...documentPrices, newDocument]);
          showNotification("Document price added successfully");
        }
      }
      closeModal();
    } catch (error) {
      showNotification(
        isEditMode
          ? "Failed to update document price"
          : "Failed to add document price",
        "error"
      );
    }
  };

  // Toggle status
  const toggleStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      const response = await updateDocumentPrice(id, { status: updatedStatus });

      if (response.status === 200) {
        const updatedItems = documentPrices.map((item) => {
          if (item._id === id) {
            return {
              ...item,
              status: updatedStatus,
            };
          }
          return item;
        });
        setDocumentPrices(updatedItems);
        showNotification(
          `Document ${updatedStatus ? "enabled" : "disabled"} successfully`
        );
      }
    } catch (error) {
      showNotification("Failed to update status", "error");
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg">
      {/* Notification */}
      {notification && (
        <div
          className={`p-4 rounded-lg flex items-center justify-between ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <div className="flex items-center">
            {notification.type === "success" ? (
              <Check size={20} className="mr-2" />
            ) : (
              <AlertCircle size={20} className="mr-2" />
            )}
            <p>{notification.message}</p>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Document Prices Header with Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-red-900">Document Prices</h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus size={18} />
          Add New Document
        </button>
      </div>

      {/* Document Prices Table */}
      <div className="bg-white rounded-lg border border-red-100 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-50 border-b border-red-100">
              <tr>
                <th className="p-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Sl. No.
                </th>
                <th className="p-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Document Type
                </th>
                <th className="p-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Charges for Draft
                  <br />
                  (No E-Stamp Printed)
                </th>
                <th className="p-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Charges for PDF
                  <br />
                  (E-Stamp Printed)
                </th>
                <th className="p-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Charges for Home Drop
                  <br />
                  (E-Stamp Printed)
                </th>
                <th className="p-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-red-100">
              {documentPrices.length > 0 ? (
                documentPrices.map((price, index) => (
                  <tr
                    key={price._id}
                    className={`hover:bg-red-50 transition-colors duration-200 ${
                      !price.status ? "bg-gray-50" : ""
                    }`}
                  >
                    <td className="p-4 whitespace-nowrap text-sm text-red-500">
                      {index + 1}
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm text-red-900">
                      {price.documentType}
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm text-red-900">
                      {price.draftCharge.toFixed(2)}
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm text-red-900">
                      {price.pdfCharge.toFixed(2)}
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm text-red-900">
                      {price.homeDropCharge.toFixed(2)}
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          price.status
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {price.status ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                          onClick={() => openEditModal(price)}
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className={`p-1 rounded transition-colors ${
                            price.status
                              ? "bg-red-100 text-red-600 hover:bg-red-200"
                              : "bg-green-100 text-green-600 hover:bg-green-200"
                          }`}
                          onClick={() => toggleStatus(price._id, price.status)}
                          title={price.status ? "Disable" : "Enable"}
                        >
                          {price.status ? <X size={16} /> : <Check size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-red-500">
                    No document prices available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Document Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md w-full max-w-lg mx-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-red-100">
              <h3 className="text-xl font-bold text-red-900">
                {isEditMode ? "Edit Document Price" : "Add New Document Price"}
              </h3>
              <button
                onClick={closeModal}
                className="text-red-500 hover:text-red-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {/* Document Type */}
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-1">
                    Document Type
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={newItem.documentType}
                      onChange={(e) =>
                        handleInputChange("documentType", e.target.value)
                      }
                      className="w-full p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter document type"
                    />
                  </div>
                </div>

                {/* Draft Charge */}
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-1">
                    Charges for Draft (No E-Stamp Printed)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newItem.draftCharge}
                      onChange={(e) =>
                        handleInputChange("draftCharge", e.target.value)
                      }
                      className="w-full p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* PDF Charge */}
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-1">
                    Charges for PDF (E-Stamp Printed)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newItem.pdfCharge}
                      onChange={(e) =>
                        handleInputChange("pdfCharge", e.target.value)
                      }
                      className="w-full p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Home Drop Charge */}
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-1">
                    Charges for Home Drop (E-Stamp Printed)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newItem.homeDropCharge}
                      onChange={(e) =>
                        handleInputChange("homeDropCharge", e.target.value)
                      }
                      className="w-full p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Status - Added status selection in modal */}
                {isEditMode && (
                  <div>
                    <label className="block text-sm font-medium text-red-600 mb-1">
                      Status
                    </label>
                    <select
                      value={newItem.status.toString()}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      className="w-full p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="true">Enabled</option>
                      <option value="false">Disabled</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentPriceTable;