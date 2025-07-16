import { character, type Character } from "../types/charactor";
import type { Player } from "../types/player";

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
): "werewolf" | "villager" | null => {
  const aliveWerewolves = alivePlayers.filter(
    (id) =>
      playerCharacters[id] === "WARE_WOLF" ||
      playerCharacters[id] === "BOSS_WOLF"
  );

  const aliveVillagers = alivePlayers.filter(
    (id) =>
      playerCharacters[id] !== "WARE_WOLF" &&
      playerCharacters[id] !== "BOSS_WOLF"
  );

  if (aliveWerewolves.length === 0) return "villager";
  if (aliveWerewolves.length >= aliveVillagers.length) return "werewolf";
  return null;
};

export const getCharacterDistribution = (
  playerCount: number
): Record<Character, number> => {
  if (playerCount < 5) return {} as Record<Character, number>;

  const distribution: Record<Character, number> = {
    WARE_WOLF: 0,
    BOSS_WOLF: 0,
    VILLAGER: 0,
    MOON_MAIDEN: 0,
    WITCH: 0,
    PROTECTOR: 0,
    HUNTER: 0,
    PROPHET: 0,
    LITTLE_GIRL: 0,
    GRUDGE: 0,
    CURSED: 0,
  };

  // Base characters
  distribution.WARE_WOLF = Math.floor(playerCount / 3);
  distribution.PROPHET = 1;
  distribution.WITCH = 1;
  distribution.HUNTER = 1;
  distribution.PROTECTOR = 1;

  // Special characters based on player count
  if (playerCount >= 8) {
    distribution.MOON_MAIDEN = 1;
  }
  if (playerCount >= 10) {
    distribution.BOSS_WOLF = 1;
    distribution.WARE_WOLF = Math.max(0, distribution.WARE_WOLF - 1);
  }
  if (playerCount >= 12) {
    distribution.LITTLE_GIRL = 1;
  }
  if (playerCount >= 14) {
    distribution.CURSED = 1;
  }

  // Fill remaining with villagers
  const assignedCount = Object.values(distribution).reduce(
    (sum, count) => sum + count,
    0
  );
  distribution.VILLAGER = playerCount - assignedCount;

  return distribution;
};

export const assignCharacters = (
  playerIds: string[],
  characterDistribution: Record<Character, number>
): Record<string, Character> => {
  const characters: Character[] = [];

  // Build character array based on distribution
  Object.entries(characterDistribution).forEach(([character, count]) => {
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

export const canStartGame = (
  players: Player[],
  minPlayers: number
): boolean => {
  return players.length >= minPlayers;
};

export const getPlayerName = (playerId: string, players: Player[]): string => {
  return players.find((p) => p.id === playerId)?.name || "Unknown";
};

export const generatePlayerId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const createPlayer = (name: string): Player => {
  return {
    id: generatePlayerId(),
    name: name.trim(),
    character: character.VILLAGER, // Default character
    status: "WAITING",
  };
};
