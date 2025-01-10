import React from "react";

import { Counter } from "./Counter";
import { useData } from "../../renderer/useData";

function Page() {
  const data = useData<{ greetings: string }>();
  return (
    <>
      <h1>{data.greetings}</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
    </>
  );
}

export default Page;
