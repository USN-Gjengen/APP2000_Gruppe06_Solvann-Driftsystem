import { createContext, useContext, useState } from "react";

export const TurbineContext = createContext({
	isTurbineOn: false,
	setIsTurbineOn: () => { },
});

export const useTurbineContext = () => useContext(TurbineContext);

export const TurbineProvider = ({ children }) => {
	const [isTurbineOn, setIsTurbineOn] = useState(false);

	return (
		<TurbineContext.Provider value={{ isTurbineOn, setIsTurbineOn }}>
			{children}
		</TurbineContext.Provider>
	);
};