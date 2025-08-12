import React, { useEffect, useState } from "react";
import { Plus, Edit, X, Check, AlertCircle, Trash2 } from "lucide-react";
import {
  createStampDuty,
  getStamDocumentDataAdmin,
  updateStampDutyData,
  updateStampStatus,
} from "../../../../api/service/axiosService";
import DeleteNotification from "./DeleteNotification";

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

const StampDutyTable = () => {
  const [stampDutyData, setStampDutyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isNotificationExiting, setIsNotificationExiting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [newItem, setNewItem] = useState({
    documentType: "",
    articleNo: "",
    calculationType: "fixed",
    fixedAmount: "",
    percentage: "",
    minAmount: "",
    maxAmount: "",
    specialNote: "",
    status: true,
  });

  useEffect(() => {
    const fetchStampData = async () => {
      try {
        setLoading(true);
        const response = await getStamDocumentDataAdmin();
        console.log("response", response);

        if (response?.data?.data) {
          const transformedData = response.data.data.map((item) => ({
            documentId: item._id,
            documentType: item.documentType,
            articleNo: item.articleNo,
            calculationType: item.calculationType,
            fixedAmount: item.fixedAmount,
            percentage: item.percentage,
            minAmount: item.minAmount,
            maxAmount: item.maxAmount,
            specialNote: "",
            status: item.status,
            amount: generateAmountFromApiData(item),
          }));

          setStampDutyData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching stamp data:", error);
        showNotification("Failed to fetch stamp duty data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchStampData();
  }, []);

  const generateAmountFromApiData = (item) => {
    if (item.calculationType === "fixed") {
      return `₹${item.fixedAmount} fixed`;
    } else {
      let percentage = item.percentage;
      if (percentage % 1 === 0) {
        percentage = Math.floor(percentage);
      }

      let text = `${percentage}% on consideration`;

      if (item.minAmount && item.maxAmount) {
        text += `, minimum stamp ₹${item.minAmount}, maximum stamp ₹${item.maxAmount}`;
      } else if (item.minAmount) {
        text += `, minimum stamp ₹${item.minAmount}`;
      } else if (item.maxAmount) {
        text += `, maximum stamp ₹${item.maxAmount}`;
      }

      return text;
    }
  };

  const generateAmount = (item) => {
    if (item.calculationType === "fixed") {
      let text = `₹${item.fixedAmount} fixed`;
      if (item.specialNote) {
        text += ` (${item.specialNote})`;
      }
      return text;
    } else {
      // Format percentage properly (remove trailing zeros)
      let percentage = item.percentage;
      if (percentage % 1 === 0) {
        percentage = Math.floor(percentage);
      }

      let text = `${percentage}% on consideration`;

      if (item.specialNote) {
        text += ` (${item.specialNote})`;
      }

      if (item.minAmount && item.maxAmount) {
        text += `, minimum stamp ₹${item.minAmount}, maximum stamp ₹${item.maxAmount}`;
      } else if (item.minAmount) {
        text += `, minimum stamp ₹${item.minAmount}`;
      } else if (item.maxAmount) {
        text += `, maximum stamp ₹${item.maxAmount}`;
      }

      return text;
    }
  };

  const formatDocumentType = (documentType) => {
    return documentType
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // New function to format document type with article number
  const formatDocumentTypeWithArticle = (documentType, articleNo) => {
    const formattedType = formatDocumentType(documentType);

    // Check if the document type already contains the article number
    if (
      formattedType.toLowerCase().includes(articleNo.toLowerCase()) ||
      formattedType.includes(`(${articleNo})`) ||
      formattedType.includes(`(Article`) ||
      formattedType.includes(`Article ${articleNo}`)
    ) {
      return formattedType;
    }

    const articlePrefix = articleNo.includes("(")
      ? "Article no."
      : "Article No.";
    return `${formattedType} (${articlePrefix} ${articleNo})`;
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
      articleNo: "",
      calculationType: "fixed",
      fixedAmount: "",
      percentage: "",
      minAmount: "",
      maxAmount: "",
      specialNote: "",
      status: true,
    });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setIsEditMode(true);
    setCurrentEditId(item.documentId);

    let cleanDocumentType = item.documentType;

    cleanDocumentType = cleanDocumentType
      .replace(/\s*\(Article\s+(No\.|no\.)\s*[^)]+\)/gi, "")
      .replace(/\s*Article\s+(No\.|no\.)\s*[^\s,]+/gi, "")
      .trim();

    setNewItem({
      documentType: cleanDocumentType,
      articleNo: item.articleNo,
      calculationType: item.calculationType,
      fixedAmount: item.fixedAmount ? item.fixedAmount.toString() : "",
      percentage: item.percentage ? item.percentage.toString() : "",
      minAmount: item.minAmount ? item.minAmount.toString() : "",
      maxAmount: item.maxAmount ? item.maxAmount.toString() : "",
      specialNote: item.specialNote || "",
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
      articleNo: "",
      calculationType: "fixed",
      fixedAmount: "",
      percentage: "",
      minAmount: "",
      maxAmount: "",
      specialNote: "",
      status: true,
    });
  };

  const handleInputChange = (field, value) => {
    if (field === "status") {
      setNewItem({
        ...newItem,
        [field]: value === "true",
      });
    } else if (field === "calculationType") {
      setNewItem({
        ...newItem,
        [field]: value,
        fixedAmount: "",
        percentage: "",
        minAmount: "",
        maxAmount: "",
      });
    } else {
      setNewItem({
        ...newItem,
        [field]: value,
      });
    }
  };

  const handleSubmit = async () => {
    if (newItem.documentType.trim() === "" || newItem.articleNo.trim() === "") {
      showNotification(
        "Please fill in document type and article number",
        "error"
      );
      return;
    }

    if (newItem.calculationType === "fixed" && newItem.fixedAmount === "") {
      showNotification("Please enter fixed amount", "error");
      return;
    }

    if (newItem.calculationType === "percentage" && newItem.percentage === "") {
      showNotification("Please enter percentage", "error");
      return;
    }

    try {
      const formattedItem = {
        documentType: formatDocumentTypeWithArticle(
          newItem.documentType,
          newItem.articleNo
        ),
        articleNo: newItem.articleNo,
        calculationType: newItem.calculationType,
        fixedAmount:
          newItem.calculationType === "fixed" ? Number(newItem.fixedAmount) : 0,
        percentage:
          newItem.calculationType === "percentage"
            ? Number(newItem.percentage)
            : 0,
        minAmount: newItem.minAmount ? Number(newItem.minAmount) : 0,
        maxAmount: newItem.maxAmount ? Number(newItem.maxAmount) : 0,
        specialNote: newItem.specialNote || "",
        status: newItem.status,
        documentId: newItem.documentId,
      };

      formattedItem.amount = generateAmount(formattedItem);

      if (isEditMode) {
        const updatedItems = stampDutyData.map((item) => {
          if (item.documentId === currentEditId) {
            return {
              ...item,
              ...formattedItem,
            };
          }
          return item;
        });
        const response = await updateStampDutyData(
          formattedItem,
          currentEditId
        );
        if (response.status === 200) {
          setStampDutyData(updatedItems);
          showNotification(response.data.message);
        }
      } else {
        const response = await createStampDuty(formattedItem);
        if (response.status === 201) {
          showNotification(
            response?.data?.message || "Stamp duty added successfully"
          );

          const newDocument = {
            ...response.data.data,
            amount: generateAmountFromApiData(response.data.data),
          };

          setStampDutyData([...stampDutyData, newDocument]);
        }
      }
      closeModal();
    } catch (error) {
      console.error("Error submitting stamp duty:", error);
      showNotification(
        isEditMode ? "Failed to update stamp duty" : "Failed to add stamp duty",
        "error"
      );
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      const updatedItems = stampDutyData.map((item) => {
        if (item.documentId === id) {
          return {
            ...item,
            status: updatedStatus,
          };
        }
        return item;
      });
      const response = await updateStampStatus(id, updatedStatus);
      if (response.status === 200) {
        setStampDutyData(updatedItems);
        showNotification(
          `Stamp duty ${updatedStatus ? "enabled" : "disabled"} successfully`
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
      setStampDutyData(
        stampDutyData.filter((item) => item.documentId !== deleteItemId)
      );
      showNotification("Stamp duty deleted successfully");
    } catch (error) {
      showNotification("Failed to delete stamp duty", "error");
    }
    closeDeleteConfirm();
  };

  if (loading) {
    return (
      <div className="space-y-6 p-6 bg-white rounded-lg">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-600 text-lg">Loading stamp duty data...</div>
        </div>
      </div>
    );
  }

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
        <h2 className="text-2xl font-bold text-red-900">
          Stamp Duty Information
        </h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus size={18} />
          Add New Stamp Duty
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
                  Amount
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-red-100">
              {stampDutyData.length > 0 ? (
                stampDutyData.map((duty, index) => (
                  <tr
                    key={duty.documentId}
                    className={`hover:bg-red-50 transition-colors duration-200 ${
                      !duty.status ? "bg-gray-50" : ""
                    }`}
                  >
                    <td className="p-3 whitespace-nowrap text-sm text-red-500">
                      {index + 1}
                    </td>
                    <td className="p-3 text-sm text-red-900">
                      {duty.documentType}
                    </td>
                    <td className="p-3 text-sm text-red-900">{duty.amount}</td>
                    <td className="p-3 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          duty.status
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {duty.status ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                          onClick={() => openEditModal(duty)}
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className={`p-1 rounded transition-colors ${
                            duty.status
                              ? "bg-red-100 text-red-600 hover:bg-red-200"
                              : "bg-green-100 text-green-600 hover:bg-green-200"
                          }`}
                          onClick={() =>
                            toggleStatus(duty.documentId, duty.status)
                          }
                          title={duty.status ? "Disable" : "Enable"}
                        >
                          {duty.status ? <X size={16} /> : <Check size={16} />}
                        </button>
                        {/* <button
                          className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                          onClick={() => openDeleteConfirm(duty.documentId)}
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
                  <td colSpan="5" className="p-3 text-center text-red-500">
                    No stamp duty information available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-red-100">
              <h3 className="text-xl font-bold text-red-900">
                {isEditMode ? "Edit Stamp Duty" : "Add New Stamp Duty"}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-red-600 mb-1">
                      Document Type *
                    </label>
                    <input
                      type="text"
                      value={newItem.documentType}
                      onChange={(e) =>
                        handleInputChange("documentType", e.target.value)
                      }
                      className="w-full p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter document type (e.g., Agreement, Bond)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-red-600 mb-1">
                      Article Number *
                    </label>
                    <input
                      type="text"
                      value={newItem.articleNo}
                      onChange={(e) =>
                        handleInputChange("articleNo", e.target.value)
                      }
                      className="w-full p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="e.g., 5(J), 4, 41(h)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-red-600 mb-1">
                    Calculation Type *
                  </label>
                  <select
                    value={newItem.calculationType}
                    onChange={(e) =>
                      handleInputChange("calculationType", e.target.value)
                    }
                    className="w-full p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="fixed">Fixed Amount</option>
                    <option value="percentage">
                      Percentage on Consideration
                    </option>
                  </select>
                </div>

                {newItem.calculationType === "fixed" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-red-600 mb-1">
                        Fixed Amount (₹) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={newItem.fixedAmount}
                        onChange={(e) =>
                          handleInputChange("fixedAmount", e.target.value)
                        }
                        className="w-full p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter fixed amount"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-red-600 mb-1">
                        Special Note (Optional)
                      </label>
                      <input
                        type="text"
                        value={newItem.specialNote}
                        onChange={(e) =>
                          handleInputChange("specialNote", e.target.value)
                        }
                        className="w-full p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="e.g., consideration, advance"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-red-600 mb-1">
                        Percentage (%) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={newItem.percentage}
                        onChange={(e) =>
                          handleInputChange("percentage", e.target.value)
                        }
                        className="w-full p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter percentage"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-red-600 mb-1">
                        Special Note (Optional)
                      </label>
                      <input
                        type="text"
                        value={newItem.specialNote}
                        onChange={(e) =>
                          handleInputChange("specialNote", e.target.value)
                        }
                        className="w-full p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="e.g., consideration, advance"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-red-600 mb-1">
                          Minimum Amount (₹)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={newItem.minAmount}
                          onChange={(e) =>
                            handleInputChange("minAmount", e.target.value)
                          }
                          className="w-full p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="Optional minimum amount"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-red-600 mb-1">
                          Maximum Amount (₹)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={newItem.maxAmount}
                          onChange={(e) =>
                            handleInputChange("maxAmount", e.target.value)
                          }
                          className="w-full p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="Optional maximum amount"
                        />
                      </div>
                    </div>
                  </div>
                )}

          
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
                  {isEditMode ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <DeleteNotification
          closeDeleteConfirm={closeDeleteConfirm}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default StampDutyTable;
