import { instance } from "./axios";
import { toast } from "react-toastify";

export const createTechnology = async (technologyData) => {
  try {
    const response = await instance.post("/api/technologies", technologyData);
    toast.success("Technology created successfully");
    return response.data;
  } catch (error) {
    console.error("Error creating technology:", error);
    throw new Error("Failed to create technology");
  }
};

export const getAllTechnologies = async () => {
  try {
    const response = await instance.get("/api/technologies");
    return response.data;
  } catch (error) {
    console.error("Error fetching technologies:", error);
    throw new Error("Failed to get technologies");
  }
};

export const updateTechnology = async (id, name, type) => {
  try {
    const response = await instance.put(`/api/technologies/${id}`, {
      name,
      type,
    });
    toast.success("Technology updated successfully");
    return response.data;
  } catch (error) {
    console.error("Error updating technology:", error);
    throw new Error("Failed to update technology");
  }
};

export const getTechnologyById = async (technologyId) => {
  try {
    const response = await instance.get(`/api/technologies/${technologyId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching technology:", error);
    throw new Error("Failed to get technology");
  }
};

export const deleteTechnology = async (technologyId) => {
  try {
    const response = await instance.delete(`/api/technologies/${technologyId}`);
    toast.success("Technology deleted successfully");
    return response.data;
  } catch (error) {
    console.error("Error deleting technology:", error);
    throw new Error("Failed to delete technology");
  }
};
