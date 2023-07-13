import axios from "axios";

const BASE_URL = "/api/user";

export const createUser = async (userData) => {
  try {
    const response = await axios.post(BASE_URL, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to create user");
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to update user");
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to delete user");
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to get users");
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to get user");
  }
};
