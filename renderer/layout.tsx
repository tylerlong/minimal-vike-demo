import React from "react";
import "./layout.scss";

export function Layout({ children }) {
  return (
    <React.StrictMode>
      {children}
    </React.StrictMode>
  );
}
