import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate
} from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import { AuthContext } from './context/authContext';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { createContext } from 'react';
export const myContext = createContext({});

function App() {

  const queryClient = new QueryClient()

  const { currentUser } = useContext(AuthContext);
  let moder = localStorage.getItem("mode") == "true";
  const [mode, upMode] = useState(moder);


  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const contextObj = {
    mode: mode,
    updateMode: upMode,
  }

  function Layout() {
    return (
      <QueryClientProvider client={queryClient}>
        <myContext.Provider value={contextObj}>
          <div>
            <NavBar />
            <div style={{ display: "flex", position: "relative" }}>
              <Leftbar />
              <Outlet />
              <Rightbar />
            </div>
          </div>
        </myContext.Provider>
      </QueryClientProvider>
    );
  }

  function ProtecedPage({ children }) {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return children
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtecedPage><Layout /></ProtecedPage>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
