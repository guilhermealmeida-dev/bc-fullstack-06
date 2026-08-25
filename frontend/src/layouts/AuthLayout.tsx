import React from "react";


import authImage from "../assets/images/auth-init.png";
import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div
      id="auth-layout"
      className="flex flex-col overflow-auto bg-white lg:flex-row lg:overflow-hidden lg:h-screen"
    >
      <div
        id="auth-image"
        className="flex h-48 items-center justify-center overflow-hidden p-2.5 lg:h-auto lg:flex-1"
      >
        <img
          className="w-full h-full object-cover"
          src={authImage}
          alt="Imagem de capa"
        />
      </div>

      <div
        id="auth-content"
        className="flex-1 flex items-center justify-center p-8"
      >
        <Outlet/>
      </div>
    </div>
  );
}
