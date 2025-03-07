import React from "react";
import { hydrateRoot } from "react-dom/client";

import { Layout } from "./Layout.js";

export async function onRenderClient(pageContext) {
  const { Page } = pageContext;
  hydrateRoot(
    document.getElementById("root")!,
    <Layout pageContext={pageContext}>
      <Page />
    </Layout>,
  );
}
