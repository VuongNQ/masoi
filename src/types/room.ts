export interface RoomSettings {
  allowSpectators: boolean;
  gameDuration: number;
  roomName: string;
  autoStart: boolean;
  discussionTime: number;
  votingTime: number;
  nightTime: number;
}

export interface Room {
  id: string;
  name: string;
  maxPlayers: number;
  currentPlayers: string[];
  settings: RoomSettings;
  createdAt: Date;
  isActive: boolean;
}