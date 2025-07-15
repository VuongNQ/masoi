// Character Icons
export { default as WereWolfIcon } from './WereWolfIcon';
export { default as BossWolfIcon } from './BossWolfIcon';
export { default as VillagerIcon } from './VillagerIcon';
export { default as MoonMaidenIcon } from './MoonMaidenIcon';
export { default as WitchIcon } from './WitchIcon';
export { default as ProtectorIcon } from './ProtectorIcon';
export { default as HunterIcon } from './HunterIcon';
export { default as ProphetIcon } from './ProphetIcon';
export { default as LittleGirlIcon } from './LittleGirlIcon';
export { default as GrudgeIcon } from './GrudgeIcon';
export { default as CursedIcon } from './CursedIcon';
export { default as CharacterIcon } from './CharacterIcon';

// Character to Icon mapping
import { character } from '../../types/charactor';
import WereWolfIcon from './WereWolfIcon';
import BossWolfIcon from './BossWolfIcon';
import VillagerIcon from './VillagerIcon';
import MoonMaidenIcon from './MoonMaidenIcon';
import WitchIcon from './WitchIcon';
import ProtectorIcon from './ProtectorIcon';
import HunterIcon from './HunterIcon';
import ProphetIcon from './ProphetIcon';
import LittleGirlIcon from './LittleGirlIcon';
import GrudgeIcon from './GrudgeIcon';
import CursedIcon from './CursedIcon';

export const CharacterIconMap = {
  [character.WARE_WOLF]: WereWolfIcon,
  [character.BOSS_WOLF]: BossWolfIcon,
  [character.VILLAGER]: VillagerIcon,
  [character.MOON_MAIDEN]: MoonMaidenIcon,
  [character.WITCH]: WitchIcon,
  [character.PROTECTOR]: ProtectorIcon,
  [character.HUNTER]: HunterIcon,
  [character.PROPHET]: ProphetIcon,
  [character.LITTLE_GIRL]: LittleGirlIcon,
  [character.GRUDGE]: GrudgeIcon,
  [character.CURSED]: CursedIcon,
};

// Helper function to get icon component by character type
export const getCharacterIcon = (characterType: string) => {
  return CharacterIconMap[characterType as keyof typeof CharacterIconMap] || VillagerIcon;
};
