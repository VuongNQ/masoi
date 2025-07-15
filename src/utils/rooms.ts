import type { Character } from "../types/charactor";

export const getCharacterDistribution = (playerCount: number): Record<Character, number> => {
  const distribution = {
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

  switch (playerCount) {
    case 5:
      distribution.WARE_WOLF = 1;
      distribution.HUNTER = 1;
      distribution.MOON_MAIDEN = 1;
      distribution.WITCH = 1;
      distribution.PROTECTOR = 1;
      break;
    case 6:
      distribution.WARE_WOLF = 1;
      distribution.HUNTER = 1;
      distribution.MOON_MAIDEN = 1;
      distribution.WITCH = 1;
      distribution.PROTECTOR = 1;
      distribution.PROPHET = 1;
      break;
    case 7:
      distribution.WARE_WOLF = 1;
      distribution.HUNTER = 1;
      distribution.MOON_MAIDEN = 1;
      distribution.WITCH = 1;
      distribution.PROTECTOR = 1;
      distribution.PROPHET = 1;
      distribution.VILLAGER = 1;
      break;
    case 8:
      distribution.WARE_WOLF = 1;
      distribution.HUNTER = 1;
      distribution.MOON_MAIDEN = 1;
      distribution.WITCH = 1;
      distribution.PROTECTOR = 1;
      distribution.PROPHET = 1;
      distribution.VILLAGER = 1;
      distribution.CURSED = 1;
      break;
    case 9:
      distribution.WARE_WOLF = 2;
      distribution.HUNTER = 1;
      distribution.MOON_MAIDEN = 1;
      distribution.WITCH = 1;
      distribution.PROTECTOR = 1;
      distribution.PROPHET = 1;
      distribution.VILLAGER = 1;
      distribution.CURSED = 1;
      break;
    case 10:
      distribution.WARE_WOLF = 2;
      distribution.HUNTER = 1;
      distribution.MOON_MAIDEN = 1;
      distribution.WITCH = 1;
      distribution.PROTECTOR = 1;
      distribution.PROPHET = 1;
      distribution.VILLAGER = 1;
      distribution.CURSED = 1;
      distribution.LITTLE_GIRL = 1;
      break;
    case 11:
      distribution.WARE_WOLF = 2;
      distribution.HUNTER = 1;
      distribution.MOON_MAIDEN = 1;
      distribution.WITCH = 1;
      distribution.PROTECTOR = 1;
      distribution.PROPHET = 1;
      distribution.VILLAGER = 2;
      distribution.CURSED = 1;
      distribution.LITTLE_GIRL = 1;
      break;
    case 12:
      distribution.WARE_WOLF = 3;
      distribution.HUNTER = 1;
      distribution.MOON_MAIDEN = 1;
      distribution.WITCH = 1;
      distribution.PROTECTOR = 1;
      distribution.PROPHET = 1;
      distribution.VILLAGER = 2;
      distribution.CURSED = 1;
      distribution.LITTLE_GIRL = 1;
      break;
    case 13:
      distribution.WARE_WOLF = 3;
      distribution.HUNTER = 1;
      distribution.MOON_MAIDEN = 1;
      distribution.WITCH = 1;
      distribution.PROTECTOR = 1;
      distribution.PROPHET = 1;
      distribution.VILLAGER = 3;
      distribution.CURSED = 1;
      distribution.LITTLE_GIRL = 1;
      break;
    case 14:
      distribution.WARE_WOLF = 3;
      distribution.HUNTER = 1;
      distribution.MOON_MAIDEN = 1;
      distribution.WITCH = 1;
      distribution.PROTECTOR = 1;
      distribution.PROPHET = 1;
      distribution.VILLAGER = 3;
      distribution.CURSED = 1;
      distribution.LITTLE_GIRL = 1;
      distribution.GRUDGE = 1;
      break;
    case 15:
      distribution.WARE_WOLF = 3;
      distribution.HUNTER = 1;
      distribution.MOON_MAIDEN = 1;
      distribution.WITCH = 1;
      distribution.PROTECTOR = 1;
      distribution.PROPHET = 1;
      distribution.VILLAGER = 3;
      distribution.CURSED = 1;
      distribution.LITTLE_GIRL = 1;
      distribution.GRUDGE = 1;
      distribution.BOSS_WOLF = 1;
      break;
    default:
      // Default case for invalid player counts
      break;
  }

  return distribution;
};