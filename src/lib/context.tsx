/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface Tournament {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  teams: number;
}

export const AppContext = createContext({} as AppContextProps);

interface AppContextProviderProps {
  children: ReactNode;
}
interface AppContextProps {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  isSideBarOpen: boolean;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
  showModalSettings: boolean;
  setShowModalSettings: Dispatch<SetStateAction<boolean>>;
  settingsChanged: boolean;
  setSettingsChanged: Dispatch<SetStateAction<boolean>>;
  quitSettings: boolean;
  setQuitSettings: Dispatch<SetStateAction<boolean>>;
  resetSettings: boolean;
  setResetSettings: Dispatch<SetStateAction<boolean>>;
  selectedTournament: Tournament | null;
  setSelectedTournament: Dispatch<SetStateAction<Tournament | null>>;
  localTournament: Tournament | null;
  setLocalTournament: Dispatch<SetStateAction<Tournament | null>>;
  activePage: string;
  setActivePage: Dispatch<SetStateAction<string>>;
  backToMenu: boolean;
  setBackToMenu: Dispatch<SetStateAction<boolean>>;
  newSimulation: boolean;
  setNewSimulation: Dispatch<SetStateAction<boolean>>;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("soccer_sim_theme") || "app"
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem("soccer_sim_language") || "en"
  );
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [showModalSettings, setShowModalSettings] = useState<boolean>(false);
  const [settingsChanged, setSettingsChanged] = useState<boolean>(false);
  const [quitSettings, setQuitSettings] = useState<boolean>(false);
  const [resetSettings, setResetSettings] = useState<boolean>(false);
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null);
  const [localTournament, setLocalTournament] = useState<Tournament | null>(
    null
  );
  const [activePage, setActivePage] = useState<string>("Home");
  const [backToMenu, setBackToMenu] = useState<boolean>(false);
  const [newSimulation, setNewSimulation] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        isSideBarOpen,
        setIsSideBarOpen,
        showModalSettings,
        setShowModalSettings,
        settingsChanged,
        setSettingsChanged,
        quitSettings,
        setQuitSettings,
        resetSettings,
        setResetSettings,
        selectedTournament,
        setSelectedTournament,
        localTournament,
        setLocalTournament,
        activePage,
        setActivePage,
        backToMenu,
        setBackToMenu,
        newSimulation,
        setNewSimulation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
