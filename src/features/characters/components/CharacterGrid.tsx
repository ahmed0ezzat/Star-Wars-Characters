import type { Character } from '../../../types/swapi';
import CharacterCard from './CharacterCard';

interface CharacterGridProps {
  readonly characters: Character[];
  readonly onSelect: (character: Character) => void;
}

function CharacterGrid({ characters, onSelect }: CharacterGridProps) {
  return (
    <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {characters.map((char, idx) => (
        <button
          key={char.name}
          onClick={() => onSelect(char)}
          className="focus:outline-none group"
        >
          <CharacterCard character={char} imageSeed={idx} />
        </button>
      ))}
    </section>
  );
}

export default CharacterGrid;
