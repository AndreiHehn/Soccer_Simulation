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
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  isSideBarOpen: boolean;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
  showModalSettings: boolean;
  setShowModalSettings: Dispatch<SetStateAction<boolean>>;
  settingsChanged: boolean;
  setSettingsChanged: Dispatch<SetStateAction<boolean>>;
  quitSettings: boolean;
  setQuitSettings: Dispatch<SetStateAction<boolean>>;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("soccer_sim_theme") || "app"
  );
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [showModalSettings, setShowModalSettings] = useState<boolean>(false);
  const [settingsChanged, setSettingsChanged] = useState<boolean>(false);
  const [quitSettings, setQuitSettings] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        isSideBarOpen,
        setIsSideBarOpen,
        showModalSettings,
        setShowModalSettings,
        settingsChanged,
        setSettingsChanged,
        quitSettings,
        setQuitSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
