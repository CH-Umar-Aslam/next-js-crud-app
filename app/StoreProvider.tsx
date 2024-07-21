"use client";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

// import { addStudent } from "../lib/features/Student/StudentSlice";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  const persistorRef = useRef<any>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // storeRef.current.dispatch(addStudent({ name: "ali" }));
    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate persistor={persistorRef.current}>{children}</PersistGate>
    </Provider>
  );
}
