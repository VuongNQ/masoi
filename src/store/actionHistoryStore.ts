import { create } from 'zustand';
import type { ActionType, Character } from '../types/charactor';
import { generateActionId, validateAction } from '../utils/actionUtils';

export interface CharacterAction {
  id: string;
  playerId: string;
  character: Character;
  actionType: ActionType;
  targetId?: string;
  night: number;
  timestamp: number;
  success: boolean;
  blocked?: boolean;
  description?: string;
}

export interface NightActionSummary {
  night: number;
  werewolfKills: CharacterAction[];
  protections: CharacterAction[];
  heals: CharacterAction[];
  poisons: CharacterAction[];
  investigations: CharacterAction[];
  hunterShots: CharacterAction[];
  moonMaidenActions: CharacterAction[];
  cursedActions: CharacterAction[];
  bossWolfActions: CharacterAction[];
}

interface ActionHistoryState {
  actionHistory: CharacterAction[];
  currentNight: number;
  
  // State mutation actions only
  addAction: (action: Omit<CharacterAction, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  setCurrentNight: (night: number) => void;
  clearNightActions: (night: number) => void;
}

export const useActionHistoryStore = create<ActionHistoryState>((set, get) => ({
  actionHistory: [],
  currentNight: 1,

  addAction: (action) => {
    const state = get();
    
    // Validate action before adding using pure function
    if (!validateAction(state.actionHistory, action)) {
      console.warn('Invalid action attempted:', action);
      return;
    }

    const newAction: CharacterAction = {
      ...action,
      id: generateActionId(),
      timestamp: Date.now(),
    };

    set({
      actionHistory: [...state.actionHistory, newAction]
    });
  },

  clearHistory: () => {
    set({
      actionHistory: [],
      currentNight: 1
    });
  },

  setCurrentNight: (night) => {
    set({ currentNight: night });
  },

  clearNightActions: (night) => {
    set((state) => ({
      actionHistory: state.actionHistory.filter(action => action.night !== night)
    }));
  },
}));

export default useActionHistoryStore;