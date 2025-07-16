import type { Character, ActionType } from '../types/charactor';
import type { CharacterAction, NightActionSummary } from '../store/actionHistoryStore';

export const generateActionId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const getActionsByNight = (actionHistory: CharacterAction[], night: number): CharacterAction[] => {
  return actionHistory.filter(action => action.night === night);
};

export const getActionsByCharacter = (actionHistory: CharacterAction[], character: Character): CharacterAction[] => {
  return actionHistory.filter(action => action.character === character);
};

export const getActionsByPlayer = (actionHistory: CharacterAction[], playerId: string): CharacterAction[] => {
  return actionHistory.filter(action => action.playerId === playerId);
};

export const getNightSummary = (actionHistory: CharacterAction[], night: number): NightActionSummary => {
  const nightActions = getActionsByNight(actionHistory, night);

  return {
    night,
    werewolfKills: nightActions.filter(a => a.actionType === 'KILL'),
    protections: nightActions.filter(a => a.actionType === 'PROTECT'),
    heals: nightActions.filter(a => a.actionType === 'HEAL'),
    poisons: nightActions.filter(a => a.actionType === 'POISON'),
    investigations: nightActions.filter(a => a.actionType === 'INVESTIGATE'),
    hunterShots: nightActions.filter(a => a.actionType === 'SHOOT'),
    moonMaidenActions: nightActions.filter(a => a.actionType === 'MOON_POWER'),
    cursedActions: nightActions.filter(a => a.actionType === 'CURSE'),
    bossWolfActions: nightActions.filter(a => a.actionType === 'KILL' && a.character === 'BOSS_WOLF'),
  };
};

export const hasPlayerActed = (actionHistory: CharacterAction[], playerId: string, night: number): boolean => {
  return actionHistory.some(action => 
    action.playerId === playerId && action.night === night
  );
};

export const getWerewolfKills = (actionHistory: CharacterAction[], night: number): CharacterAction[] => {
  return actionHistory.filter(action => 
    action.night === night && action.actionType === 'KILL'
  );
};

export const getProtections = (actionHistory: CharacterAction[], night: number): CharacterAction[] => {
  return actionHistory.filter(action => 
    action.night === night && action.actionType === 'PROTECT'
  );
};

export const getWitchActions = (actionHistory: CharacterAction[], night: number): CharacterAction[] => {
  return actionHistory.filter(action => 
    action.night === night && 
    action.character === 'WITCH' &&
    (action.actionType === 'HEAL' || action.actionType === 'POISON')
  );
};

export const isPlayerProtected = (actionHistory: CharacterAction[], playerId: string, night: number): boolean => {
  return actionHistory.some(action => 
    action.night === night && 
    action.actionType === 'PROTECT' && 
    action.targetId === playerId &&
    action.success
  );
};

export const isPlayerPoisoned = (actionHistory: CharacterAction[], playerId: string, night: number): boolean => {
  return actionHistory.some(action => 
    action.night === night && 
    action.actionType === 'POISON' && 
    action.targetId === playerId &&
    action.success
  );
};

export const canCharacterAct = (actionHistory: CharacterAction[], playerId: string, character: Character, night: number): boolean => {
  const playerActions = actionHistory.filter(action => 
    action.playerId === playerId && action.night === night
  );

  // Most characters can only act once per night
  if (playerActions.length > 0) {
    // Exception: Witch can use both heal and poison in same night (but only once each)
    if (character === 'WITCH') {
      const healUsed = playerActions.some(a => a.actionType === 'HEAL');
      const poisonUsed = playerActions.some(a => a.actionType === 'POISON');
      return !healUsed || !poisonUsed;
    }
    return false;
  }

  // Character-specific rules
  switch (character) {
    case 'WITCH': {
      // Witch can only use heal once per game, poison once per game
      const allWitchActions = getActionsByPlayer(actionHistory, playerId);
      const healUsedBefore = allWitchActions.some(a => a.actionType === 'HEAL');
      const poisonUsedBefore = allWitchActions.some(a => a.actionType === 'POISON');
      return !healUsedBefore || !poisonUsedBefore;
    }
    case 'HUNTER':
      // Hunter can shoot when dying or during day phase
      return true;
    
    default:
      return true;
  }
};

export const validateAction = (
  actionHistory: CharacterAction[], 
  action: Omit<CharacterAction, 'id' | 'timestamp'>
): boolean => {
  // Basic validation
  if (!action.playerId || !action.character || !action.actionType) {
    return false;
  }

  // Check if character can perform this action type
  const validActions: Record<Character, ActionType[]> = {
    WARE_WOLF: ['KILL'],
    BOSS_WOLF: ['KILL', 'BOSS_POWER'],
    VILLAGER: [],
    MOON_MAIDEN: ['MOON_POWER'],
    WITCH: ['HEAL', 'POISON'],
    PROTECTOR: ['PROTECT'],
    HUNTER: ['SHOOT'],
    PROPHET: ['INVESTIGATE'],
    LITTLE_GIRL: ['PEEK'],
    GRUDGE: ['CURSE'],
    CURSED: ['CURSE']
  };

  if (!validActions[action.character]?.includes(action.actionType)) {
    return false;
  }

  // Check if player can act
  if (!canCharacterAct(actionHistory, action.playerId, action.character, action.night)) {
    return false;
  }

  // Target validation - some actions require targets
  const requiresTarget: ActionType[] = ['KILL', 'PROTECT', 'HEAL', 'POISON', 'INVESTIGATE', 'SHOOT', 'CURSE'];
  if (requiresTarget.includes(action.actionType) && !action.targetId) {
    return false;
  }

  return true;
};