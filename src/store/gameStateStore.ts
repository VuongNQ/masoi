import { create } from 'zustand';

interface GameStateStore {
  roomId: string;
  gameStatus: 'waiting' | 'night' | 'day' | 'voting' | 'finished';
  currentPhase: 'night' | 'day' | 'voting' | 'discussion';
  currentTurn: number;
  dayCount: number;
  maxPlayers: number;
  minPlayers: number;
  
  // Actions
  setRoomId: (roomId: string) => void;
  setGameStatus: (status: 'waiting' | 'night' | 'day' | 'voting' | 'finished') => void;
  setCurrentPhase: (phase: 'night' | 'day' | 'voting' | 'discussion') => void;
  nextPhase: () => void;
  resetGameState: () => void;
}

export const useGameStateStore = create<GameStateStore>((set) => ({
  roomId: '',
  gameStatus: 'waiting',
  currentPhase: 'night',
  currentTurn: 0,
  dayCount: 0,
  maxPlayers: 15,
  minPlayers: 5,

  setRoomId: (roomId) => set({ roomId }),
  setGameStatus: (gameStatus) => set({ gameStatus }),
  setCurrentPhase: (currentPhase) => set({ currentPhase }),
  
  nextPhase: () => set((state) => {
    let nextPhase = state.currentPhase;
    let dayCount = state.dayCount;
    
    switch (state.currentPhase) {
      case 'night':
        nextPhase = 'day';
        break;
      case 'day':
        nextPhase = 'voting';
        break;
      case 'voting':
        nextPhase = 'night';
        dayCount += 1;
        break;
    }

    return {
      currentPhase: nextPhase,
      dayCount,
      gameStatus: nextPhase as 'night' | 'day' | 'voting'
    };
  }),

  resetGameState: () => set({
    gameStatus: 'waiting',
    currentPhase: 'night',
    currentTurn: 0,
    dayCount: 0,
  }),
}));