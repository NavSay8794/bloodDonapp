import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Root.jsx";
import Home from "./routes/Home.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import AddRequest from "./routes/AddRequest.jsx";
import RequestDetail from "./routes/RequestDetail.jsx";
import UpdateRequest from "./routes/UpdateRequest.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/add-request", element: <AddRequest /> },
      { path: "/bloodRequest/:id", element: <RequestDetail /> },
  { path: "/update-request/:id", element: <UpdateRequest /> },
      {
        path: "*",
        element: (
          <div>
            <h1>Page Not Found</h1>
          </div>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
