
import { create } from 'zustand';
import type { Character } from '../types/charactor';

/**
 * not count seer player in total players
 * base on define character type from src/types/charactor.ts
 *
 * when total players 5: werewolf 1, hunter 1, moon maiden 1, witch 1, protector 1
 * when total players 6: werewolf 1, hunter 1, moon maiden 1, witch 1, protector 1, prophet 1
 * when total players 7: werewolf 1, hunter 1, moon maiden 1, witch 1, protector 1, prophet 1, villager 1
 * when total players 8: werewolf 1, hunter 1, moon maiden 1, witch 1, protector 1, prophet 1, villager 1, cursed 1
 * when total players 9: werewolf 2, hunter 1, moon maiden 1, witch 1, protector 1, prophet 1, villager 1, cursed 1
 * when total players 10: werewolf 2, hunter 1, moon maiden 1, witch 1, protector 1, prophet 1, villager 1, cursed 1, little girl 1
 * when total players 11: werewolf 2, hunter 1, moon maiden 1, witch 1, protector 1, prophet 1, villager 2, cursed 1, little girl 1
 * when total players 12: werewolf 3, hunter 1, moon maiden 1, witch 1, protector 1, prophet 1, villager 2, cursed 1, little girl 1
 * when total players 13: werewolf 3, hunter 1, moon maiden 1, witch 1, protector 1, prophet 1, villager 3, cursed 1, little girl 1
 * when total players 14: werewolf 3, hunter 1, moon maiden 1, witch 1, protector 1, prophet 1, villager 3, cursed 1, little girl 1, grudge 1
 * when total players 15: werewolf 3, hunter 1, moon maiden 1, witch 1, protector 1, prophet 1, villager 3, cursed 1, little girl 1, grudge 1, boss wolf 1
 */



interface CharactersStore {
  playerCharacters: Record<string, Character>;
  
  // Actions
  setPlayerCharacters: (characters: Record<string, Character>) => void;
  resetCharacters: () => void;
}

export const useCharactersStore = create<CharactersStore>((set) => ({
  playerCharacters: {},

  setPlayerCharacters: (playerCharacters) => set({ playerCharacters }),
  resetCharacters: () => set({ playerCharacters: {} }),
}));