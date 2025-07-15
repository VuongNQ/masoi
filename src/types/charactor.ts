export const character = {
  WARE_WOLF: "WARE_WOLF",
  BOSS_WOLF: "BOSS_WOLF",
  VILLAGER: "VILLAGER",
  MOON_MAIDEN: "MOON_MAIDEN",
  WITCH: "WITCH",
  PROTECTOR: "PROTECTOR",
  HUNTER: "HUNTER",
  PROPHET: "PROPHET",
  LITTLE_GIRL: "LITTLE_GIRL", // cô bé ti hi'
  GRUDGE: "GRUDGE", // oan nhân
  CURSED : "CURSED",
  // Add other character roles as needed
} as const;

export type Character = typeof character[keyof typeof character];
