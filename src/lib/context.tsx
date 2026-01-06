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

/* =========================
   TIPOS – QUALIFYING
========================= */

interface MatchResult {
  home?: number;
  away?: number;
}

interface PhaseState {
  matches: string[];
  results: Record<number, MatchResult>;
  winners: Record<number, string | null>;
}

export type QualifyingState = Record<number, PhaseState>;

/* ========================= */

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
  ranking: boolean;
  setRanking: Dispatch<SetStateAction<boolean>>;
  resetAllTeams: boolean;
  setResetAllTeams: Dispatch<SetStateAction<boolean>>;
  tournamentStep: string;
  setTournamentStep: Dispatch<SetStateAction<string>>;
  selectedTeams: string[];
  setSelectedTeams: Dispatch<SetStateAction<string[]>>;
  selectedLogos: string[];
  setSelectedLogos: Dispatch<SetStateAction<string[]>>;
  loadDefaultTeams: boolean;
  setLoadDefaultTeams: Dispatch<SetStateAction<boolean>>;
  matchdayNumber: number;
  setMatchdayNumber: Dispatch<SetStateAction<number>>;
  teams: Team[];
  setTeams: Dispatch<SetStateAction<Team[]>>;
  confirmTeams: boolean;
  setConfirmTeams: Dispatch<SetStateAction<boolean>>;
  activeTournament: boolean;
  setActiveTournament: Dispatch<SetStateAction<boolean>>;
  startDraw: boolean;
  setStartDraw: Dispatch<SetStateAction<boolean>>;
  qualifyingDone: boolean;
  setQualifyingDone: Dispatch<SetStateAction<boolean>>;
  scheduleRef: React.MutableRefObject<
    { home: string; away: string }[][] | null
  >;
  standings: TeamStats[];
  setStandings: Dispatch<SetStateAction<TeamStats[]>>;
  matchResults: Record<
    number,
    Record<number, { home: number | ""; away: number | "" }>
  >;
  setMatchResults: Dispatch<
    SetStateAction<
      Record<number, Record<number, { home: number | ""; away: number | "" }>>
    >
  >;

  qualifyedTeams: string[];
  setQualifyedTeams: Dispatch<SetStateAction<string[]>>;
  Q1Teams: string[];
  setQ1Teams: Dispatch<SetStateAction<string[]>>;
  Q2Teams: string[];
  setQ2Teams: Dispatch<SetStateAction<string[]>>;
  Q3Teams: string[];
  setQ3Teams: Dispatch<SetStateAction<string[]>>;

  qualifyingState: QualifyingState;
  setQualifyingState: Dispatch<SetStateAction<QualifyingState>>;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [theme, setTheme] = useState(
    localStorage.getItem("soccer_sim_theme") || "app"
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("soccer_sim_language") || "en"
  );
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [showModalSettings, setShowModalSettings] = useState(false);
  const [settingsChanged, setSettingsChanged] = useState(false);
  const [quitSettings, setQuitSettings] = useState(false);
  const [resetSettings, setResetSettings] = useState(false);
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null);
  const [localTournament, setLocalTournament] = useState<Tournament | null>(
    null
  );
  const [activePage, setActivePage] = useState("Home");
  const [backToMenu, setBackToMenu] = useState(false);
  const [newSimulation, setNewSimulation] = useState(false);
  const [ranking, setRanking] = useState(false);
  const [resetAllTeams, setResetAllTeams] = useState(false);
  const [tournamentStep, setTournamentStep] = useState("Teams Selection");
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedLogos, setSelectedLogos] = useState<string[]>([]);
  const [loadDefaultTeams, setLoadDefaultTeams] = useState(false);
  const [matchdayNumber, setMatchdayNumber] = useState(1);
  const [teams, setTeams] = useState<Team[]>([]);
  const [confirmTeams, setConfirmTeams] = useState(false);
  const [startDraw, setStartDraw] = useState(false);
  const [activeTournament, setActiveTournament] = useState(false);
  const scheduleRef = useRef(null);
  const [standings, setStandings] = useState<TeamStats[]>([]);
  const [matchResults, setMatchResults] = useState({});
  const [qualifyedTeams, setQualifyedTeams] = useState<string[]>([]);
  const [Q1Teams, setQ1Teams] = useState<string[]>([]);
  const [Q2Teams, setQ2Teams] = useState<string[]>([]);
  const [Q3Teams, setQ3Teams] = useState<string[]>([]);
  const [qualifyingDone, setQualifyingDone] = useState(false);

  /* 🔹 QUALIFYING STATE GLOBAL */
  const [qualifyingState, setQualifyingState] = useState<QualifyingState>({});

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
        ranking,
        setRanking,
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
        startDraw,
        setStartDraw,
        activeTournament,
        setActiveTournament,
        scheduleRef,
        standings,
        setStandings,
        matchResults,
        setMatchResults,
        qualifyedTeams,
        setQualifyedTeams,
        Q1Teams,
        setQ1Teams,
        Q2Teams,
        setQ2Teams,
        Q3Teams,
        setQ3Teams,
        qualifyingState,
        setQualifyingState,
        qualifyingDone,
        setQualifyingDone,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
