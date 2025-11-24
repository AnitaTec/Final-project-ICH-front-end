import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage/HomePage.jsx";
import LoginPage from "./LoginPage/LoginPage.jsx";
import RegisterPage from "./RegisterPage/RegisterPage.jsx";
import NotFoundPage from "./NotFoundPage/NotFoundPage.jsx";
import MyProfilePage from "./MyProfilePage/MyProfilePage.jsx";
import ExplorePage from "./ExplorePage/ExplorePage.jsx";
import SignupErrorPage from "./SignUpErrorPage/SignupErrorPage.jsx";
const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {/* <Route path="/login" element={<HomePage />} /> */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/signupError" element={<SignupErrorPage />} />
      <Route path="/profile" element={<MyProfilePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Navigation;
