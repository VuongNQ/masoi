import { create } from 'zustand';
import type { Player } from '../types/player';
import type { Character } from '../types/charactor';
import type { NightAction } from '../types/game';
import { getCharacterDistribution } from '../utils/rooms';

interface WerewolfGameState {
  // Game basic info
  roomId: string;
  gameStatus: 'waiting' | 'night' | 'day' | 'voting' | 'finished';
  currentPhase: 'night' | 'day' | 'voting' | 'discussion';
  currentTurn: number;
  dayCount: number;
  
  // Players and Characters
  players: Player[];
  playerCharacters: Record<string, Character>;
  alivePlayers: string[];
  deadPlayers: string[];
  
  // Game actions tracking
  nightActions: Record<string, NightAction>; // playerId -> NightAction
  // Example: { playerId: { action: 'kill', targetId: 'targetId', used: true } }
  votes: Record<string, string>; // playerId -> votedForPlayerId
  
  // Game rules
  maxPlayers: number;
  minPlayers: number;
  
  // Actions
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  assignCharacters: () => void;
  startGame: () => void;
  nextPhase: () => void;
  killPlayer: (playerId: string) => void;
  revivePlayer: (playerId: string) => void;
  castVote: (voterId: string, targetId: string) => void;
  clearVotes: () => void;
  addNightAction: (playerId: string, action: NightAction) => void;
  clearNightActions: () => void;
  resetGame: () => void;
  
  // Game state checks
  checkWinCondition: () => 'werewolf' | 'villager' | null;
  getCharacterDistribution: (playerCount: number) => Record<Character, number>;
}



const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useWerewolfGameStore = create<WerewolfGameState>((set, get) => ({
  // Initial state
  roomId: '',
  gameStatus: 'waiting',
  currentPhase: 'night',
  currentTurn: 0,
  dayCount: 0,
  players: [],
  playerCharacters: {},
  alivePlayers: [],
  deadPlayers: [],
  nightActions: {},
  votes: {},
  maxPlayers: 15,
  minPlayers: 5,

  // Actions
  addPlayer: (player) => set((state) => {
    if (state.players.length >= state.maxPlayers) return state;
    return {
      players: [...state.players, player],
      alivePlayers: [...state.alivePlayers, player.id]
    };
  }),

  removePlayer: (playerId) => set((state) => ({
    players: state.players.filter(p => p.id !== playerId),
    alivePlayers: state.alivePlayers.filter(id => id !== playerId),
    deadPlayers: state.deadPlayers.filter(id => id !== playerId)
  })),

  assignCharacters: () => set((state) => {
    const playerCount = state.players.length;
    if (playerCount < state.minPlayers) return state;

    const distribution = getCharacterDistribution(playerCount);
    const characters: Character[] = [];

    // Build character array based on distribution
    Object.entries(distribution).forEach(([character, count]) => {
      for (let i = 0; i < count; i++) {
        characters.push(character as Character);
      }
    });

    // Shuffle characters and assign to players
    const shuffledCharacters = shuffleArray(characters);
    const playerCharacters: Record<string, Character> = {};
    
    state.players.forEach((player, index) => {
      playerCharacters[player.id] = shuffledCharacters[index];
    });

    return { playerCharacters };
  }),

  startGame: () => set((state) => {
    if (state.players.length < state.minPlayers) return state;
    
    const updatedState = {
      gameStatus: 'night' as const,
      currentPhase: 'night' as const,
      dayCount: 1,
      currentTurn: 0,
      alivePlayers: state.players.map(p => p.id),
      deadPlayers: [],
      nightActions: {},
      votes: {}
    };

    return updatedState;
  }),

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

  killPlayer: (playerId) => set((state) => ({
    alivePlayers: state.alivePlayers.filter(id => id !== playerId),
    deadPlayers: [...state.deadPlayers, playerId]
  })),

  revivePlayer: (playerId) => set((state) => ({
    alivePlayers: [...state.alivePlayers, playerId],
    deadPlayers: state.deadPlayers.filter(id => id !== playerId)
  })),

  castVote: (voterId, targetId) => set((state) => ({
    votes: { ...state.votes, [voterId]: targetId }
  })),

  clearVotes: () => set({ votes: {} }),

  addNightAction: (playerId, action) => set((state) => ({
    nightActions: { ...state.nightActions, [playerId]: action }
  })),

  clearNightActions: () => set({ nightActions: {} }),

  resetGame: () => set({
    gameStatus: 'waiting',
    currentPhase: 'night',
    currentTurn: 0,
    dayCount: 0,
    players: [],
    playerCharacters: {},
    alivePlayers: [],
    deadPlayers: [],
    nightActions: {},
    votes: {}
  }),

  checkWinCondition: () => {
    const state = get();
    const aliveWerewolves = state.alivePlayers.filter(id => 
      state.playerCharacters[id] === 'WARE_WOLF' || 
      state.playerCharacters[id] === 'BOSS_WOLF'
    );
    const aliveVillagers = state.alivePlayers.filter(id => 
      state.playerCharacters[id] !== 'WARE_WOLF' && 
      state.playerCharacters[id] !== 'BOSS_WOLF'
    );

    if (aliveWerewolves.length === 0) return 'villager';
    if (aliveWerewolves.length >= aliveVillagers.length) return 'werewolf';
    return null;
  },

  getCharacterDistribution: (playerCount) => getCharacterDistribution(playerCount)
}));

export default useWerewolfGameStore;