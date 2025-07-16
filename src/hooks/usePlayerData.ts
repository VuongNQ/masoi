import { useMemo } from 'react';
import { usePlayersStore } from '../store/playersStore';
import { useCharactersStore } from '../store/charactersStore';
import { getPlayerName } from '../utils/gameLogic';

export const usePlayerData = () => {
  const players = usePlayersStore();
  const characters = useCharactersStore();

  const playerMap = useMemo(() => {
    return players.players.reduce((map, player) => {
      map[player.id] = player;
      return map;
    }, {} as Record<string, typeof players.players[number]>);
  }, [players.players]);

  const getPlayerNameById = useMemo(() => {
    return (playerId: string) => getPlayerName(playerId, players.players);
  }, [players.players]);

  const getPlayerCharacter = useMemo(() => {
    return (playerId: string) => characters.playerCharacters[playerId];
  }, [characters.playerCharacters]);

  const playersWithCharacters = useMemo(() => {
    return players.players.map(player => ({
      ...player,
      character: characters.playerCharacters[player.id],
      isAlive: players.alivePlayers.includes(player.id),
      isDead: players.deadPlayers.includes(player.id),
    }));
  }, [players.players, characters.playerCharacters, players.alivePlayers, players.deadPlayers]);

  const alivePlayersWithCharacters = useMemo(() => {
    return playersWithCharacters.filter(p => p.isAlive);
  }, [playersWithCharacters]);

  const deadPlayersWithCharacters = useMemo(() => {
    return playersWithCharacters.filter(p => p.isDead);
  }, [playersWithCharacters]);

  return {
    players,
    characters,
    playerMap,
    getPlayerNameById,
    getPlayerCharacter,
    playersWithCharacters,
    alivePlayersWithCharacters,
    deadPlayersWithCharacters,
  };
};