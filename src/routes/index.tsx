import { RouteObject, useRoutes } from "react-router-dom";

import { Race, Landing } from "../pages";

export const AppRoutes = () => {
  const routes: RouteObject[] = [
    {
      path: "/race/:id",
      element: <Race />,
    },
    {
      path: "*",
      element: <Landing />,
    },
  ];

  const element = useRoutes(routes);

  return <>{element}</>;
};
