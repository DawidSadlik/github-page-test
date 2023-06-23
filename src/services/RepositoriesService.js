export const getRepositoriesForUser = async (userName) => {
  try {
    const response = await fetch(`https://github.com/users/${userName}/repos`);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
