import { React } from "react";
import MeOnGitHub from "../components/MeOnGitHub";
import RepositoryList from "../components/RepositoryList";
import RepositoryProperties from "../components/RepositoryProperties";
import { MeOnGitHubContextProvider } from "../context/MeOnGitHubContextProvider";

const MeOnGitHubPage = () => {
  return (
    <MeOnGitHubContextProvider userName="dawidsadlik">
      <h1>Me on github</h1>
      <MeOnGitHub />
      <RepositoryList />
      <RepositoryProperties />
    </MeOnGitHubContextProvider>
  );
};

export default MeOnGitHubPage;
