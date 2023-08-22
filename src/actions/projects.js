import { instance } from "./axios";
import { toast } from "react-toastify";

export const createProject = async (projectData) => {
  try {
    const response = await instance.post("/api/projects", {
      ...projectData,
      technologyStack: JSON.stringify(projectData.technologyStack),
    });
    toast.success("Project created successfully");
    return {
      ...response.data,
      technologyStack: JSON.parse(response.data.technologyStack),
    };
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project");
  }
};

export const getProject = async (projectId) => {
  try {
    const response = await instance.get(`/api/projects?id=${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting project:", error);
    throw new Error("Failed to get project");
  }
};

export const getAllProjects = async () => {
  try {
    const response = await instance.get("/api/projects");
    return response.data;
  } catch (error) {
    console.error("Error getting projects:", error);
    throw new Error("Failed to get projects");
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await instance.delete(`/api/projects/${projectId}`);
    toast.success("Project deleted successfully");
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete project");
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const response = await instance.put(`/api/projects/${projectId}`, {
      ...projectData,
      technologyStack: JSON.stringify(projectData.technologyStack),
    });
    toast.success("Project updated successfully");
    return {
      ...response.data,
      technologyStack: JSON.parse(response.data.technologyStack),
    };
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error("Failed to update project");
  }
};
