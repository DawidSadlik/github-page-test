import React, { useEffect, useState } from "react";
import { useApi } from "../context/apiContext";

export const RepositoriesMaster = () => {
  const { repositories, dashboardColor, setSelectedRepository } = useApi();
  return (
    <>
      <h1>Repositories Master</h1>
      <h1>{repositories.length}</h1>
      <h1>Dashboard color: {dashboardColor}</h1>

      <button onClick={() => setSelectedRepository(0)}>Repository 1</button>
      <button onClick={() => setSelectedRepository(1)}>Repository 2</button>
    </>
  );
};

export const RepositoryDetails = () => {
  const { repositories, setDashboardColor, selectedRepository } = useApi();
  const [currentRepository, setCurrentRepository] = useState(undefined);
  useEffect(() => {
    //console.log(currentRepository);
    setCurrentRepository(repositories[selectedRepository]);
  }, [selectedRepository]);
  return (
    <>
      <h1>Repositories details</h1>
      <h1>{repositories.length}</h1>
      {/* <button onClick={() => setDashboardColor("Some color")}>Click</button> */}
      {/* {console.log("Renderuj")} */}
      {currentRepository === undefined ? (
        <p>No data</p>
      ) : (
        <p>{JSON.stringify(currentRepository)}</p>
      )}
    </>
  );
};
