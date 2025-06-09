import { axiosInstance } from "../instance/axiosInstance";

export const verifyLogin = async (email, password) => {
  try {
    const response = await axiosInstance.post(`/admin/login`, {
      email,
      password,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const getDocumentsPriceData = async () => {
  try {
    const response = await axiosInstance.get(
      `/document-price/get-all-document-price`
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createDocumentPrice = async (documents) => {
  try {
    const response = await axiosInstance.post(
      `/document-price/create-document-price`,
      { documents }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const updateDocumentPrice = async (docId, documents) => {
  try {
    const response = await axiosInstance.put(
      `/document-price/update-document-price/${docId}`,
      { documents }
    );
    return response;
  } catch (err) {
    return err;
  }
};
export const deleteDocumentPrice = async (docId) => {
  try {
    const response = await axiosInstance.delete(
      `/document-price/delete-document-price/${docId}`
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const changePassword = async (formData) => {
  try {
    const response = await axiosInstance.post(`/admin/change-password`, {
      formData,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const sendDualNameCorrectionData = async (formData) => {
  try {
    const response = await axiosInstance.post(
      `/documents/save-dual-name-correction-data`,
      { formData }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getDocumentName = async () => {
  try {
    const response = await axiosInstance.get(
      `/documents/get-documents-name-data`
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createDualNameChangeBooking = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/documents/create-dual-name-booking`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createDualNameChangePaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-dual-name-payment-data`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getAllBookingData = async () => {
  try {
    const response = await axiosInstance.get(`/documents/get-all-booking-data`);
    return response;
  } catch (err) {
    return err;
  }
};

export const sendNameCorrectionData = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/documents/save-name-correction-data`,
      { document }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createNameChangePaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-name-correction-payment-data`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const sendDobCorrectionData = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/documents/save-dob-correction-data`,
      { document }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createDobCorrectionPaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-dob-correction-payment-data`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const sendGasCorrectionData = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/documents/save-gas-correction-data`,
      { document }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createGassAffadavitPaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-gas-correction-payment-data`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const sendDocumentLostData = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/documents/save-document-lost-data`,
      { document }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createDocumentLostPaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-document-lost-payment-data`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const dobParentNameCorrectionData = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/documents/save-dob-parent-name-correction`,
      { document }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createDobParentNameCorrectionPaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-dob-parent-name-correction`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const birthCerticateNameCorrectionData = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/documents/save-birth-certificate-name-correction`,
      { document }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const birthCerticateNameCorrectionPaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-birth-certificate-name-correction`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const sendGstCorrectionData = async (document) => {
  try {
    const response = await axiosInstance.post(`/documents/save-gst-data`, {
      document,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const gstPaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-gst-payment-data`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const sendMetriculationLostData = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/documents/save-metriculation-lost-data`,
      { document }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createMetriculationLostPaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-metriculation-lost-payment-data`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const sendKhataCorrectionData = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/documents/save-khata-corrcetion-data`,
      { document }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const updateKhataCorrectionPaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-khata-correction-payment-data`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const sendVehicleInsurenceData = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/documents/save-vehicle-insurence-data`,
      { document }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createVehicleInsurencePaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-vehicle-insurence-payment-data`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const sendHufData = async (document) => {
  try {
    const response = await axiosInstance.post(`/documents/save-huf-data`, {
      document,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const createHufPaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-huf-payment-data`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const sendGapPeriodData = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/documents/save-gap-period-data`,
      { document }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createGapPeriodPaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-gap-period-payment-data`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const sendPasswordAnnaxureData = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/documents/save-password-annaxure-data`,
      { document }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createPasswordAnnaxurePaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-password-annaxure-payment-data`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const sendPassportNameChangeData = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/documents/save-passport-name-change-data`,
      { document }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createPassportnameChangePaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-passport-name-change-payment-data`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const sendAddressAffadavitData = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/documents/save-adress-affadavit-data`,
      { document }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createAddressAffadavitPaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-adress-affadavit-payment-data`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const sendCommercialData = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/documents/save-commercial-data`,
      { document }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createCommercialPaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-commercial-payment-data`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const sendRecidentailData = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/documents/save-recidential-data`,
      { document }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createRecidentailPaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-recidential-payment-data`,
      { data }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getAggrementFormData = async (bookingId) => {
  try {
    const response = await axiosInstance.get(
      `/documents/get-aggrement-preview-data/${bookingId}`
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const updateBookingStatus = async (bookingId,status) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-booking-status/${bookingId}`,{status}
    );
    return response;
  } catch (err) {
    return err;
  }
};


export const getDashboardStatistics = async () => {
  try {
    const response = await axiosInstance.get(
      `/documents/get-dashboard-statistics`
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createStampDuty = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/document-price/create-stamp-duty-price`,{document}
    );
    return response;
  } catch (err) {
    return err;
  }
};
export const getStamDocumentData = async () => {
  try {
    const response = await axiosInstance.get(
      `/document-price/get-stamp-duty-price`
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const updateStampDutyData = async (documentData,documentId) => {
  try {
    const response = await axiosInstance.put(
      `/document-price/update-stamp-duty-price/${documentId}`,{documentData}
    );
    return response;
  } catch (err) {
    return err;
  }
};
export const updateStampStatus = async (documentId, currentStatus) => {
  try {
    const response = await axiosInstance.put(
      `/document-price/update-stamp-duty-status/${documentId}`,{currentStatus}
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getDeliveryChargeData = async () => {
  try {
    const response = await axiosInstance.get(
      `/document-price/get-delivery-charge-price`
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createDelivaryCharge = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/document-price/create-delivery-charge-price`,{document}
    );
    return response;
  } catch (err) {
    return err;
  }
};


export const updateDelivaryCharge = async (documentData,documentId) => {
  try {
    const response = await axiosInstance.put(
      `/document-price/update-delivery-charge-price/${documentId}`,{documentData}
    );
    return response;
  } catch (err) {
    return err;
  }
}

export const updateDeliveryPriceStatus = async (documentId, currentStatus) => {
  try {
    const response = await axiosInstance.put(
      `/document-price/update-delivery-charge-status/${documentId}`,{currentStatus}
    );
    return response;
  } catch (err) {
    return err;
  }
};


export const getStampAndDeliveryCharges = async () => {
  try {
    const response = await axiosInstance.get(
      `/document-price/get-stamp-delivery-price-data`
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const sendTheEstampData = async (orderData) => {
  try {
    const response = await axiosInstance.post(
      `/document-price/save-estamp-data`,{orderData}
    );
    return response;
  } catch (err) {
    return err;
  }
};


