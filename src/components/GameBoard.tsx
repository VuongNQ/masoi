import { useGameState } from '../hooks/useGameState';
import GameMasterControls from './GameMasterControls';
import NightActions from './NightActions';
import ActionHistory from './ActionHistory';
import { useCharactersStore } from '../store/charactersStore';
import { usePlayersStore } from '../store/playersStore';
import DayVoting from './DayVoting';

const GameBoard = () => {
  const gameState = useGameState();
  const playersData = usePlayersStore((state) => state);
  const charactersData = useCharactersStore((state) => state);

  return (
    <div className="game-board p-4 space-y-6">
      <div className="game-info bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Game Status</h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>Phase: {gameState.currentPhase}</div>
          <div>Day: {gameState.dayCount}</div>
          <div>Players: {playersData.players.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="players-list bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-3">Players</h3>
            <div className="space-y-2">
              {playersData.players.map(player => (
                <div 
                  key={player.id} 
                  className={`p-2 rounded ${
                    playersData.alivePlayers.includes(player.id) 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{player.name}</span>
                    <span className="text-sm">
                      {playersData.alivePlayers.includes(player.id) ? 'Alive' : 'Dead'}
                    </span>
                  </div>
                  {charactersData.playerCharacters[player.id] && (
                    <div className="text-xs mt-1">
                      Character: {charactersData.playerCharacters[player.id]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {gameState.currentPhase === 'night' && (
            <NightActions currentPlayerId={playersData.players[0]?.id || ''} />
          )}

          {gameState.currentPhase === 'day' && (
            <DayVoting />
          )}
        </div>

        <div className="space-y-4">
          <GameMasterControls />
          <ActionHistory />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;