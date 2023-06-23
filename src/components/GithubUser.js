import React from "react";
const GithubUser = ({ name, id, url }) => {
  return (
    <>
      <div>
        <h3>{id}</h3>
        <h1>{name}</h1>
        <h2>{url}</h2>
      </div>
    </>
  );
};
export default GithubUser;
