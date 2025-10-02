/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export const AppContext = createContext({} as AppContextProps);

interface AppContextProviderProps {
  children: ReactNode;
}
interface AppContextProps {
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("[app_name]_username") || "Player 001";
  });

  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
