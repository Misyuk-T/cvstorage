import axios from "axios";

const API_URL = "/api/projects";

export const createProject = async (projectData) => {
  try {
    const response = await axios.post(API_URL, {
      ...projectData,
      technologyStack: JSON.stringify(projectData.technologyStack),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to create project");
  }
};

export const getProject = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}?id=${projectId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to get project");
  }
};

export const getAllProjects = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to get projects");
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`${API_URL}?id=${projectId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to delete project");
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const response = await axios.put(`${API_URL}?id=${projectId}`, projectData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to update project");
  }
};
