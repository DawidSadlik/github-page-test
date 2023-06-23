import React, { useState } from "react";
const Repositories = async ({ userName }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://github.com/users/${userName}/repos`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  });
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;
  if (!data) return <h1>No data</h1>;
  return;
};

export default Repositories;
