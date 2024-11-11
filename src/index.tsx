import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About } from "@/pages/About";
import { Shop } from "@/pages/Shop";
import { Suspense } from "react";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root is not found");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: <Suspense fallback={'...Loading About'}><About /></Suspense>,
      },
      {
        path: "/shop",
        element: <Suspense fallback={'...Loading Shop'}><Shop /></Suspense>
    }
    ],
  },
]);

const container = createRoot(root);

container.render(<RouterProvider router={router} />);
