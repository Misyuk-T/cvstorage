import axios from "axios";

const BASE_URL = "http://localhost:3000/api/technologies";

export const createTechnology = async (technologyData) => {
  try {
    const response = await axios.post(BASE_URL, technologyData);
    return response.data;
  } catch (error) {
    console.error("Error creating technology:", error);
    throw new Error("Failed to create technology");
  }
};

export const getAllTechnologies = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching technologies:", error);
    throw new Error("Failed to get technologies");
  }
};

export const updateTechnology = async (id, name, type) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, {
      name,
      type,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating technology:", error);
    throw new Error("Failed to update technology");
  }
};

export const getTechnologyById = async (technologyId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${technologyId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching technology:", error);
    throw new Error("Failed to get technology");
  }
};

export const deleteTechnology = async (technologyId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${technologyId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting technology:", error);
    throw new Error("Failed to delete technology");
  }
};
