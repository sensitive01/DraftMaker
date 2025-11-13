import React from 'react'

const ImportantNotice = ({isImportantNoticeAccepted, setIsImportantNoticeAccepted, setShowImportantNoticePopup, formErrors}) => {
    return (
        <div className="bg-white mt-4 mb-4 rounded-lg overflow-hidden border border-gray-200">
            <div className="p-4">
                <div className="flex items-start space-x-3">
                    <input
                        type="checkbox"
                        id="importantNoticeCheckbox"
                        checked={isImportantNoticeAccepted}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setShowImportantNoticePopup(true);
                            } else {
                                setIsImportantNoticeAccepted(false);
                            }
                        }}
                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2 mt-1"
                    />
                    <div className="flex-1">
                        <label
                            htmlFor="importantNoticeCheckbox"
                            className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                            I have read and agree to the{" "}
                            <button
                                type="button"
                                onClick={() => setShowImportantNoticePopup(true)}
                                className="text-red-600 hover:text-red-700 underline font-medium"
                            >
                                Important Notice
                            </button>
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                            Please read the important notice before proceeding with
                            payment
                        </p>
                        {formErrors.importantNotice && (
                            <p className="text-red-500 text-sm mt-1">
                                {formErrors.importantNotice}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImportantNotice