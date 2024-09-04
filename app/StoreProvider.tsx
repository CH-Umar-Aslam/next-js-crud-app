"use client";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({
	children,
}: {
	children: ReactNode;
}) {
	const storeRef = useRef<any>(null);
	const persistorRef = useRef<any>(null);

	if (!storeRef.current) {
		storeRef.current = makeStore();
		persistorRef.current = persistStore(
			storeRef.current
		);
	}

	return (
		<Provider store={storeRef.current}>
			<PersistGate
				loading={null}
				persistor={persistorRef.current}
			>
				{children}
			</PersistGate>
		</Provider>
	);
}
