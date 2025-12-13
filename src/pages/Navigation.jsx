import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage/HomePage.jsx";
import LoginPage from "./LoginPage/LoginPage.jsx";
import RegisterPage from "./RegisterPage/RegisterPage.jsx";
import NotFoundPage from "./NotFoundPage/NotFoundPage.jsx";
import MyProfilePage from "./MyProfilePage/MyProfilePage.jsx";
import ExplorePage from "./ExplorePage/ExplorePage.jsx";
import ResetPage from "./ResetPage/ResetPage.jsx";
import EditProfile from "./EditProfile/EditProfile.jsx";
import MessagesPage from "./Messages/MessagesPage.jsx";
import UserProfilePage from "./UserProfilePage/UserProfilePage.jsx";
import PublicRoute from "../shared/components/PublicRoute/PublicRoute.jsx";
import PrivateRoute from "../shared/components/PrivateRoute/PrivateRoute.jsx";

const Navigation = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<HomePage />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signupError" element={<ResetPage />} />
      </Route>

      <Route path="/profile" element={<MyProfilePage />} />
      <Route path="/users/:username" element={<UserProfilePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/edit" element={<EditProfile />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Navigation;
