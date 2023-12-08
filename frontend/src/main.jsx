import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ThemeContextWrapper from "./components/contexts/themeContextWrapper.jsx";
import Login from '../src/components/modal/login.jsx'
import Register from '../src/components/modal/register.jsx'
import ErrorPage from '../src/components/errorPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextWrapper>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ThemeContextWrapper>
);
