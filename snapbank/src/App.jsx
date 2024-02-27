import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LandingPage from "./ui/LandingPage";
import HomePage from "./ui/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/SnapBank",
    element: <HomePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
