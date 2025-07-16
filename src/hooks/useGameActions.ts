import { useCallback, useMemo } from 'react';
import { useGameStateStore } from '../store/gameStateStore';
import { usePlayersStore } from '../store/playersStore';
import { useVotingStore } from '../store/votingStore';
import {
  assignCharactersToPlayers as assignCharactersAction,
  canStartGame as canStartGameAction,
  getWinCondition as getWinConditionAction,
  resetGame as resetGameAction,
  startGame as startGameAction
} from '../utils/gameActions';

export const useGameActions = () => {
  // Get store actions (these are stable references)
  const gameStateActions = useGameStateStore((state) => ({
    setCurrentPhase: state.setCurrentPhase,
    nextPhase: state.nextPhase,
    setGameStatus: state.setGameStatus,
  }));

  const playerActions = usePlayersStore((state) => ({
    addPlayer: state.addPlayer,
    removePlayer: state.removePlayer,
    killPlayer: state.killPlayer,
    revivePlayer: state.revivePlayer,
  }));

  const votingActions = useVotingStore((state) => ({
    castVote: state.castVote,
    clearVotes: state.clearVotes,
  }));

  // Memoize the composed actions
  const startGame = useCallback(() => {
    return startGameAction();
  }, []);

  const resetGame = useCallback(() => {
    resetGameAction();
  }, []);

  const assignCharactersToPlayers = useCallback(() => {
    assignCharactersAction();
  }, []);

  const getWinCondition = useCallback(() => {
    return getWinConditionAction();
  }, []);

  const canStartGame = useCallback(() => {
    return canStartGameAction();
  }, []);

  // Memoize all actions to prevent unnecessary re-renders
  return useMemo(() => ({
    // Store actions
    ...gameStateActions,
    ...playerActions,
    ...votingActions,
    
    // Composed actions
    startGame,
    resetGame,
    assignCharactersToPlayers,
    getWinCondition,
    canStartGame,
  }), [
    gameStateActions,
    playerActions,
    votingActions,
    startGame,
    resetGame,
    assignCharactersToPlayers,
    getWinCondition,
    canStartGame,
  ]);
};