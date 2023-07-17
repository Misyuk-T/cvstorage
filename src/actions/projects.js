import axios from "axios";

const API_URL = "http://localhost:3000/api/projects";

export const createProject = async (projectData) => {
  try {
    const response = await axios.post(API_URL, {
      ...projectData,
      technologyStack: JSON.stringify(projectData.technologyStack),
    });
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project");
  }
};

export const getProject = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}?id=${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting project:", error);
    throw new Error("Failed to get project");
  }
};

export const getAllProjects = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error getting projects:", error);
    throw new Error("Failed to get projects");
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`${API_URL}?id=${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete project");
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const response = await axios.put(`${API_URL}?id=${projectId}`, projectData);
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error("Failed to update project");
  }
};
