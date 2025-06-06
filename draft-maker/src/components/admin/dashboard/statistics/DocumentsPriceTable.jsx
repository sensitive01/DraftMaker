import React, { useEffect, useState } from "react";
import { Plus, Edit, X, Check, AlertCircle, Trash2 } from "lucide-react";
import {
  createDocumentPrice,
  deleteDocumentPrice,
  getDocumentsPriceData,
  updateDocumentPrice,
} from "../../../../api/service/axiosService";

const notificationAnimationStyle = `
@keyframes slideIn {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideOut {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100%); opacity: 0; }
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out forwards;
}

.animate-slide-out {
  animation: slideOut 0.3s ease-in forwards;
}
`;

const DocumentPriceTable = () => {
  const [documentPrices, setDocumentPrices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isNotificationExiting, setIsNotificationExiting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [newItem, setNewItem] = useState({
    documentType: "",
    draftCharge: "",
    pdfCharge: "",
    homeDropCharge: "",
    hasDraftNotaryCharge: false,
    draftNotaryCharge: "",
    hasPdfNotaryCharge: false,
    pdfNotaryCharge: "",
    hasHomeDropNotaryCharge: false,
    homeDropNotaryCharge: "",
    status: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDocumentsPriceData();
        if (response.status === 200) {
          const formattedData = response.data.map((item) => ({
            ...item,
            status: item.status !== undefined ? item.status : true,
            hasDraftNotaryCharge: item.hasDraftNotaryCharge || false,
            draftNotaryCharge: item.draftNotaryCharge || 0,
            hasPdfNotaryCharge: item.hasPdfNotaryCharge || false,
            pdfNotaryCharge: item.pdfNotaryCharge || 0,
            hasHomeDropNotaryCharge: item.hasHomeDropNotaryCharge || false,
            homeDropNotaryCharge: item.homeDropNotaryCharge || 0,
          }));
          setDocumentPrices(formattedData);
        }
      } catch (error) {
        showNotification("Failed to load document prices", "error");
      }
    };
    fetchData();
  }, []);

  const formatDocumentType = (documentType) => {
    return documentType
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const showNotification = (message, type = "success") => {
    setNotification(null);

    setTimeout(() => {
      setNotification({ message, type });
    }, 100);

    setTimeout(() => {
      dismissNotification();
    }, 5000);
  };

  const dismissNotification = () => {
    setIsNotificationExiting(true);
    setTimeout(() => {
      setNotification(null);
      setIsNotificationExiting(false);
    }, 300);
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setNewItem({
      documentType: "",
      draftCharge: "",
      pdfCharge: "",
      homeDropCharge: "",
      hasDraftNotaryCharge: false,
      draftNotaryCharge: "",
      hasPdfNotaryCharge: false,
      pdfNotaryCharge: "",
      hasHomeDropNotaryCharge: false,
      homeDropNotaryCharge: "",
      status: true,
    });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setIsEditMode(true);
    setCurrentEditId(item._id);
    setNewItem({
      documentType: item.documentType,
      draftCharge: item.draftCharge.toString(),
      pdfCharge: item.pdfCharge.toString(),
      homeDropCharge: item.homeDropCharge.toString(),
      hasDraftNotaryCharge: item.hasDraftNotaryCharge || false,
      draftNotaryCharge: item.draftNotaryCharge
        ? item.draftNotaryCharge.toString()
        : "",
      hasPdfNotaryCharge: item.hasPdfNotaryCharge || false,
      pdfNotaryCharge: item.pdfNotaryCharge
        ? item.pdfNotaryCharge.toString()
        : "",
      hasHomeDropNotaryCharge: item.hasHomeDropNotaryCharge || false,
      homeDropNotaryCharge: item.homeDropNotaryCharge
        ? item.homeDropNotaryCharge.toString()
        : "",
      status: item.status !== undefined ? item.status : true,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setCurrentEditId(null);
    setNewItem({
      documentType: "",
      draftCharge: "",
      pdfCharge: "",
      homeDropCharge: "",
      hasDraftNotaryCharge: false,
      draftNotaryCharge: "",
      hasPdfNotaryCharge: false,
      pdfNotaryCharge: "",
      hasHomeDropNotaryCharge: false,
      homeDropNotaryCharge: "",
      status: true,
    });
  };

  const handleInputChange = (field, value) => {
    if (field === "status") {
      setNewItem({
        ...newItem,
        [field]: value === "true",
      });
    } else if (
      field === "hasDraftNotaryCharge" ||
      field === "hasPdfNotaryCharge" ||
      field === "hasHomeDropNotaryCharge"
    ) {
      let updates = { [field]: value };

      if (!value) {
        const chargeField = field.replace("has", "").toLowerCase();
        updates[chargeField] = "";
      }

      setNewItem({
        ...newItem,
        ...updates,
      });
    } else {
      setNewItem({
        ...newItem,
        [field]: value,
      });
    }
  };

  const handleSubmit = async () => {
    if (newItem.documentType.trim() === "" || newItem.draftCharge === "") {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    // if (newItem.hasDraftNotaryCharge && newItem.draftNotaryCharge === "") {
    //   showNotification("Please enter draft notary charge amount", "error");
    //   return;
    // }

    // if (newItem.hasPdfNotaryCharge && newItem.pdfNotaryCharge === "") {
    //   showNotification("Please enter PDF notary charge amount", "error");
    //   return;
    // }

    // if (
    //   newItem.hasHomeDropNotaryCharge &&
    //   newItem.homeDropNotaryCharge === ""
    // ) {
    //   showNotification("Please enter home drop notary charge amount", "error");
    //   return;
    // }

    try {
      const formattedItem = {
        ...newItem,
        documentType: formatDocumentType(newItem.documentType),
        draftCharge: Number(newItem.draftCharge),
        pdfCharge: Number(newItem.pdfCharge),
        homeDropCharge: Number(newItem.homeDropCharge),
        draftNotaryCharge: newItem.hasDraftNotaryCharge
          ? Number(newItem.draftNotaryCharge)
          : 0,
        pdfNotaryCharge: newItem.hasPdfNotaryCharge
          ? Number(newItem.pdfNotaryCharge)
          : 0,
        homeDropNotaryCharge: newItem.hasHomeDropNotaryCharge
          ? Number(newItem.homeDropNotaryCharge)
          : 0,
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
                ...formattedItem,
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

  const openDeleteConfirm = (id) => {
    setDeleteItemId(id);
    setShowDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setDeleteItemId(null);
    setShowDeleteConfirm(false);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteDocumentPrice(deleteItemId);
      if (response.status === 200) {
        setDocumentPrices(
          documentPrices.filter((item) => item._id !== deleteItemId)
        );
        showNotification("Document price deleted successfully");
      }
    } catch (error) {
      showNotification("Failed to delete document price", "error");
    }
    closeDeleteConfirm();
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg">
      <style>{notificationAnimationStyle}</style>

      {notification && (
        <div className="fixed top-5 right-5 left-5 md:left-auto md:w-96 z-50">
          <div
            className={`shadow-lg rounded-lg border-l-4 ${
              isNotificationExiting ? "animate-slide-out" : "animate-slide-in"
            } ${
              notification.type === "success"
                ? "bg-white border-green-500"
                : "bg-white border-red-500"
            }`}
          >
            <div className="flex p-4">
              <div
                className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full ${
                  notification.type === "success"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {notification.type === "success" ? (
                  <Check size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
              </div>
              <div className="ml-3 flex-1">
                <h3
                  className={`text-sm leading-5 font-medium ${
                    notification.type === "success"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {notification.type === "success" ? "Success" : "Error"}
                </h3>
                <p
                  className={`mt-1 text-sm leading-5 ${
                    notification.type === "success"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {notification.message}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={dismissNotification}
                  className={`inline-flex text-gray-400 hover:${
                    notification.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  } focus:outline-none`}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

      <div className="bg-white rounded-lg border border-red-100 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-50 border-b border-red-100">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Sl. No.
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Document Type
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Charges for Draft
                  <br />
                  (No E-Stamp Printed)
                </th>
                {/* <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Charges for PDF
                  <br />
                  (E-Stamp Printed)
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Charges for Home Drop
                  <br />
                  (E-Stamp Printed)
                </th> */}
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
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
                    <td className="p-3 whitespace-nowrap text-sm text-red-500">
                      {index + 1}
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm text-red-900">
                      {price.documentType}
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm text-red-900">
                      <div>
                        {price.draftCharge.toFixed(2)}
                        {price.hasDraftNotaryCharge && (
                          <div className="mt-1 flex items-center">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">
                              + Notary
                            </span>
                            {price.draftNotaryCharge.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </td>
                    {/* <td className="p-3 whitespace-nowrap text-sm text-red-900">
                      <div>
                        {price.pdfCharge.toFixed(2)}
                        {price.hasPdfNotaryCharge && (
                          <div className="mt-1 flex items-center">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">
                              + Notary
                            </span>
                            {price.pdfNotaryCharge.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm text-red-900">
                      <div>
                        {price.homeDropCharge.toFixed(2)}
                        {price.hasHomeDropNotaryCharge && (
                          <div className="mt-1 flex items-center">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">
                              + Notary
                            </span>
                            {price.homeDropNotaryCharge.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </td> */}
                    <td className="p-3 whitespace-nowrap text-sm">
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
                    <td className="p-3 whitespace-nowrap">
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
                        {/* <button
                          className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                          onClick={() => openDeleteConfirm(price._id)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-3 text-center text-red-500">
                    No document prices available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md w-full max-w-lg mx-4">
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

                <div className="border-t border-red-100 pt-4">
                  <label className="block text-sm font-medium text-red-600 mb-1">
                    Charges for Draft (No E-Stamp Printed)
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
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

                    <div className="flex items-center ml-2">
                      <input
                        id="hasDraftNotaryCharge"
                        type="checkbox"
                        checked={newItem.hasDraftNotaryCharge}
                        onChange={(e) =>
                          handleInputChange(
                            "hasDraftNotaryCharge",
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 text-red-600 focus:ring-red-500"
                      />
                      <label
                        htmlFor="hasDraftNotaryCharge"
                        className="ml-2 whitespace-nowrap text-sm font-medium text-red-600"
                      >
                        Add Notary Charge for Draft
                      </label>
                    </div>

                    {newItem.hasDraftNotaryCharge && (
                      <div className="w-24">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={newItem.draftNotaryCharge}
                          onChange={(e) =>
                            handleInputChange(
                              "draftNotaryCharge",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="0.00"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* <div className="border-t border-red-100 pt-4">
                  <label className="block text-sm font-medium text-red-600 mb-1">
                    Charges for PDF (E-Stamp Printed)
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
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

                    <div className="flex items-center ml-2">
                      <input
                        id="hasPdfNotaryCharge"
                        type="checkbox"
                        checked={newItem.hasPdfNotaryCharge}
                        onChange={(e) =>
                          handleInputChange(
                            "hasPdfNotaryCharge",
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 text-red-600 focus:ring-red-500"
                      />
                      <label
                        htmlFor="hasPdfNotaryCharge"
                        className="ml-2 whitespace-nowrap text-sm font-medium text-red-600"
                      >
                        Add Notary Charge for PDF
                      </label>
                    </div>

                    {newItem.hasPdfNotaryCharge && (
                      <div className="w-24">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={newItem.pdfNotaryCharge}
                          onChange={(e) =>
                            handleInputChange("pdfNotaryCharge", e.target.value)
                          }
                          className="w-full p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="0.00"
                        />
                      </div>
                    )}
                  </div>
                </div> */}

                {/* <div className="border-t border-red-100 pt-4">
                  <label className="block text-sm font-medium text-red-600 mb-1">
                    Charges for Home Drop (E-Stamp Printed)
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
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

                    <div className="flex items-center ml-2">
                      <input
                        id="hasHomeDropNotaryCharge"
                        type="checkbox"
                        checked={newItem.hasHomeDropNotaryCharge}
                        onChange={(e) =>
                          handleInputChange(
                            "hasHomeDropNotaryCharge",
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 text-red-600 focus:ring-red-500"
                      />
                      <label
                        htmlFor="hasHomeDropNotaryCharge"
                        className="ml-2 whitespace-nowrap text-sm font-medium text-red-600"
                      >
                        Add Notary Charge for Home Drop
                      </label>
                    </div>

                    {newItem.hasHomeDropNotaryCharge && (
                      <div className="w-24">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={newItem.homeDropNotaryCharge}
                          onChange={(e) =>
                            handleInputChange(
                              "homeDropNotaryCharge",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="0.00"
                        />
                      </div>
                    )}
                  </div>
                </div> */}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
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

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md w-full max-w-md mx-4 p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Delete Document Price
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete this document price? This action
                cannot be undone.
              </p>
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  onClick={closeDeleteConfirm}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
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
