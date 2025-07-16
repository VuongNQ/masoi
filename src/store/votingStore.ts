import { create } from 'zustand';

interface VotingStore {
  votes: Record<string, string>; // playerId -> votedForPlayerId
  
  // Actions
  castVote: (voterId: string, targetId: string) => void;
  clearVotes: () => void;
}

export const useVotingStore = create<VotingStore>((set) => ({
  votes: {},

  castVote: (voterId, targetId) => set((state) => ({
    votes: { ...state.votes, [voterId]: targetId }
  })),

  clearVotes: () => set({ votes: {} }),
}));