export const transformTechnologiesToSearch = (data) => {
  return data.map((item) => ({
    value: item.name,
    key: item.id.toString(),
  }));
};

export const transformTechnologiesToSelect = (data) => {
  return data.map((item) => ({
    label: item.name,
    value: item.id.toString(),
  }));
};

export const transformProjectsToSearch = (data) => {
  return data.map((item) => ({
    value: item.projectName,
    key: item.id.toString(),
  }));
};

export const transformProjectsToSelect = (data) => {
  return data.map((item) => ({
    label: item.projectName,
    value: item.id.toString(),
  }));
};
