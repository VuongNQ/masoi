import type { Character } from '../types/charactor';

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const checkWinCondition = (
  alivePlayers: string[],
  playerCharacters: Record<string, Character>
): 'werewolf' | 'villager' | null => {
  const aliveWerewolves = alivePlayers.filter(id => 
    playerCharacters[id] === 'WARE_WOLF' || 
    playerCharacters[id] === 'BOSS_WOLF'
  );
  const aliveVillagers = alivePlayers.filter(id => 
    playerCharacters[id] !== 'WARE_WOLF' && 
    playerCharacters[id] !== 'BOSS_WOLF'
  );

  if (aliveWerewolves.length === 0) return 'villager';
  if (aliveWerewolves.length >= aliveVillagers.length) return 'werewolf';
  return null;
};

export const assignCharacters = (
  playerIds: string[],
  getCharacterDistribution: (count: number) => Record<Character, number>
): Record<string, Character> => {
  const playerCount = playerIds.length;
  if (playerCount < 5) return {};

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
  
  playerIds.forEach((playerId, index) => {
    playerCharacters[playerId] = shuffledCharacters[index];
  });

  return playerCharacters;
};