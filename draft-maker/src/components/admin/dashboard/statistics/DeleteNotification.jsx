import { AlertCircle } from "lucide-react";
import React from "react";

const DeleteNotification = ({closeDeleteConfirm,handleDelete}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md mx-4 p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Delete Stamp Duty
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Are you sure you want to delete this stamp duty information? This
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
  );
};

export default DeleteNotification;
