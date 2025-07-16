import type { CharacterAction } from '../store/actionHistoryStore';

export const processProtections = (protections: CharacterAction[]): string[] => {
  return protections
    .filter(p => p.success && p.targetId)
    .map(p => p.targetId!)
    .filter(Boolean);
};

export const processWerewolfKills = (kills: CharacterAction[], protections: CharacterAction[]): string[] => {
  const protectedPlayers = protections
    .filter(p => p.success)
    .map(p => p.targetId)
    .filter(Boolean);

  return kills
    .filter(kill => kill.success && kill.targetId && !protectedPlayers.includes(kill.targetId))
    .map(kill => kill.targetId!)
    .filter(Boolean);
};

export const processWitchActions = (
  heals: CharacterAction[], 
  poisons: CharacterAction[], 
  kills: string[]
): {
  finalKills: string[];
  healed: string[];
  poisoned: string[];
} => {
  let finalKills = [...kills];
  const healed: string[] = [];
  const poisoned: string[] = [];

  // Process heals - can save someone from werewolf kill
  heals.forEach(heal => {
    if (heal.success && heal.targetId && finalKills.includes(heal.targetId)) {
      finalKills = finalKills.filter(id => id !== heal.targetId);
      healed.push(heal.targetId);
    }
  });

  // Process poisons - adds to kill list
  poisons.forEach(poison => {
    if (poison.success && poison.targetId && !finalKills.includes(poison.targetId)) {
      finalKills.push(poison.targetId);
      poisoned.push(poison.targetId);
    }
  });

  return { finalKills, healed, poisoned };
};

export const processInvestigations = (
  investigations: CharacterAction[], 
  playerCharacters: Record<string, string>
): Record<string, 'WEREWOLF' | 'VILLAGER'> => {
  const results: Record<string, 'WEREWOLF' | 'VILLAGER'> = {};
  
  investigations.forEach(investigation => {
    if (investigation.success && investigation.targetId) {
      // Get actual character of investigated player
      const targetCharacter = playerCharacters[investigation.targetId];
      
      // Determine if target is werewolf or villager
      const isWerewolf = targetCharacter === 'WARE_WOLF' || targetCharacter === 'BOSS_WOLF';
      results[investigation.targetId] = isWerewolf ? 'WEREWOLF' : 'VILLAGER';
    }
  });

  return results;
};