import React from "react";

import "./Layout.scss";

export function Layout({ children }) {
  return (
    <React.StrictMode>
      {children}
    </React.StrictMode>
  );
}
