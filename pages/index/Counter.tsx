import React from "react";
import { auto } from "manate/react";

import store from "../../store";
import { supabase } from "../../supabase/client";

export const Counter = auto(() => {
  return (
    <div>
      {store.session === undefined
        ? (
          <button
            onClick={() =>
              supabase.auth.signInWithOAuth({
                provider: "github",
                options: {
                  redirectTo: `${location.origin}${location.pathname}`,
                },
              })}
          >
            Log in
          </button>
        )
        : (
          <button
            onClick={() => {
              supabase.auth.signOut();
            }}
          >
            Log out
          </button>
        )}
    </div>
  );
});
