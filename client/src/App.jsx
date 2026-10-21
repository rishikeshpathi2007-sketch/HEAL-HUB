import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Journey from "./pages/Journey";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import JourneyDetails from "./pages/JourneyDetails";
import PublicJourneys from "./pages/PublicJourneys";
import About from "./pages/About";
import VerifyOTP from "./pages/VerifyOTP";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import VerifyResetOTP from "./pages/VerifyResetOTP";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />

        <Route
          path="/journeys"
          element={
            <ProtectedRoute>
              <Journey />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/:id"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journeys/public"
          element={
            <ProtectedRoute>
              <PublicJourneys />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
        <Route
          path="/journeys/:id"
          element={
            <ProtectedRoute>
              <JourneyDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journeys/public"
          element={
            <ProtectedRoute>
              <PublicJourneys />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/verify-reset-otp" element={<VerifyResetOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
