import { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { usePlayersStore } from '../store/playersStore';
import { useVotingStore } from '../store/votingStore';

const DayVoting = () => {
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [voterId, setVoterId] = useState<string>('');

  const gameState = useGameState();
  const playersData = usePlayersStore((state) => state);
  const votingData = useVotingStore((state) => state);

  const handleCastVote = () => {
    if (!voterId || !selectedTarget) {
      alert('Please select both voter and target');
      return;
    }

    votingData.castVote(voterId, selectedTarget);
    alert('Vote cast successfully!');
  };

  const getVoteResults = () => {
    const voteCount: Record<string, number> = {};
    Object.values(votingData.votes).forEach(targetId => {
      voteCount[targetId] = (voteCount[targetId] || 0) + 1;
    });
    return voteCount;
  };

  const voteResults = getVoteResults();

  if (gameState.currentPhase !== 'day') {
    return null;
  }

  return (
    <div className="day-voting p-4 border rounded-lg bg-yellow-50">
      <h3 className="text-lg font-bold mb-4">Day {gameState.dayCount} - Voting</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Voter:</label>
          <select
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select voter...</option>
            {playersData.alivePlayers.map(playerId => {
              const player = playersData.players.find(p => p.id === playerId);
              return (
                <option key={playerId} value={playerId}>
                  {player?.name}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Vote Target:</label>
          <select
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select target...</option>
            {playersData.alivePlayers.map(playerId => {
              const player = playersData.players.find(p => p.id === playerId);
              return (
                <option key={playerId} value={playerId}>
                  {player?.name}
                </option>
              );
            })}
          </select>
        </div>

        <button
          onClick={handleCastVote}
          disabled={!voterId || !selectedTarget}
          className="w-full py-2 px-4 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:bg-gray-400"
        >
          Cast Vote
        </button>

        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Current Votes ({votingData.votes.length}):</h4>
          <div className="space-y-1 text-sm">
            {Object.entries(voteResults).map(([targetId, count]) => {
              const player = playersData.players.find(p => p.id === targetId);
              return (
                <div key={targetId} className="flex justify-between">
                  <span>{player?.name}</span>
                  <span className="font-medium">{count} votes</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayVoting;