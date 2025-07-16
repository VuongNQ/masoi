import { create } from 'zustand';
import type { Player } from '../types/player';

interface PlayersStore {
  players: Player[];
  alivePlayers: string[];
  deadPlayers: string[];
  
  // Actions
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  killPlayer: (playerId: string) => void;
  revivePlayer: (playerId: string) => void;
  resetPlayers: () => void;
  initializeAlivePlayers: () => void;
}

export const usePlayersStore = create<PlayersStore>((set) => ({
  players: [],
  alivePlayers: [],
  deadPlayers: [],

  addPlayer: (player) => set((state) => ({
    players: [...state.players, player],
    alivePlayers: [...state.alivePlayers, player.id]
  })),

  removePlayer: (playerId) => set((state) => ({
    players: state.players.filter(p => p.id !== playerId),
    alivePlayers: state.alivePlayers.filter(id => id !== playerId),
    deadPlayers: state.deadPlayers.filter(id => id !== playerId)
  })),

  killPlayer: (playerId) => set((state) => ({
    alivePlayers: state.alivePlayers.filter(id => id !== playerId),
    deadPlayers: [...state.deadPlayers, playerId]
  })),

  revivePlayer: (playerId) => set((state) => ({
    alivePlayers: [...state.alivePlayers, playerId],
    deadPlayers: state.deadPlayers.filter(id => id !== playerId)
  })),

  initializeAlivePlayers: () => set((state) => ({
    alivePlayers: state.players.map(p => p.id),
    deadPlayers: []
  })),

  resetPlayers: () => set({
    players: [],
    alivePlayers: [],
    deadPlayers: []
  }),
}));