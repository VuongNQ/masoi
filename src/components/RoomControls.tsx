import { useState } from "react";
import useRoomStore from "../store/roomStore";
import { useWerewolfGameStore } from "../store/gameStore";
import { PlayerStatus, type Player } from "../types/player";
import { character, type Character } from "../types/charactor";
import { CharacterIcon } from "../assets/icons";

const RoomControls = () => {
  const [playerName, setPlayerName] = useState("");

  // Room store
  const {
    roomId,
    maxPlayers,
    // currentPlayers,
    addPlayer: addPlayerToRoom,
    removePlayer: removePlayerFromRoom,
  } = useRoomStore((state) => state);

  // Game store
  const {
    players,
    gameStatus,
    playerCharacters,
    alivePlayers,
    deadPlayers,
    addPlayer: addPlayerToGame,
    removePlayer: removePlayerFromGame,
    assignCharacters,
    startGame,
    resetGame,
    getCharacterDistribution,
    checkWinCondition,
  } = useWerewolfGameStore((state) => state);

  const handleAddPlayer = () => {
    if (!playerName.trim()) {
      alert("Please enter a player name");
      return;
    }

    if (players.length >= maxPlayers) {
      alert("Maximum players reached");
      return;
    }

    if (players.some((p) => p.name === playerName.trim())) {
      alert("Player name already exists");
      return;
    }

    const newPlayer: Player = {
      id: Math.random().toString(36).substr(2, 9),
      name: playerName.trim(),
      character: character.VILLAGER, // Default character
      status: PlayerStatus.WAITING,
    };

    // Add to both stores
    addPlayerToRoom(newPlayer.id);
    addPlayerToGame(newPlayer);
    setPlayerName("");
  };

  const handleRemovePlayer = (playerId: string) => {
    removePlayerFromRoom(playerId);
    removePlayerFromGame(playerId);
  };

  const handleStartGame = () => {
    if (players.length < 5) {
      alert("Need at least 5 players to start");
      return;
    }

    assignCharacters();
    startGame();
  };

  const handleResetGame = () => {
    resetGame();
  };

  const winCondition = checkWinCondition();
  const characterDistribution = getCharacterDistribution(players.length);

  return (
    <div className="room-controls p-4 border rounded-lg bg-gray-50">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Room ID: {roomId || "No Room"}</h2>
        <p className="text-sm text-gray-600">Game Status: {gameStatus}</p>
        {winCondition && (
          <p className="text-lg font-bold text-green-600">
            Winner: {winCondition === "werewolf" ? "Werewolves" : "Villagers"}!
          </p>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">
          Players ({players.length}/{maxPlayers}):
        </h3>

        {players.length === 0 ? (
          <p className="text-gray-500">No players yet</p>
        ) : (
          <div className="space-y-2">
            {players.map((player) => (
              <div
                key={player.id}
                className={`flex items-center justify-between p-2 rounded ${
                  deadPlayers.includes(player.id)
                    ? "bg-red-100 text-red-700"
                    : alivePlayers.includes(player.id)
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{player.name}</span>
                  {playerCharacters[player.id] && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center space-x-1">
                      <CharacterIcon character={playerCharacters[player.id]} size={16} />
                      <span>{playerCharacters[player.id]}</span>
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    ({player.status})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm flex items-center space-x-1">
                    <span>Character:</span>
                    <CharacterIcon character={player.character} size={16} />
                    <span>{player.character}</span>
                  </span>
                  {gameStatus === "waiting" && (
                    <button
                      onClick={() => handleRemovePlayer(player.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Player Section */}
      {gameStatus === "waiting" && (
        <div className="mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter player name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddPlayer();
                }
              }}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddPlayer}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Player
            </button>
          </div>
        </div>
      )}

      {/* Character Distribution Preview */}
      {players.length >= 5 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">
            Character Distribution:
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(characterDistribution).map(
              ([character, count]) =>
                count > 0 && (
                  <div key={character} className="flex justify-between items-center">
                    <span className="flex items-center space-x-1">
                      <CharacterIcon character={character as Character} size={16} />
                      <span>{character.replace("_", " ")}</span>
                    </span>
                    <span className="font-medium">{count}</span>
                  </div>
                )
            )}
          </div>
        </div>
      )}

      {/* Game Control Buttons */}
      <div className="flex space-x-2">
        {gameStatus === "waiting" && (
          <button
            onClick={handleStartGame}
            disabled={players.length < 5}
            className={`px-4 py-2 rounded-md font-medium ${
              players.length < 5
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            }`}
          >
            Start Game
          </button>
        )}

        {gameStatus !== "waiting" && (
          <button
            onClick={handleResetGame}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Reset Game
          </button>
        )}
      </div>

      {/* Game Status Info */}
      {gameStatus !== "waiting" && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Alive Players:</strong> {alivePlayers.length}
            </div>
            <div>
              <strong>Dead Players:</strong> {deadPlayers.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomControls;
