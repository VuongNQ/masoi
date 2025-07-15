import type { Character } from "./charactor";

export interface Player {
  id: string;
  name: string;
  character: Character;
  status: PlayerStatus;
}


export const PlayerStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  WAITING: 'WAITING',
} as const;

export type PlayerStatus = typeof PlayerStatus[keyof typeof PlayerStatus];