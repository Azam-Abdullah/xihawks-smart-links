// app/providers.jsx
"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}><HydrateUser>{children}</HydrateUser></Provider>;
}

function HydrateUser({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      dispatch({ type: "auth/loginUser/fulfilled", payload: { user } });
    }
  }, [dispatch]);

  return <>{children}</>;
}
