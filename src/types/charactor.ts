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

export type Character = 
  | 'WARE_WOLF'
  | 'BOSS_WOLF'
  | 'VILLAGER'
  | 'MOON_MAIDEN'
  | 'WITCH'
  | 'PROTECTOR'
  | 'HUNTER'
  | 'PROPHET'
  | 'LITTLE_GIRL'
  | 'GRUDGE'
  | 'CURSED';

export const ActionWolf = {
  KILL: "KILL",
} as const;

export type ActionWolf = typeof ActionWolf[keyof typeof ActionWolf];

export const ActionMoonMaiden = {
  MOON_POWER: "MOON_POWER",
} as const;

export type ActionMoonMaiden = typeof ActionMoonMaiden[keyof typeof ActionMoonMaiden];

export const ActionWitch = {
  HEAL: "HEAL",
  POISON: "POISON",
} as const;

export type ActionWitch = typeof ActionWitch[keyof typeof ActionWitch];

export const ActionProtector = {
  PROTECT: "PROTECT",
} as const;

export type ActionProtector = typeof ActionProtector[keyof typeof ActionProtector];

export const ActionHunter = {
  SHOOT: "SHOOT",
} as const;

export type ActionHunter = typeof ActionHunter[keyof typeof ActionHunter];

export const ActionProphet = {
  REVEAL: "REVEAL",
} as const;

export type ActionProphet = typeof ActionProphet[keyof typeof ActionProphet];

export const ActionLittleGirl = {
  WATCH: "WATCH",
} as const;

export type ActionLittleGirl = typeof ActionLittleGirl[keyof typeof ActionLittleGirl];

export const ActionGrudge = {
  REVENGE: "REVENGE",
} as const;

export type ActionGrudge = typeof ActionGrudge[keyof typeof ActionGrudge];

export const ActionCursed = {
  CURSE: "CURSE",
} as const;

export type ActionCursed = typeof ActionCursed[keyof typeof ActionCursed];

export type ActionType = 
  | 'KILL'
  | 'PROTECT'
  | 'HEAL'
  | 'POISON'
  | 'INVESTIGATE'
  | 'SHOOT'
  | 'MOON_POWER'
  | 'PEEK'
  | 'CURSE'
  | 'BOSS_POWER';
