import React, { useCallback, useEffect, useState } from "react";

interface BettingProviderProps {
  race: number;
}

interface BettingContextType {
  bet: number;
  winners: { [key: number]: number };
  setBet: (bet: number) => void;
  setWinner: (participant: number, place: number) => void;
  reset: () => void;
}

export const BettingContext = React.createContext<BettingContextType>({
  bet: 0,
  winners: { 1: 0, 2: 0, 3: 0 },
  setBet: () => null,
  setWinner: () => null,
  reset: () => null,
});

export const BettingProvider: React.ComponentType<BettingProviderProps> = ({
  race,
  children,
}) => {
  const [bet, setBetValue] = useState(0);
  const [winners, setWinners] = useState({ 1: 0, 2: 0, 3: 0 });

  const serializeValues = (value: any) => {
    localStorage.setItem(
      `race${race}`,
      JSON.stringify({ ...{ bet, winners }, ...value })
    );
  };

  const setWinner = (participant: number, place: number) => {
    if (Object.values(winners).includes(participant)) {
      return;
    }

    const value = { ...winners, ...{ [place]: participant } };

    setWinners(value);
    serializeValues({ winners: value });
  };

  const setBet = (bet: number) => {
    const value = Math.max(0, bet);

    setBetValue(value);
    serializeValues({ bet: value });
  };

  const reset = useCallback(() => {
    setBetValue(0);
    setWinners({ 1: 0, 2: 0, 3: 0 });
    localStorage.removeItem(`race${race}`);
  }, [race]);

  const value = {
    bet,
    winners,
    setWinner,
    setBet,
    reset,
  };

  useEffect(() => {
    const raw = localStorage.getItem(`race${race}`);

    if (raw) {
      try {
        const values = JSON.parse(raw);
        setBetValue(values.bet);
        setWinners(values.winners);
      } catch (err) {
        return;
      }
    }
  }, [race]);

  return (
    <BettingContext.Provider value={value}>{children}</BettingContext.Provider>
  );
};
