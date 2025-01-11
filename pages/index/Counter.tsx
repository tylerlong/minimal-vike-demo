import React from "react";
import { auto } from "manate/react.js";
import { Button } from "antd";

import store from "../../store.js";
import { supabase } from "../../supabase/client.js";

export const Counter = auto(() => {
  return (
    <div>
      {store.session === undefined
        ? (
          <Button
            onClick={() =>
              supabase.auth.signInWithOAuth({
                provider: "github",
                options: {
                  redirectTo: `${location.origin}${location.pathname}`,
                },
              })}
          >
            Log in
          </Button>
        )
        : (
          <Button
            onClick={() => {
              supabase.auth.signOut();
            }}
          >
            Log out
          </Button>
        )}
    </div>
  );
});
