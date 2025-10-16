 import { Routes } from "./config/routes";
import { useRoutes } from "react-router-dom";

const App = () => {
  const routes = useRoutes(Routes);
  return <>{routes}</>;
};

export default App;
