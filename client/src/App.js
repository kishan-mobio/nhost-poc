import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { NhostApolloProvider } from "@nhost/react-apollo";
import Layout from "./components/Layout";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { NhostProvider } from "@nhost/react";
import ProtectedRoute from "./components/ProtectedRoute";
import OTP from "./components/OTP";
import MagicLink from "./components/MagicLink";
import SSO from "./components/SSO";
import { nhost } from "./nhost";

function App() {
  return (
    <NhostProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>
        <BrowserRouter>
          <Routes>
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-in/with-otp" element={<OTP />} />
            <Route path="sign-in/with-magic-link" element={<MagicLink />} />
            <Route path="sign-in/sso" element={<SSO />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </NhostApolloProvider>
    </NhostProvider>
  );
}

export default App;
