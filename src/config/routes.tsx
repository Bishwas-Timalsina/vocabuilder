import { Navigate, type RouteObject } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import { ABOUT, FLASHCARD, HOME, WORD_LIST } from "./path";
import Home from "../pages/Home/Home";
import Flashcard from "../pages/Flashcard/Flashcard";
import WordList from "../pages/Word-List/WordList";
import About from "../pages/About/About";

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
      path: WORD_LIST,
      element: <WordList />,
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
