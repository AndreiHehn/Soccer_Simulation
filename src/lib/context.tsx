/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import type { Team, TeamStats, Tournament } from "./types";

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
  resetAllTeams: boolean;
  setResetAllTeams: Dispatch<SetStateAction<boolean>>;
  tournamentStep: string;
  setTournamentStep: Dispatch<SetStateAction<string>>;
  selectedTeams: Array<string>;
  setSelectedTeams: Dispatch<SetStateAction<Array<string>>>;
  selectedLogos: Array<string>;
  setSelectedLogos: Dispatch<SetStateAction<Array<string>>>;
  loadDefaultTeams: boolean;
  setLoadDefaultTeams: Dispatch<SetStateAction<boolean>>;
  matchdayNumber: number;
  setMatchdayNumber: Dispatch<SetStateAction<number>>;
  teams: Array<Team>;
  setTeams: Dispatch<SetStateAction<Array<Team>>>;
  confirmTeams: boolean;
  setConfirmTeams: Dispatch<SetStateAction<boolean>>;
  activeTournament: boolean;
  setActiveTournament: Dispatch<SetStateAction<boolean>>;
  scheduleRef: React.MutableRefObject<
    { home: string; away: string }[][] | null
  >;
  standings: TeamStats[];
  setStandings: React.Dispatch<React.SetStateAction<TeamStats[]>>;
  matchResults: Record<
    number,
    Record<number, { home: number | ""; away: number | "" }>
  >;
  setMatchResults: Dispatch<
    SetStateAction<
      Record<number, Record<number, { home: number | ""; away: number | "" }>>
    >
  >;

  Q1Teams: Array<string>;
  setQ1Teams: Dispatch<SetStateAction<Array<string>>>;
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
  const [resetAllTeams, setResetAllTeams] = useState<boolean>(false);
  const [tournamentStep, setTournamentStep] =
    useState<string>("Teams Selection");
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedLogos, setSelectedLogos] = useState<string[]>([]);
  const [loadDefaultTeams, setLoadDefaultTeams] = useState<boolean>(false);
  const [matchdayNumber, setMatchdayNumber] = useState<number>(1);
  const [teams, setTeams] = useState<Team[]>([]);
  const [confirmTeams, setConfirmTeams] = useState<boolean>(false);
  const [activeTournament, setActiveTournament] = useState<boolean>(false);
  const scheduleRef = useRef(null);
  const [standings, setStandings] = useState<TeamStats[]>([]);
  const [matchResults, setMatchResults] = useState<
    Record<number, Record<number, { home: number | ""; away: number | "" }>>
  >({});
  const [Q1Teams, setQ1Teams] = useState<string[]>([]);

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
        resetAllTeams,
        setResetAllTeams,
        tournamentStep,
        setTournamentStep,
        selectedTeams,
        setSelectedTeams,
        selectedLogos,
        setSelectedLogos,
        loadDefaultTeams,
        setLoadDefaultTeams,
        matchdayNumber,
        setMatchdayNumber,
        teams,
        setTeams,
        confirmTeams,
        setConfirmTeams,
        activeTournament,
        setActiveTournament,
        scheduleRef,
        standings,
        setStandings,
        matchResults,
        setMatchResults,
        Q1Teams,
        setQ1Teams,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
