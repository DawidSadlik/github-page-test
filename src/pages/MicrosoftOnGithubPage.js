import { React } from "react";
import MeOnGitHub from "../components/MeOnGitHub";
import { MeOnGitHubContextProvider } from "../context/MeOnGitHubContextProvider";
import RepositoryList from "../components/RepositoryList";
import RepositoryTable from "../components/RepositoryTable";

export const MicrosoftOnGithubPage = () => {
  return (
    <>
      <MeOnGitHubContextProvider userName={"microsoft"}>
        <MeOnGitHub />
        {/* <RepositoryList /> */}
        <RepositoryTable />
      </MeOnGitHubContextProvider>
    </>
  );
};
