import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./pages/root";
import AboutMe from "./pages/aboutme";
import ContactPage from "./pages/ContactPage";
import App from "./App";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./index.css";
import RepositoryPage from "./pages/RepositoryPage";
import MeOnGitHubPage from "./pages/MeOnGitHubPage";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "aboutme",
        element: <AboutMe />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "repository/:repositoryName",
        element: <RepositoryPage />,
      },
      {
        path: "meongithubpage",
        element: <MeOnGitHubPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
