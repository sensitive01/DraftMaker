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
      `/documents/create-dual-name-booking`,{data}
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createDualNameChangePaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-dual-name-payment-data`,{data}
    );
    return response;
  } catch (err) {
    return err;
  }
};


export const getAllBookingData = async () => {
  try {
    const response = await axiosInstance.get(
      `/documents/get-all-booking-data`,
    );
    return response;
  } catch (err) {
    return err;
  }
};


export const sendNameCorrectionData = async (document) => {
  try {
    const response = await axiosInstance.post(
      `/documents/save-name-correction-data`,{document}
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createNameChangePaymentData = async (data) => {
  try {
    const response = await axiosInstance.put(
      `/documents/update-name-correction-payment-data`,{data}
    );
    return response;
  } catch (err) {
    return err;
  }
};