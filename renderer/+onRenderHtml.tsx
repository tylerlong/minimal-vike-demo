import React from "react";
import { renderToString } from "react-dom/server";
import { dangerouslySkipEscape, escapeInject } from "vike/server";

import { Layout } from "./Layout";

export async function onRenderHtml(pageContext) {
  const { Page } = pageContext;
  const viewHtml = dangerouslySkipEscape(
    renderToString(
      <Layout>
        <Page />
      </Layout>,
    ),
  );

  return escapeInject`<!DOCTYPE html>
    <html>
      <body>
        <div id="root">${viewHtml}</div>
      </body>
    </html>`;
}
