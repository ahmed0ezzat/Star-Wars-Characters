import CharacterCard from './CharacterCard';

interface Character {
    name: string;
    species: string[];
    birth_year: string;
    homeworld: string;
}

interface CharacterGridProps {
  characters: Character[];
  onSelect: (character: Character) => void;
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
