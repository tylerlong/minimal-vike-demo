export { onRenderClient };

import React from "react";
import { hydrateRoot } from "react-dom/client";
import { Layout } from "./layout";

async function onRenderClient(pageContext) {
  const { Page } = pageContext;
  hydrateRoot(
    document.getElementById("page-view")!,
    <Layout>
      <Page />
    </Layout>,
  );
}
