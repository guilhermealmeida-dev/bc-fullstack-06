import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

import authImage from "../assets/images/auth-init.png";

export function AuthLayout({ children }: AuthLayoutProps) {
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
        {children}
      </div>
    </div>
  );
}
