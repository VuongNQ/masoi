import { useGameState } from './useGameState';
import { useGameActions } from './useGameActions';
import { usePlayerData } from './usePlayerData';

export const useGame = () => {
  const gameState = useGameState();
  const actions = useGameActions();
  const playerData = usePlayerData();

  return {
    ...gameState,
    ...actions,
    ...playerData,
  };
};

// Legacy compatibility