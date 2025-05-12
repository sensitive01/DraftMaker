import { axiosInstance } from "../instance/axiosInstance";

export const verifyLogin = async (email,password) => {
  try {
    const response = await axiosInstance.post(`/admin/login`, {email,password
    });
    return response;
  } catch (err) {
    return err;
  }
};