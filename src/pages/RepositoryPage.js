import React from "react";
import { ApiContextProvider } from "../context/apiContext";
import {
  RepositoriesMaster,
  RepositoryDetails,
} from "../components/Repositories";
const RepositoryPage = ({ userName }) => {
  return (
    <ApiContextProvider userName={userName}>
      <div>
        <h1>Repository page</h1>
        <RepositoriesMaster />
        <RepositoryDetails />
      </div>
    </ApiContextProvider>
  );
};

export default RepositoryPage;
