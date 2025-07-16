import { useActionHistory } from "../hooks/useActionHistory";
import { useGameState } from "../hooks/useGameState";
import { useCharactersStore } from "../store/charactersStore";
import { useNightResolutionStore } from "../store/nightResolutionStore";
import { usePlayersStore } from "../store/playersStore";

const GameMasterControls = () => {
  const gameState = useGameState();
  const playersData = usePlayersStore((state) => state);
  const charactersData = useCharactersStore((state) => state);

  const { currentNight, getNightSummary, setCurrentNight } = useActionHistory();
  const { resolveNight, getResolution } = useNightResolutionStore();

  const handleResolveNight = () => {
    const summary = getNightSummary(currentNight);
    const resolution = resolveNight(summary, charactersData.playerCharacters);

    // Apply resolution results to game state
    resolution.kills.forEach((playerId) => {
      playersData.killPlayer(playerId);
    });

    console.log("Night resolved:", resolution);

    // Move to next phase
    gameState.nextPhase();
  };

  const handleNextNight = () => {
    setCurrentNight(currentNight + 1);
    gameState.nextPhase();
  };

  return (
    <div className="gm-controls p-4 border rounded-lg bg-blue-50">
      <h3 className="text-lg font-bold mb-4">Game Master Controls</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Current Phase: {gameState.currentPhase}</span>
          <span>Day: {gameState.dayCount}</span>
          <span>Night: {currentNight}</span>
        </div>

        {gameState.currentPhase === "night" && (
          <button
            onClick={handleResolveNight}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Resolve Night Actions
          </button>
        )}

        {gameState.currentPhase === "day" && (
          <button
            onClick={handleNextNight}
            className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Start Next Night
          </button>
        )}

        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Night {currentNight} Summary:</h4>
          <NightSummaryDisplay night={currentNight} />
        </div>

        {(() => {
          const resolution = getResolution(currentNight);
          if (resolution) {
            return (
              <div className="mt-4 p-3 bg-yellow-100 rounded">
                <h4 className="font-semibold mb-2">
                  Night {currentNight} Resolution:
                </h4>
                <div className="space-y-1 text-sm">
                  <div>Deaths: {resolution.kills.length}</div>
                  <div>Saves: {resolution.saves.length}</div>
                  <div>
                    Investigations:{" "}
                    {Object.keys(resolution.investigations).length}
                  </div>
                  <div>Protections: {resolution.protections.length}</div>
                </div>
              </div>
            );
          }
          return null;
        })()}
      </div>
    </div>
  );
};

const NightSummaryDisplay = ({ night }: { night: number }) => {
  const { getNightSummary } = useActionHistory();

  const playersData = usePlayersStore((state) => state);

  const summary = getNightSummary(night);

  const getPlayerName = (playerId: string) => {
    return (
      playersData.players.find((p) => p.id === playerId)?.name || "Unknown"
    );
  };

  return (
    <div className="space-y-2 text-sm">
      <div>Werewolf Kills: {summary.werewolfKills.length}</div>
      <div>Protections: {summary.protections.length}</div>
      <div>Witch Actions: {summary.heals.length + summary.poisons.length}</div>
      <div>Investigations: {summary.investigations.length}</div>

      {summary.werewolfKills.length > 0 && (
        <div className="text-red-600">
          Targets:{" "}
          {summary.werewolfKills
            .map((k) => getPlayerName(k.targetId!))
            .join(", ")}
        </div>
      )}
    </div>
  );
};

export default GameMasterControls;
