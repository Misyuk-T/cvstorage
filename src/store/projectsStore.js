import { create } from "zustand";

const useProjectsStore = create((set) => ({
  projects: [],

  setProjects: (projects) => set({ projects }),
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (updatedProject) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === updatedProject.id
          ? { ...project, ...updatedProject }
          : project,
      ),
    })),
  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== projectId),
    })),
}));

export default useProjectsStore;
