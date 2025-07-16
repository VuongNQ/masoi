import { useMemo } from "react";
import { useActionHistoryStore } from "../store/actionHistoryStore";
import type { Character } from "../types/charactor";
import {
  getActionsByNight,
  getActionsByCharacter,
  getActionsByPlayer,
  getNightSummary,
  hasPlayerActed,
  getWerewolfKills,
  getProtections,
  getWitchActions,
  isPlayerProtected,
  isPlayerPoisoned,
  canCharacterAct,
  validateAction,
} from "../utils/actionUtils";

// Make sure this is in your hook:
export const useActionHistory = () => {
  const store = useActionHistoryStore();
  
  // Create query functions that use the current state
  const queries = useMemo(() => ({
    getActionsByNight: (night: number) => getActionsByNight(store.actionHistory, night),
    getActionsByCharacter: (character: Character) => getActionsByCharacter(store.actionHistory, character),
    getActionsByPlayer: (playerId: string) => getActionsByPlayer(store.actionHistory, playerId),
    getNightSummary: (night: number) => getNightSummary(store.actionHistory, night),
    hasPlayerActed: (playerId: string, night: number) => hasPlayerActed(store.actionHistory, playerId, night),
    getWerewolfKills: (night: number) => getWerewolfKills(store.actionHistory, night),
    getProtections: (night: number) => getProtections(store.actionHistory, night),
    getWitchActions: (night: number) => getWitchActions(store.actionHistory, night),
    isPlayerProtected: (playerId: string, night: number) => isPlayerProtected(store.actionHistory, playerId, night),
    isPlayerPoisoned: (playerId: string, night: number) => isPlayerPoisoned(store.actionHistory, playerId, night),
    canCharacterAct: (playerId: string, character: Character, night: number) => canCharacterAct(store.actionHistory, playerId, character, night),
    validateAction: (action: any) => validateAction(store.actionHistory, action),
  }), [store.actionHistory]);

  return {
    // State
    actionHistory: store.actionHistory,
    currentNight: store.currentNight,
    
    // Actions
    addAction: store.addAction,
    clearHistory: store.clearHistory,
    setCurrentNight: store.setCurrentNight,
    clearNightActions: store.clearNightActions,
    
    // Query functions
    ...queries,
  };
};