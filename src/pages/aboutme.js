import React, { useEffect, useState } from "react";
import GithubUser from "../components/GithubUser";
import RepositoryPage from "./RepositoryPage";

const AboutMe = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/dawidsadlik`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2>Loading....</h2>;
  if (error) return <h2>Error...</h2>;
  if (!data) return <h2>No data</h2>;
  return (
    <div>
      <GithubUser name={data.login} url={data.url} id={data.id} />
      <RepositoryPage userName={"dawidsadlik"} />
    </div>
  );
};

export default AboutMe;
