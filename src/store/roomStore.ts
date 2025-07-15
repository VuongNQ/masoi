import { create } from "zustand";
import type { RoomSettings } from "../types/room";

interface RoomState {
  roomId: string;
  maxPlayers: number;
  currentPlayers: string[];
  settings: RoomSettings;
  addPlayer: (playerId: string) => void;
  removePlayer: (playerId: string) => void;
  setRoomId: (id: string) => void;
  setMaxPlayers: (max: number) => void;
  updateSettings: (settings: RoomSettings) => void;
}

const useRoomStore = create<RoomState>((set) => ({
  roomId: "",
  maxPlayers: 15,
  currentPlayers: [],
  settings: {
    allowSpectators: false,
    gameDuration: 30, // in minutes
    roomName: "Default Room",
    autoStart: true,
    discussionTime: 60, // in seconds
    votingTime: 60, // in seconds
    nightTime: 60, // in seconds
  },
  addPlayer: (playerId) =>
    set((state) => {
      if (state.currentPlayers.length < state.maxPlayers) {
        return { currentPlayers: [...state.currentPlayers, playerId] };
      }
      return state;
    }),
  removePlayer: (playerId) =>
    set((state) => ({
      currentPlayers: state.currentPlayers.filter((id) => id !== playerId),
    })),
  setRoomId: (id) => set({ roomId: id }),
  setMaxPlayers: (max) => set({ maxPlayers: max }),
  updateSettings: (settings) => set({ settings }),
}));

export default useRoomStore;
