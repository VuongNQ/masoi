import type { Player } from './player';
import type { Character } from './charactor';

export interface GameState {
  roomId: string;
  gameStatus: 'waiting' | 'night' | 'day' | 'voting' | 'finished';
  currentPhase: 'night' | 'day' | 'voting' | 'discussion';
  currentTurn: number;
  dayCount: number;
  players: Player[];
  playerCharacters: Record<string, Character>;
  alivePlayers: string[];
  deadPlayers: string[];
  nightActions: Record<string, NightAction>;
  votes: Record<string, string>;
  maxPlayers: number;
  minPlayers: number;
}

export interface NightAction {
  playerId: string;
  action: 'kill' | 'protect' | 'heal' | 'poison' | 'investigate';
  targetId?: string;
  used?: boolean;
}

export interface VoteResult {
  playerId: string;
  votes: number;
  voters: string[];
}