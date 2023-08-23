import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import Admins from "./pages/Admins";
import CustomMachines from "./pages/CustomMachines";
import CustomFoods from "./pages/CustomFoods";
import SelectManagers from "./pages/SelectManagers";
import InputMachines from "./pages/InputMachines";
import InputFoods from "./pages/InputFoods";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Main /> },
      { path: "managers", element: <Admins /> },
      { path: "select/machines", element: <CustomMachines /> },
      { path: "select/foods", element: <CustomFoods /> },
      { path: "select/managers", element: <SelectManagers /> },
      { path: "zenput/machines", element: <InputMachines /> },
      { path: "zenput/foods", element: <InputFoods /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
