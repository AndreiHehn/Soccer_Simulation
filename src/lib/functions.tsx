export function generateFirstLeg(teams: string[]) {
  const numTimes = teams.length;

  // Se for ímpar, adiciona "bye"
  const lista = numTimes % 2 === 0 ? [...teams] : [...teams, "BYE"];

  const total = lista.length;
  const rodadas: { home: string; away: string }[][] = [];

  for (let r = 0; r < total - 1; r++) {
    const rodada: { home: string; away: string }[] = [];

    for (let i = 0; i < total / 2; i++) {
      const home = lista[i];
      const away = lista[total - 1 - i];

      if (home !== "BYE" && away !== "BYE") {
        rodada.push({ home, away });
      }
    }

    rodadas.push(rodada);

    // Rotaciona lista (menos o primeiro)
    lista.splice(1, 0, lista.pop()!);
  }

  return rodadas;
}

export function balanceHomeAway(firstLeg: { home: string; away: string }[][]) {
  const streak: Record<
    string,
    { side: "home" | "away" | null; count: number }
  > = {}; // { time: { side: 'home'|'away', count: number } }

  for (const rodada of firstLeg) {
    for (const match of rodada) {
      const { home, away } = match;

      // Inicializa caso não exista
      if (!streak[home]) streak[home] = { side: null, count: 0 };
      if (!streak[away]) streak[away] = { side: null, count: 0 };

      // Atualiza streak do mandante
      if (streak[home].side === "home") {
        streak[home].count++;
      } else {
        streak[home].side = "home";
        streak[home].count = 1;
      }

      // Atualiza streak do visitante
      if (streak[away].side === "away") {
        streak[away].count++;
      } else {
        streak[away].side = "away";
        streak[away].count = 1;
      }

      // Se home tiver sequência muito grande → troca mando
      if (streak[home].count > 2) {
        reverseMatch(match);

        streak[home] = { side: "away", count: 1 };
        streak[away] = { side: "home", count: 1 };
      }

      // Se away tiver sequência muito grande → troca mando
      if (streak[away].count > 2) {
        reverseMatch(match);

        streak[away] = { side: "home", count: 1 };
        streak[home] = { side: "away", count: 1 };
      }
    }
  }
}

function reverseMatch(match: { home: string; away: string }) {
  const oldHome = match.home;
  match.home = match.away;
  match.away = oldHome;
}

export function generateSecondLeg(rodadas: { home: string; away: string }[][]) {
  return rodadas.map((rodada) =>
    rodada.map((match) => ({
      home: match.away,
      away: match.home,
    }))
  );
}

export function shuffleRounds<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
