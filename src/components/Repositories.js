import React, { useState } from "react";
const Repositories = async ({ userName }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = usestate();

  useEffect(async () => {
    const response = await fetch(`https://github.com/users/${userName}/repos`);
    const data = await response.json();
    setData(data);
  });

  return <></>;
};

export default Repositories;
