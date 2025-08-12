import React, { useEffect, useState } from "react";
import { Plus, Edit, X, Check, AlertCircle, Trash2 } from "lucide-react";
import {
  createDelivaryCharge,
  getDeliveryChargeDataAdmin,
  updateDelivaryCharge,
  updateDeliveryPriceStatus,
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

const DeliveryChargesTable = () => {
  const [deliveryData, setDeliveryData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isNotificationExiting, setIsNotificationExiting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [newItem, setNewItem] = useState({
    serviceName: "",
    description: "",
    charge: "",
    serviceType: "scan_delivery",
    status: true,
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDeliveryChargeDataAdmin();
        console.log("API Response:", response); // Debug log

        if (response.status == 200) {
          setDeliveryData(response.data.data);
        }
 
      } catch (error) {
        console.error("Error fetching delivery charges:", error);
        showNotification("Failed to fetch delivery charges", "error");
      }
    };
    fetchData();
  }, []);

  const serviceTypeOptions = [
    { value: "scan_delivery", label: "Scan & Delivery" },
    { value: "scan_courier", label: "Scan & Courier" },
    { value: "courier_only", label: "Courier Only" },
    { value: "express", label: "Express Service" },
  ];

  const formatServiceName = (serviceName) => {
    return serviceName
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
      serviceName: "",
      description: "",
      charge: "",
      serviceType: "scan_delivery",
      status: true,
    });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setIsEditMode(true);
    setCurrentEditId(item._id);
    setNewItem({
      serviceName: item.serviceName || "",
      description: item.description || "",
      charge: item.charge ? item.charge.toString() : "",
      serviceType: item.serviceType || "scan_delivery",
      status: item.status !== undefined ? item.status : true,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setCurrentEditId(null);
    setNewItem({
      serviceName: "",
      description: "",
      charge: "",
      serviceType: "scan_delivery",
      status: true,
    });
  };

  const handleInputChange = (field, value) => {
    console.log(`Updating ${field} with value:`, value); // Debug log

    if (field === "status") {
      setNewItem((prev) => ({
        ...prev,
        [field]: value === "true" || value === true,
      }));
    } else {
      setNewItem((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting form with data:", newItem); // Debug log

    // Validation
    if (!newItem.serviceName || newItem.serviceName.trim() === "") {
      showNotification("Please enter a service name", "error");
      return;
    }

    if (!newItem.charge || newItem.charge === "") {
      showNotification("Please enter a charge amount", "error");
      return;
    }

    const chargeNum = Number(newItem.charge);
    if (isNaN(chargeNum) || chargeNum <= 0) {
      showNotification("Please enter a valid charge amount", "error");
      return;
    }

    try {
      const formattedItem = {
        serviceName: formatServiceName(newItem.serviceName.trim()),
        description: newItem.description ? newItem.description.trim() : "",
        charge: chargeNum,
        serviceType: newItem.serviceType,
        status: newItem.status,
      };

      console.log("Formatted item for API:", formattedItem,currentEditId); // Debug log

      if (isEditMode) {
        const response = await updateDelivaryCharge(
          formattedItem,
          currentEditId
        );
        console.log("Update response:", response); // Debug log

        if (response && (response.status === 200 || response.status === 201)) {
          // Update local state
          const updatedItems = deliveryData.map((item) => {
            if (item._id === currentEditId) {
              return {
                ...item,
                ...formattedItem,
              };
            }
            return item;
          });
          setDeliveryData(updatedItems);
          showNotification(
            response.data?.message || "Service updated successfully"
          );
        } else {
          throw new Error("Update failed");
        }
      } else {
        const response = await createDelivaryCharge(formattedItem);
        console.log("Create response:", response); // Debug log

        if (response && (response.status === 200 || response.status === 201)) {
          // Create new service with response data or fallback
          const newService = {
            _id:
              response.data?.id || response.data?._id || Date.now().toString(),
            ...formattedItem,
            // Include any additional fields from response
            ...(response.data && typeof response.data === "object"
              ? response.data
              : {}),
          };

          setDeliveryData((prev) => [...prev, newService]);
          showNotification(
            response.data?.message || "Service added successfully"
          );
        } else {
          throw new Error("Creation failed");
        }
      }
      closeModal();
    } catch (error) {
      console.error("API Error:", error); // Debug log
      showNotification(
        isEditMode
          ? "Failed to update delivery charge"
          : "Failed to add delivery charge",
        "error"
      );
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      const response = await updateDeliveryPriceStatus(id, updatedStatus);

      if ( response.status === 200) {
        const updatedItems = deliveryData.map((item) => {
          if (item._id === id) {
            return {
              ...item,
              status: updatedStatus,
            };
          }
          return item;
        });
        setDeliveryData(updatedItems);
        showNotification(
          `Delivery service ${
            updatedStatus ? "enabled" : "disabled"
          } successfully`
        );
      }
    } catch (error) {
      console.error("Status update error:", error);
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
      // You should add a delete API call here
      // const response = await deleteDelivaryCharge(deleteItemId);

      setDeliveryData(deliveryData.filter((item) => item._id !== deleteItemId));
      showNotification("Delivery charge deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      showNotification("Failed to delete delivery charge", "error");
    }
    closeDeleteConfirm();
  };

  const getServiceTypeLabel = (type) => {
    const option = serviceTypeOptions.find((opt) => opt.value === type);
    return option ? option.label : type;
  };

  return (
    <div className="space-y-8 p-8 bg-white rounded-lg">
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
          Delivery Charges Management
        </h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus size={18} />
          Add New Service
        </button>
      </div>

      <div className="bg-white rounded-lg border border-red-100 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-red-50 border-b-2 border-red-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-red-600 uppercase tracking-wider w-20">
                  Sl. No.
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-red-600 uppercase tracking-wider min-w-48">
                  Service Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-red-600 uppercase tracking-wider min-w-64">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-red-600 uppercase tracking-wider w-32">
                  Charge (₹)
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-red-600 uppercase tracking-wider w-36">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-red-600 uppercase tracking-wider w-24">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-red-600 uppercase tracking-wider w-32">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y-2 divide-red-50">
              {deliveryData.length > 0 ? (
                deliveryData.map((service, index) => (
                  <tr
                    key={service._id}
                    className={`hover:bg-red-25 transition-colors duration-200 ${
                      !service.status ? "bg-gray-50" : ""
                    }`}
                  >
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-red-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-5 text-sm text-red-900 font-semibold">
                      <div className="max-w-48 break-words">
                        {service.serviceName}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-red-800">
                      <div
                        className="max-w-64 break-words leading-relaxed"
                        title={service.description}
                      >
                        {service.description || "No description"}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-red-900 font-bold whitespace-nowrap">
                      ₹{service.charge ? service.charge.toFixed(2) : "0.00"}
                    </td>
                    <td className="px-6 py-5 text-sm text-red-800">
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium whitespace-nowrap">
                        {getServiceTypeLabel(service.serviceType)}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          service.status
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {service.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <button
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          onClick={() => openEditModal(service)}
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className={`p-2 rounded-lg transition-colors ${
                            service.status
                              ? "bg-red-100 text-red-600 hover:bg-red-200"
                              : "bg-green-100 text-green-600 hover:bg-green-200"
                          }`}
                          onClick={() =>
                            toggleStatus(service._id, service.status)
                          }
                          title={service.status ? "Deactivate" : "Activate"}
                        >
                          {service.status ? (
                            <X size={16} />
                          ) : (
                            <Check size={16} />
                          )}
                        </button>
                        {/* <button
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          onClick={() => openDeleteConfirm(service._id)}
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
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-red-500 text-lg"
                  >
                    No delivery services available
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
            <div className="flex justify-between items-center p-6 border-b border-red-100">
              <h3 className="text-xl font-bold text-red-900">
                {isEditMode
                  ? "Edit Delivery Service"
                  : "Add New Delivery Service"}
              </h3>
              <button
                onClick={closeModal}
                className="text-red-500 hover:text-red-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-red-600 mb-2">
                      Service Name *
                    </label>
                    <input
                      type="text"
                      value={newItem.serviceName}
                      onChange={(e) =>
                        handleInputChange("serviceName", e.target.value)
                      }
                      className="w-full p-3 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter service name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-red-600 mb-2">
                      Service Type *
                    </label>
                    <select
                      value={newItem.serviceType}
                      onChange={(e) =>
                        handleInputChange("serviceType", e.target.value)
                      }
                      className="w-full p-3 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      {serviceTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className="w-full p-3 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter service description"
                    rows="3"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-red-600 mb-2">
                      Charge (₹) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newItem.charge}
                      onChange={(e) =>
                        handleInputChange("charge", e.target.value)
                      }
                      className="w-full p-3 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter charge amount"
                    />
                  </div>

                  
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  {isEditMode ? "Update" : "Add"}
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
                Delete Delivery Service
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete this delivery service? This
                action cannot be undone.
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

export default DeliveryChargesTable;
