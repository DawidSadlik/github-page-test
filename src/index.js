import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./pages/root";
import AboutMe from "./pages/aboutme";
import Contact from "./pages/contact";
import App from "./App";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./index.css";

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
        element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
