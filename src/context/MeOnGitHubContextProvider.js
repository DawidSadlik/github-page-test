import { createContext, useContext, useEffect, useState } from "react";

const MeOnGitHubContext = createContext({
  user: undefined,
  repositories: [],
  currentRepository: undefined,
  setCurrentRepository: () => {},
});

export const MeOnGitHubContextProvider = ({ children, userName }) => {
  const [user, setUser] = useState(undefined);
  const [repositories, setRepositories] = useState([]);
  const [currentRepository, setCurrentRepository] = useState(undefined);

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${userName}`),
      fetch(`https://api.github.com/users/${userName}/repos`),
    ])
      .then(([userResponse, reposResponse]) => {
        Promise.all([userResponse.json(), reposResponse.json()])
          .then(([userData, reposData]) => {
            setRepositories(reposData);
            setUser(userData);
          })
          .catch((parsingError) => {});
      })
      .catch((fetchinError) => {});
  }, []);

  return (
    <MeOnGitHubContext.Provider
      value={{ user, repositories, currentRepository, setCurrentRepository }}
    >
      {children}
    </MeOnGitHubContext.Provider>
  );
};

export const useMeOnGitHubContextProvider = () => {
  return useContext(MeOnGitHubContext);
};
