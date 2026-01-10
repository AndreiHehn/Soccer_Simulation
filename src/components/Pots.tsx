import { useContext, useEffect, useMemo, useState } from "react";
import { Container } from "../styles/Pots";
import { AppContext } from "../lib/context";
import { Button } from "../generic/Button";
import { useTranslation } from "react-i18next";

import { PremierLeagueList } from "../lib/tournaments/PremierLeague";
import { LaLigaList } from "../lib/tournaments/LaLiga";
import { SerieAList } from "../lib/tournaments/SerieA";
import { BundesligaList } from "../lib/tournaments/Bundesliga";
import { Ligue1List } from "../lib/tournaments/Ligue1";
import { EredivisieList } from "../lib/tournaments/Eredivisie";
import { LigaPortugalList } from "../lib/tournaments/LigaPortugal";
import { RestOfEuropeList } from "../lib/tournaments/RestOfEurope";
import { BrasileirãoList } from "../lib/tournaments/Brasileirão";
import { SouthAmericaList } from "../lib/tournaments/SouthAmerica";

import { CONMEBOL_Ranking } from "../lib/rankings/conmebol_ranking";
import { UEFA_Ranking } from "../lib/rankings/uefa_ranking";
import type { Team } from "../lib/types";
import DoubleArrowLeft from "../assets/icons/doubleArrowLeftIcon.svg?react";
import DoubleArrowRight from "../assets/icons/doubleArrowRightIcon.svg?react";
import { ModalMessage } from "../generic/ModalMessage";

interface Props {
  teamsPerPot: number;
  numberOfPots: number;
}

export default function Pots({ teamsPerPot, numberOfPots }: Props) {
  const { selectedTournament, qualifyedTeams, drawGroups, setDrawGroups } =
    useContext(AppContext);
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState<string>("Pots");
  const [drawConfirmation, setDrawConfirmation] = useState<boolean>(false);
  const [groups, setGroups] = useState<string[][]>([]);

  /* =======================
     LISTAS DE TIMES
  ======================= */
  const Uefa_TeamsList = [
    ...PremierLeagueList,
    ...LaLigaList,
    ...SerieAList,
    ...BundesligaList,
    ...Ligue1List,
    ...EredivisieList,
    ...LigaPortugalList,
    ...RestOfEuropeList,
  ];

  const CONMEBOL_TeamsList = [...BrasileirãoList, ...SouthAmericaList];

  const [activeList, setActiveList] = useState<Team[]>(Uefa_TeamsList);
  const isLibertadores = selectedTournament?.name === "Libertadores";
  const ranking = isLibertadores ? CONMEBOL_Ranking : UEFA_Ranking;

  const teamMap = useMemo(() => {
    return activeList.reduce<Record<string, Team>>((acc, team) => {
      acc[team.name] = team;
      return acc;
    }, {});
  }, [activeList]);

  const rankingMap = useMemo(() => {
    return ranking.reduce<Record<string, number>>((acc, teamName, index) => {
      acc[teamName] = index;
      return acc;
    }, {});
  }, [ranking]);

  const qualifiedFromQualifiers = isLibertadores
    ? qualifyedTeams.slice(-4)
    : [];

  const directQualifiedTeams = isLibertadores
    ? qualifyedTeams.slice(0, -4)
    : qualifyedTeams;

  const rankedDirectTeams = useMemo(() => {
    return [...directQualifiedTeams].sort((a, b) => {
      const rankA = rankingMap[a] ?? Infinity;
      const rankB = rankingMap[b] ?? Infinity;
      return rankA - rankB;
    });
  }, [directQualifiedTeams, rankingMap]);

  const pots = useMemo(() => {
    // Caso padrão (Champions, etc.)
    if (!isLibertadores) {
      return Array.from({ length: numberOfPots }, (_, i) =>
        rankedDirectTeams.slice(i * teamsPerPot, (i + 1) * teamsPerPot)
      );
    }

    const normalPotsCount = numberOfPots - 1;
    const normalTeamsCount = normalPotsCount * teamsPerPot;

    const normalTeams = rankedDirectTeams.slice(0, normalTeamsCount);
    const lastPotTeams = [
      ...rankedDirectTeams.slice(normalTeamsCount),
      ...qualifiedFromQualifiers,
    ];

    return [
      ...Array.from({ length: normalPotsCount }, (_, i) =>
        normalTeams.slice(i * teamsPerPot, (i + 1) * teamsPerPot)
      ),
      lastPotTeams,
    ];
  }, [
    isLibertadores,
    rankedDirectTeams,
    qualifiedFromQualifiers,
    numberOfPots,
    teamsPerPot,
  ]);

  const teamCountryMap: Record<string, string> = {};

  CONMEBOL_TeamsList.forEach((team) => {
    teamCountryMap[team.name] = team.league;
  });

  useEffect(() => {
    if (selectedTournament?.name === "Libertadores") {
      setActiveList(CONMEBOL_TeamsList);
    } else {
      setActiveList(Uefa_TeamsList);
    }
  }, [selectedTournament]);

  useEffect(() => {
    if (!drawConfirmation) return;
    if (!pots.length) return;

    const result = Draw(pots, teamCountryMap, qualifiedFromQualifiers);

    setGroups(result);
    setDrawConfirmation(false);
  }, [drawConfirmation, pots, teamCountryMap, qualifiedFromQualifiers]);

  function Draw(
    pots: string[][],
    teamCountryMap: Record<string, string>,
    qualifiedTeamsFromPlayoff: string[] // últimos 4
  ): string[][] {
    const numberOfGroups = pots[0].length;
    const potsCopy = pots.map((pot) => [...pot]);

    const groups: string[][] = Array.from({ length: numberOfGroups }, () => []);

    for (let potIndex = 0; potIndex < potsCopy.length; potIndex++) {
      for (let groupIndex = 0; groupIndex < numberOfGroups; groupIndex++) {
        const pot = potsCopy[potIndex];

        const validTeams = pot.filter((team) => {
          const teamCountry = teamCountryMap[team];

          // Países já no grupo
          const groupCountries = groups[groupIndex].map(
            (t) => teamCountryMap[t]
          );

          // Se não conflita, ok
          if (!groupCountries.includes(teamCountry)) return true;

          // EXCEÇÃO: últimos 4 da qualificatória
          return qualifiedTeamsFromPlayoff.includes(team);
        });

        // Segurança: se nada for válido, libera geral (fallback)
        const candidates = validTeams.length ? validTeams : pot;

        const randomIndex = Math.floor(Math.random() * candidates.length);
        const team = candidates[randomIndex];

        // Remove do pote original
        pot.splice(pot.indexOf(team), 1);

        groups[groupIndex].push(team);
      }
    }

    return groups;
  }

  return (
    <Container
      primaryColor={selectedTournament?.primaryColor || "#FFF"}
      secondaryColor={selectedTournament?.secondaryColor || "#FFF"}
      tertiaryColor={selectedTournament?.tertiaryColor || "#FFF"}
      backgroundColor={selectedTournament?.backgroundColor || "#FFF"}
      textColor={selectedTournament?.textColor || "#FFF"}
    >
      {currentTab == "Pots" && (
        <>
          <article className="main-content">
            <section className="pot-container">
              {pots.map((potTeams, i) => (
                <div key={i} className="pot">
                  <h2 className="pot-title">POTE 0{i + 1}</h2>

                  {potTeams.map((teamName) => {
                    const team = teamMap[teamName];
                    if (!team) return null;

                    return (
                      <div key={teamName} className="pot-team">
                        <img
                          className="team-logo"
                          src={team.logo}
                          alt={team.name}
                        />
                        <h3 className="team-name">{team.name}</h3>
                      </div>
                    );
                  })}
                </div>
              ))}
            </section>
            {selectedTournament?.name != "Champions League" && (
              <div className="change-tab pots-button">
                <DoubleArrowRight
                  onClick={() => setCurrentTab("Groups")}
                ></DoubleArrowRight>
              </div>
            )}
          </article>

          <footer className="buttons">
            <Button
              color="blue"
              width="auto"
              borderRadius="4px"
              functionButton={() => {
                if (selectedTournament?.name === "Champions League") {
                  console.log("AAAAA");
                } else {
                  setDrawGroups(true);
                }
              }}
            >
              {selectedTournament?.name == "Champions League"
                ? t("Draw Matches")
                : t("Draw Groups")}
            </Button>
          </footer>
        </>
      )}
      {currentTab == "Groups" && (
        <>
          {selectedTournament?.name != "Champions League" && (
            <div className="change-tab groups-button">
              <DoubleArrowLeft
                onClick={() => setCurrentTab("Pots")}
              ></DoubleArrowLeft>
            </div>
          )}

          <section className="group-container">
            {groups.map((group, i) => (
              <div key={i} className="group">
                <h2 className="group-title">
                  GROUP {String.fromCharCode(65 + i)}
                </h2>

                {group.map((teamName) => {
                  const team = teamMap[teamName];
                  if (!team) return null;

                  return (
                    <div key={teamName} className="group-team">
                      <img
                        className="team-logo"
                        src={team.logo}
                        alt={team.name}
                      />
                      <h3 className="team-name">{team.name}</h3>
                    </div>
                  );
                })}
              </div>
            ))}
          </section>
        </>
      )}
      {drawGroups && (
        <ModalMessage
          textMessage={t("Do you want to draw the groups?")}
          onClick1={() => setDrawGroups(false)}
          textButton1={t("Cancel")}
          onClick2={() => (
            setDrawGroups(false),
            setCurrentTab("Groups"),
            setDrawConfirmation(true)
          )}
          textButton2={t("Yes")}
        ></ModalMessage>
      )}
    </Container>
  );
}
