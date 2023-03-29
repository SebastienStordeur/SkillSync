import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "../pages/Test";
import { useSelector } from "react-redux";
import { RootState } from "../redux/index";

const Router = () => {
  //used to protect routes
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
