import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignIn, TodoList } from "./pages";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import { AppProviders } from "./context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoList />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>
);
