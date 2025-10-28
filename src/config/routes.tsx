import { Navigate, type RouteObject } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import { ABOUT, FLASHCARD, HOME, LIBRARY } from "./path";
import Home from "../pages/Home/Home";
import Flashcard from "../pages/Flashcard/Flashcard";
import About from "../pages/About/About";
import Library from "../pages/Library/Library";

const AppRoutes: RouteObject = {
  path: "/",
  element: <AppLayout />,
  children: [
    {
      path: HOME,
      element: <Home />,
    },
    {
      path: FLASHCARD,
      element: <Flashcard />,
    },
    {
      path: LIBRARY,
      element: <Library />,
    },
    {
      path: ABOUT,
      element: <About />,
    },
  ],
};
export const Routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={`/${HOME}`} />,
  },
  AppRoutes,
];
