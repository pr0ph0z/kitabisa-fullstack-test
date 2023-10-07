import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "@mantine/core/styles.css";
import Summary from "./pages/Summary";
import BuyTransaction from "./pages/BuyTransaction";
import SellTransaction from "./pages/SellTransaction";
import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/summary",
    element: <Summary />,
  },
  {
    path: "/buy",
    element: <BuyTransaction />,
  },
  {
    path: "/sell",
    element: <SellTransaction />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </MantineProvider>
  </React.StrictMode>
);
