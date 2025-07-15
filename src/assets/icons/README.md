# Character Icons

This folder contains SVG icon components for all character types in the Mafia/Werewolf game.

## Available Icons

- **WereWolfIcon** - For WARE_WOLF character
- **BossWolfIcon** - For BOSS_WOLF character (with crown)
- **VillagerIcon** - For VILLAGER character
- **MoonMaidenIcon** - For MOON_MAIDEN character (with moon and stars)
- **WitchIcon** - For WITCH character (with hat and potion)
- **ProtectorIcon** - For PROTECTOR character (with shield)
- **HunterIcon** - For HUNTER character (with bow and arrow)
- **ProphetIcon** - For PROPHET character (with third eye and crystal ball)
- **LittleGirlIcon** - For LITTLE_GIRL character (with pigtails and teddy bear)
- **GrudgeIcon** - For GRUDGE character (with chains and scars)
- **CursedIcon** - For CURSED character (with cursed marks and dark aura)

## Usage

### Individual Icons

```tsx
import { WereWolfIcon, VillagerIcon } from '../assets/icons';

// Use individual icons
<WereWolfIcon size={24} className="text-red-600" />
<VillagerIcon size={32} className="text-blue-600" />
```

### Using the CharacterIcon Helper Component

```tsx
import { CharacterIcon } from '../assets/icons';
import { character } from '../types/charactor';

// Use the helper component
<CharacterIcon 
  character={character.WARE_WOLF} 
  size={24} 
  className="text-red-600" 
/>
```

### Using the Character Icon Map

```tsx
import { getCharacterIcon } from '../assets/icons';

const IconComponent = getCharacterIcon(character.WITCH);
<IconComponent size={24} className="text-purple-600" />
```

## Props

All icon components accept the following props:

- `size?: number` - Size of the icon (default: 24)
- `className?: string` - CSS classes to apply to the icon

## Styling

Icons use `currentColor` for their main fill, so you can easily change their color using CSS text color classes:

```tsx
<CharacterIcon 
  character={character.WARE_WOLF} 
  className="text-red-600" 
/>
```

## Customization

Each icon is designed as an SVG component, making them:
- Scalable to any size
- Customizable with CSS
- Lightweight and performant
- Accessible with proper ARIA attributes

You can modify the SVG paths in each icon component to customize their appearance.
