import { React } from "react";
import MeOnGitHub from "../components/MeOnGitHub";
import { MeOnGitHubContextProvider } from "../context/MeOnGitHubContextProvider";
import RepositoryList from "../components/RepositoryList";

export const MicrosoftOnGithubPage = () => {
  return (
    <>
      <MeOnGitHubContextProvider userName={"microsoft"}>
        <MeOnGitHub />
        <RepositoryList />
      </MeOnGitHubContextProvider>
    </>
  );
};
