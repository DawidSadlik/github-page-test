import { React } from "react";
import { useMeOnGitHubContextProvider } from "../context/MeOnGitHubContextProvider";

const RepositoryList = () => {
  const { repositories } = useMeOnGitHubContextProvider();
  return (
    <>
      <ul>
        {repositories && repositories.map((repo) => <li>{repo.name}</li>)}
      </ul>
    </>
  );
};
export default RepositoryList;
