import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";
import { UserContext } from "../services/UserContext";

const Root = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={`/`}>Home</Link>
          </li>
          <li>
            <Link to={`aboutme`}>About me</Link>
          </li>
          <li>
            <Link to={`contact`}>Contact</Link>
          </li>
          <li>
            <Link to={`meongithubpage`}>Me on GitHub</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      {/* <UserContext.Provider value={{ value: "Some value", name: "Some name" }}>
        <Outlet />
      </UserContext.Provider> */}
    </div>
  );
};

export default Root;
