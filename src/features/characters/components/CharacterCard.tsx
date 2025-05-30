import type { Character } from '../../../types/swapi';
import { getSpeciesColor } from '../../../utils/utils';

interface Props {
  readonly character: Character;
  readonly imageSeed: number;
}

const getSpeciesText = (species: string[]) => {
  if (species.length === 0) return 'Human';
  if (species[0].toLowerCase().includes('droid')) return 'Droid';
  return species[0];
};

function CharacterCard({ character, imageSeed }: Props) {
  return (
    <div
      data-testid="character-card"
      className={`${getSpeciesColor(character.species)} rounded-xl overflow-hidden shadow-lg border border-gray-700/50 transition-all duration-300 group-hover:border-yellow-400/50 cursor-pointer`}
      role="group"
      aria-label={`Character card for ${character.name}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <img
          src={`https://picsum.photos/seed/${encodeURIComponent(character.name)}-${imageSeed}/400/400`}
          alt={`Portrait of ${character.name}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 pointer-events-none" />
      </div>
      <div className="p-4">
        <h2
          data-testid="character-name"
          className="text-xl font-bold text-white mb-1 truncate"
          title={character.name}
        >
          {character.name}
        </h2>
        <div className="text-sm text-gray-300 space-y-1">
          <span className="block w-full">{getSpeciesText(character.species)}</span>
          <span className="block w-full">Born: {character.birth_year}</span>
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
