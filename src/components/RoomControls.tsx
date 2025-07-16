import { useCallback, useState } from "react";
import { useGameState } from "../hooks/useGameState";
import { useCharactersStore } from "../store/charactersStore";
import { usePlayersStore } from "../store/playersStore";
import useRoomStore from "../store/roomStore";
import {
  assignCharactersToPlayers,
  resetGame,
  startGame,
} from "../utils/gameActions";
import { createPlayer } from "../utils/gameLogic";
// import GameBoard from "./GameBoard";

const RoomControls = () => {
  const [playerName, setPlayerName] = useState("");

  const gameState = useGameState();

  const playersData = usePlayersStore((state) => state);

  const charactersData = useCharactersStore((state) => state);

  const roomStore = useRoomStore((state) => ({
    roomId: state.roomId,
    addPlayer: state.addPlayer,
    removePlayer: state.removePlayer,
  }));

  const handleAddPlayer = useCallback(() => {
    if (!playerName.trim()) {
      alert("Please enter a player name");
      return;
    }

    if (playersData.players.length >= gameState.maxPlayers) {
      alert("Maximum players reached");
      return;
    }

    if (playersData.players.some((p) => p.name === playerName.trim())) {
      alert("Player name already exists");
      return;
    }

    const newPlayer = createPlayer(playerName);
    roomStore.addPlayer(newPlayer.id);
    playersData.addPlayer(newPlayer);
    setPlayerName("");
  }, [playerName, playersData, gameState.maxPlayers, roomStore]);

  const handleRemovePlayer = useCallback(
    (playerId: string) => {
      roomStore.removePlayer(playerId);
      playersData.removePlayer(playerId);
    },
    [roomStore, playersData]
  );

  const handleStartGame = useCallback(() => {
    if (!gameState.canStartGame) {
      alert("Need at least 5 players to start");
      return;
    }

    assignCharactersToPlayers();
    const success = startGame();

    if (!success) {
      alert("Failed to start game");
    }
  }, [gameState.canStartGame]);

  // If game is active, show GameBoard
  if (gameState.gameStatus !== "waiting") {
    return (
      <div className="game-container">
        <div className="game-header p-4 bg-gray-100 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Room ID: {roomStore.roomId}</h2>
              <p className="text-sm text-gray-600">
                Game Status: {gameState.gameStatus}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {gameState.winCondition && (
                <p className="text-lg font-bold text-green-600">
                  Winner:{" "}
                  {gameState.winCondition === "werewolf"
                    ? "Werewolves"
                    : "Villagers"}
                  !
                </p>
              )}
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Reset Game
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Alive Players:</strong> {playersData.alivePlayers.length}
            </div>
            <div>
              <strong>Dead Players:</strong> {playersData.deadPlayers.length}
            </div>
          </div>
        </div>
        {/* <GameBoard /> */}
      </div>
    );
  }

  // Room setup UI
  return (
    <div className="room-controls p-4 border rounded-lg bg-gray-50">
      <div className="mb-4">
        <h2 className="text-xl font-bold">
          Room ID: {roomStore.roomId || "No Room"}
        </h2>
        <p className="text-sm text-gray-600">
          Game Status: {gameState.gameStatus}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">
          Players ({playersData.players.length}/{gameState.maxPlayers}):
        </h3>

        {playersData.players.length === 0 ? (
          <p className="text-gray-500">No players yet</p>
        ) : (
          <div className="space-y-2">
            {playersData.players.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-2 rounded bg-gray-100"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{player.name}</span>
                  {charactersData.playerCharacters[player.id] && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {charactersData.playerCharacters[player.id]}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {gameState.gameStatus === "waiting" && (
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
      {gameState.gameStatus === "waiting" && (
        <div className="mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter player name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddPlayer()}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddPlayer}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Add Player
            </button>
          </div>
        </div>
      )}

      {/* Start Game Button */}
      <button
        onClick={handleStartGame}
        disabled={!gameState.canStartGame}
        className={`w-full px-4 py-2 rounded-md font-medium ${
          !gameState.canStartGame
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        Start Game ({playersData.players.length}/{gameState.minPlayers}{" "}
        minimum)
      </button>
    </div>
  );
};

export default RoomControls;
