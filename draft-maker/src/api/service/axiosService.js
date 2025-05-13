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
    const response = await axiosInstance.post(
      `/admin/change-password`,{formData}
    );
    return response;
  } catch (err) {
    return err;
  }
};
