import { useMemo } from 'react';
import { useGameStateStore } from '../store/gameStateStore';
import { getWinCondition, canStartGame } from '../utils/gameActions';

export const useGameState = () => {
  const gameState = useGameStateStore();

  // Memoize computed values
  const winCondition = useMemo(() => {
    return getWinCondition();
  }, []);

  const canStart = useMemo(() => {
    return canStartGame();
  }, []);

  return useMemo(() => ({
    // Game state
    roomId: gameState.roomId,
    gameStatus: gameState.gameStatus,
    currentPhase: gameState.currentPhase,
    currentTurn: gameState.currentTurn,
    dayCount: gameState.dayCount,
    maxPlayers: gameState.maxPlayers,
    minPlayers: gameState.minPlayers,

    // Store actions
    setCurrentPhase: gameState.setCurrentPhase,
    nextPhase: gameState.nextPhase,
    setGameStatus: gameState.setGameStatus,
    resetGameState: gameState.resetGameState,

    // Computed values
    winCondition,
    canStartGame: canStart,
  }), [
    gameState,
    winCondition,
    canStart,
  ]);
};