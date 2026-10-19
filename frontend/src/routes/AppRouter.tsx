import { BrowserRouter, Route, Routes } from "react-router";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { AuthLayout } from "@/layouts/AuthLayout";
import { HomePage } from "@/pages/HomePage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoutes";
import { MainLayout } from "@/layouts/MainLayout";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/" index element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
