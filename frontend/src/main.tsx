import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.tsx";
import AuthLayout from "./components/AuthLayout.tsx";
import ProtectedLayout from "./components/ProtectedLayout.tsx";
import Signup from "./components/Signup.tsx";
import Events from "./pages/Events.tsx";
import ManageEvents from "./pages/ManageEvents.tsx";

const router = createBrowserRouter([
  // Authentication routes (no navbar)
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  // Protected routes (with navbar)
  {
    path: "/dashboard",
    element: <ProtectedLayout />,
    children: [
      {
        path: "events",
        element: <Events />, // Replace with actual component
      },
      {
        path: "manageEvents",
        element: <ManageEvents />, // Replace with actual component
      },
      // Add all your protected routes here
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
