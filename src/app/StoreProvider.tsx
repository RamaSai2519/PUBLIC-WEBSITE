//@ts-nocheck
"use client";

import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "../store/store";
// import { store } from "../store/store";
import { PremiumProvider } from "@/context/PremiumContext";
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const store = makeStore()
  return <Provider store={store}>
    <PremiumProvider>
      {children}
    </PremiumProvider>
  </Provider>;
}

