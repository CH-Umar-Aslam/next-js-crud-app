"use client";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store/store";
// import { addStudent } from "../lib/features/Student/StudentSlice";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // storeRef.current.dispatch(addStudent({ name: "ali" }));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
