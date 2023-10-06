import { MantineProvider } from '@mantine/core';
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Login'
import '@mantine/core/styles.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
)
