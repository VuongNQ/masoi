import { useState } from 'react';
import { useActionHistory } from '../hooks/useActionHistory';
import { useGameState } from '../hooks/useGameState';;
import type { ActionType } from '../types/charactor';
import { useCharactersStore } from '../store/charactersStore';
import { usePlayersStore } from '../store/playersStore';

interface NightActionsProps {
  currentPlayerId: string;
}

const NightActions = ({ currentPlayerId }: NightActionsProps) => {
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<ActionType | ''>('');

  const gameState = useGameState();
  const playersData = usePlayersStore((state) => state);
  const charactersData = useCharactersStore((state) => state);
  const { 
    addAction, 
    canCharacterAct, 
    hasPlayerActed, 
    currentNight 
  } = useActionHistory();

  const currentPlayer = playersData.players.find(p => p.id === currentPlayerId);
  const currentPlayerCharacter = charactersData.playerCharacters[currentPlayerId];

  // Get available actions for current character
  const getAvailableActions = (): ActionType[] => {
    const actionMap: Record<string, ActionType[]> = {
      WARE_WOLF: ['KILL'],
      BOSS_WOLF: ['KILL', 'BOSS_POWER'],
      WITCH: ['HEAL', 'POISON'],
      PROTECTOR: ['PROTECT'],
      HUNTER: ['SHOOT'],
      PROPHET: ['INVESTIGATE'],
      MOON_MAIDEN: ['MOON_POWER'],
      LITTLE_GIRL: ['PEEK'],
      GRUDGE: ['CURSE'],
      CURSED: ['CURSE'],
      VILLAGER: []
    };
    return actionMap[currentPlayerCharacter] || [];
  };

  // Get available targets (exclude self for most actions)
  const getAvailableTargets = () => {
    if (selectedAction === 'HEAL' && currentPlayerCharacter === 'WITCH') {
      return playersData.alivePlayers;
    }
    return playersData.alivePlayers.filter(id => id !== currentPlayerId);
  };

  // Actions that require a target
  const requiresTarget = ['KILL', 'PROTECT', 'HEAL', 'POISON', 'INVESTIGATE', 'SHOOT', 'CURSE'];

  const handlePerformAction = () => {
    if (!selectedAction || !currentPlayerCharacter) return;

    // Check if target is required
    if (requiresTarget.includes(selectedAction) && !selectedTarget) {
      alert('Please select a target');
      return;
    }

    // Check if player can perform this action
    if (!canCharacterAct(currentPlayerId, currentPlayerCharacter, currentNight)) {
      alert('You cannot perform this action');
      return;
    }

    // Add action to history
    addAction({
      playerId: currentPlayerId,
      character: currentPlayerCharacter,
      actionType: selectedAction,
      targetId: selectedTarget || undefined,
      night: currentNight,
      success: true,
      blocked: false,
      description: `${currentPlayerCharacter} used ${selectedAction}${selectedTarget ? ` on ${playersData.players.find(p => p.id === selectedTarget)?.name}` : ''}`
    });

    // Reset selections
    setSelectedAction('');
    setSelectedTarget('');
    alert('Action submitted!');
  };

  // Don't show if not night phase or player is dead
  if (gameState.currentPhase !== 'night' || !playersData.alivePlayers.includes(currentPlayerId)) {
    return null;
  }

  const availableActions = getAvailableActions();
  const availableTargets = getAvailableTargets();
  const hasAlreadyActed = hasPlayerActed(currentPlayerId, currentNight);
  const canAct = currentPlayerCharacter ? canCharacterAct(currentPlayerId, currentPlayerCharacter, currentNight) : false;

  return (
    <div className="night-actions p-4 border rounded-lg bg-gray-900 text-white">
      <h3 className="text-lg font-bold mb-4">
        Night {currentNight} - {currentPlayer?.name} ({currentPlayerCharacter})
      </h3>

      {hasAlreadyActed && (
        <p className="text-green-400 mb-4">✓ You have already acted this night</p>
      )}

      {!canAct && currentPlayerCharacter && (
        <p className="text-red-400 mb-4">You cannot act this night</p>
      )}

      {!currentPlayerCharacter && (
        <p className="text-red-400 mb-4">Character not assigned</p>
      )}

      {canAct && availableActions.length > 0 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Choose Action:</label>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value as ActionType)}
              className="w-full p-2 border rounded bg-gray-800 text-white"
            >
              <option value="">Select an action...</option>
              {availableActions.map(action => (
                <option key={action} value={action}>
                  {action.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {selectedAction && requiresTarget.includes(selectedAction) && (
            <div>
              <label className="block text-sm font-medium mb-2">Choose Target:</label>
              <select
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value)}
                className="w-full p-2 border rounded bg-gray-800 text-white"
              >
                <option value="">Select a target...</option>
                {availableTargets.map(playerId => {
                  const player = playersData.players.find(p => p.id === playerId);
                  return (
                    <option key={playerId} value={playerId}>
                      {player?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          <button
            onClick={handlePerformAction}
            disabled={!selectedAction || (requiresTarget.includes(selectedAction) && !selectedTarget)}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded font-medium"
          >
            Perform Action
          </button>
        </div>
      )}

      {availableActions.length === 0 && currentPlayerCharacter && (
        <p className="text-gray-400">No actions available for your character</p>
      )}
    </div>
  );
};

export default NightActions;