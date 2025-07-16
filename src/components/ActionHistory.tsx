import { useActionHistory } from '../hooks/useActionHistory';
import { usePlayersStore } from '../store/playersStore';

const ActionHistory = () => {
  const { currentNight, getActionsByNight, getNightSummary } = useActionHistory();
  const playersData = usePlayersStore((state) => state);

  const getPlayerName = (playerId: string) => {
    return playersData.players.find(p => p.id === playerId)?.name || 'Unknown';
  };

  type Action = {
    id: string;
    playerId: string;
    targetId?: string;
    character: string;
    actionType: string;
    success?: boolean;
    blocked?: boolean;
  };

  const formatActionDescription = (action: Action) => {
    const actorName = getPlayerName(action.playerId);
    const targetName = action.targetId ? getPlayerName(action.targetId) : '';
    
    switch (action.actionType) {
      case 'KILL':
        return `${actorName} (${action.character}) killed ${targetName}`;
      case 'PROTECT':
        return `${actorName} (${action.character}) protected ${targetName}`;
      case 'HEAL':
        return `${actorName} (${action.character}) healed ${targetName}`;
      case 'POISON':
        return `${actorName} (${action.character}) poisoned ${targetName}`;
      case 'INVESTIGATE':
        return `${actorName} (${action.character}) investigated ${targetName}`;
      case 'SHOOT':
        return `${actorName} (${action.character}) shot ${targetName}`;
      default:
        return `${actorName} (${action.character}) used ${action.actionType}`;
    }
  };

  return (
    <div className="action-history p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-bold mb-4">Action History</h3>
      
      {Array.from({ length: currentNight }, (_, i) => i + 1).map(night => {
        const nightActions = getActionsByNight(night);
        const summary = getNightSummary(night);
        
        return (
          <div key={night} className="mb-4 p-3 border rounded bg-white">
            <h4 className="font-semibold mb-2">Night {night}</h4>
            
            {nightActions.length === 0 ? (
              <p className="text-gray-500 text-sm">No actions taken</p>
            ) : (
              <div className="space-y-2">
                {nightActions.map(action => (
                  <div 
                    key={action.id}
                    className={`text-sm p-2 rounded ${
                      action.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    } ${action.blocked ? 'opacity-50' : ''}`}
                  >
                    {formatActionDescription(action)}
                    {action.blocked && <span className="text-red-600"> (Blocked)</span>}
                    {!action.success && <span className="text-red-600"> (Failed)</span>}
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-2 pt-2 border-t text-xs text-gray-600">
              <p>Kills: {summary.werewolfKills.length}, Protections: {summary.protections.length}, Investigations: {summary.investigations.length}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActionHistory;