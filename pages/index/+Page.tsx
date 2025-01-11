import React from "react";
import { Button } from "antd";

import { Counter } from "./Counter.js";
import { useData } from "../../renderer/useData.js";

function Page() {
  const data = useData<{ greetings: string }>();
  return (
    <>
      <h1>{data.greetings}</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          <Button>Ant Design Button</Button>
        </li>
        <li>
          <Counter />
        </li>
      </ul>
    </>
  );
}

export default Page;
