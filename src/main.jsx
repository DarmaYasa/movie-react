import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./components/Pages/Home.jsx";
import MovieDetailPage from "./components/Pages/Movies/Detail.jsx";
import TVShowDetailPage from "./components/Pages/TVShows/Detail.jsx";
import MovieIndex from "./components/Pages/Movies/Index.jsx";
import TVShowIndex from "./components/Pages/TVShows/Index.jsx";
import ContactPage from "./components/Pages/Contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/movies",
    element: <MovieIndex />,
  },
  {
    path: "/movies/:id",
    element: <MovieDetailPage />,
  },
  {
    path: "/tv-shows/",
    element: <TVShowIndex />,
  },
  {
    path: "/tv-shows/:id",
    element: <TVShowDetailPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
