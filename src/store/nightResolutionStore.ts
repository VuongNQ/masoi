import { create } from 'zustand';
import {
  processInvestigations,
  processProtections,
  processWerewolfKills,
  processWitchActions
} from '../utils/nightResolution';
import type { NightActionSummary } from './actionHistoryStore';

export interface NightResolution {
  night: number;
  kills: string[]; // Player IDs who died
  saves: string[]; // Player IDs who were saved
  investigations: Record<string, 'WEREWOLF' | 'VILLAGER'>; // Prophet results
  protections: string[]; // Player IDs who were protected
  poisoned: string[]; // Player IDs who were poisoned
  healed: string[]; // Player IDs who were healed
  blocked: string[]; // Player IDs whose actions were blocked
  resolved: boolean;
}

interface NightResolutionState {
  resolutions: NightResolution[];
  
  // Actions
  resolveNight: (nightSummary: NightActionSummary, playerCharacters: Record<string, unknown>) => NightResolution;
  getResolution: (night: number) => NightResolution | undefined;
  clearResolutions: () => void;
}

export const useNightResolutionStore = create<NightResolutionState>((set, get) => ({
  resolutions: [],

  resolveNight: (nightSummary, playerCharacters) => {
    const state = get();
    
    // Process protections first
    const protectedPlayers = processProtections(nightSummary.protections);
    
    // Process werewolf kills considering protections
    const werewolfKills = processWerewolfKills(nightSummary.werewolfKills, nightSummary.protections);
    
    // Process witch actions
    const witchResult = processWitchActions(nightSummary.heals, nightSummary.poisons, werewolfKills);
    
    // Process investigations
    const investigations = processInvestigations(
      nightSummary.investigations,
      playerCharacters as Record<string, string>
    );
    
    const resolution: NightResolution = {
      night: nightSummary.night,
      kills: witchResult.finalKills,
      saves: witchResult.healed,
      investigations,
      protections: protectedPlayers,
      poisoned: witchResult.poisoned,
      healed: witchResult.healed,
      blocked: [], // TODO: Implement blocking logic if needed
      resolved: true,
    };

    set({
      resolutions: [...state.resolutions, resolution]
    });

    return resolution;
  },

  getResolution: (night) => {
    const state = get();
    return state.resolutions.find(r => r.night === night);
  },

  clearResolutions: () => {
    set({ resolutions: [] });
  },
}));

export default useNightResolutionStore;