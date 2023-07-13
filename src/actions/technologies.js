import axios from "axios";

const BASE_URL = "/api/technologies";

export const createTechnology = async (technologyData) => {
  try {
    const response = await axios.post(BASE_URL, technologyData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getAllTechnologies = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getTechnologyById = async (technologyId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${technologyId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const deleteTechnology = async (technologyId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${technologyId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
