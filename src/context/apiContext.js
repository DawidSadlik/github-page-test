import { useState, useEffect, createContext, useContext } from "react";

const Context = createContext({
  repositories: [],
  dashboardColor: undefined,
  setDashboardColor: () => {},
});

export const ApiContextProvider = ({ children, userName }) => {
  const [repositories, setRepositories] = useState([]);
  const [dashboardColor, setDashboardColor] = useState(undefined);
  const [selectedRepository, setSelectedRepository] = useState(0);
  useEffect(() => {
    fetch(`https://api.github.com/users/${userName}/repos`)
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, []);
  return (
    <Context.Provider
      value={{
        repositories,
        dashboardColor,
        setDashboardColor,
        selectedRepository,
        setSelectedRepository,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useApi = () => {
  return useContext(Context);
};
