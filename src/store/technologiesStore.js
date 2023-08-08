import { create } from "zustand";

const useTechnologiesStore = create((set) => ({
  technologies: [],

  setTechnologies: (technologies) => set({ technologies }),
  addTechnology: (technology) =>
    set((state) => ({ technologies: [...state.technologies, technology] })),
  updateTechnology: (updatedTechnology) =>
    set((state) => ({
      technologies: state.technologies.map((technology) =>
        technology.id === updatedTechnology.id
          ? { ...technology, ...updatedTechnology }
          : technology,
      ),
    })),
  deleteTechnology: (technologyId) =>
    set((state) => ({
      technologies: state.technologies.filter(
        (technology) => technology.id !== technologyId,
      ),
    })),
}));

export default useTechnologiesStore;
