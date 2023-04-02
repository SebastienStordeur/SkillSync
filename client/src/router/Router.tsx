import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/index";
import HomePage from "../pages/HomePage";
import JobPage from "../pages/JobPage";
import AuthPage from "../pages/AuthPage";

const Router = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job/:jobId" element={<JobPage />} />
        {!isAuthenticated && <Route path="/auth" element={<AuthPage />} />}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
