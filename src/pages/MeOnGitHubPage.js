import { React } from "react";
import MeOnGitHub from "../components/MeOnGitHub";
import RepositoryList from "../components/RepositoryList";
import { MeOnGitHubContextProvider } from "../context/MeOnGitHubContextProvider";

const MeOnGitHubPage = () => {
  return (
    <MeOnGitHubContextProvider userName="dawidsadlik">
      <MeOnGitHub />
      <RepositoryList />
    </MeOnGitHubContextProvider>
  );
};

export default MeOnGitHubPage;
