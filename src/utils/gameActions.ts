import { useGameStateStore } from "../store/gameStateStore";
import { usePlayersStore } from "../store/playersStore";
import { useCharactersStore } from "../store/charactersStore";
import { useVotingStore } from "../store/votingStore";
import { assignCharacters, checkWinCondition } from "./gameUtils";
import { getCharacterDistribution } from "./rooms";

// Pure function for starting game
export const startGame = (): boolean => {
  const playersStore = usePlayersStore.getState();
  const gameStateStore = useGameStateStore.getState();
  const votingStore = useVotingStore.getState();

  if (playersStore.players.length < gameStateStore.minPlayers) {
    return false;
  }

  // Initialize alive players
  playersStore.initializeAlivePlayers();

  // Clear votes
  votingStore.clearVotes();

  // Set game state
  gameStateStore.setGameStatus("night");
  gameStateStore.setCurrentPhase("night");

  return true;
};

// Pure function for resetting game
export const resetGame = (): void => {
  useGameStateStore.getState().resetGameState();
  usePlayersStore.getState().resetPlayers();
  useCharactersStore.getState().resetCharacters();
  useVotingStore.getState().clearVotes();
};

// Pure function for assigning characters
export const assignCharactersToPlayers = (): void => {
  const playersStore = usePlayersStore.getState();
  const charactersStore = useCharactersStore.getState();

  const playerIds = playersStore.players.map((p) => p.id);
  const distribution = getCharacterDistribution(playersStore.players.length);
  const characters = assignCharacters(playerIds, () => distribution);

  charactersStore.setPlayerCharacters(characters);
};

// Pure function for getting win condition
export const getWinCondition = (): "werewolf" | "villager" | null => {
  const playersStore = usePlayersStore.getState();
  const charactersStore = useCharactersStore.getState();

  return checkWinCondition(
    playersStore.alivePlayers,
    charactersStore.playerCharacters
  );
};

// Pure function for checking if game can start
export const canStartGame = (): boolean => {
  const playersStore = usePlayersStore.getState();
  const gameStateStore = useGameStateStore.getState();

  return playersStore.players.length >= gameStateStore.minPlayers;
};