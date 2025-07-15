import React from 'react';
import type { Character } from '../../types/charactor';
import { getCharacterIcon } from './index';

interface CharacterIconProps {
  character: Character;
  size?: number;
  className?: string;
}

const CharacterIcon: React.FC<CharacterIconProps> = ({ 
  character, 
  size = 24, 
  className = "" 
}) => {
  const IconComponent = getCharacterIcon(character);
  
  return (
    <IconComponent 
      size={size} 
      className={className}
    />
  );
};

export default CharacterIcon;
