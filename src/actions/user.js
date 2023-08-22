import { instance } from "./axios";
import { toast } from "react-toastify";

export const createUser = async (userData) => {
  try {
    const response = await instance.post("/api/user", userData);
    toast.success("User created successfully");
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await instance.put(`/api/user/${userId}`, userData);
    toast.success("User updated successfully");
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await instance.delete(`/api/user/${userId}`);
    toast.success("User deleted successfully");
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};

export const getAllUsers = async () => {
  try {
    const response = await instance.get("/api/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to get users");
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await instance.get(`/api/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to get user");
  }
};
