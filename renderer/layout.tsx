import React from "react";

import "./Layout.scss";
import { PageContextProvider } from "./usePageContext.js";

export function Layout({ children, pageContext }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        {children}
      </PageContextProvider>
    </React.StrictMode>
  );
}
