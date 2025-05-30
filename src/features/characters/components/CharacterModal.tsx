import { useEffect, useState } from 'react';
import { fetchResource } from '../../../api/swapi';
import dayjs from 'dayjs';

interface CharacterModalProps {
  readonly character: {
    name: string;
    height: string;
    mass: string;
    birth_year: string;
    created: string;
    films: string[];
    homeworld: string;
  };
  readonly onClose: () => void;
}

function CharacterModal({ character, onClose }: CharacterModalProps) {
  const [homeworld, setHomeworld] = useState<string | null>(null);
  const [films, setFilms] = useState<string[]>([]);

  useEffect(() => {
    const fetchHomeworld = async () => {
      if (character.homeworld) {
        const homeworldData = await fetchResource(character.homeworld);
        setHomeworld(homeworldData.name);
      }
    };

    const fetchFilms = async () => {
      const filmPromises = character.films.map((film) => fetchResource(film));
      const filmData = await Promise.all(filmPromises);
      setFilms(filmData.map((film) => film.title));
    };

    fetchHomeworld();
    fetchFilms();
  }, [character.homeworld, character.films]);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{character.name}</h2>
        <p>
          <strong>Height:</strong> {character.height}
        </p>
        <p>
          <strong>Mass:</strong> {character.mass}
        </p>
        <p>
          <strong>Birth Year:</strong> {character.birth_year}
        </p>
        <p>
          <strong>Created:</strong> {dayjs(character.created).format('YYYY-MM-DD')}
        </p>
        <p>
          <strong>Homeworld:</strong> {homeworld}
        </p>
        <p>
          <strong>Films:</strong> {films.join(', ')}
        </p>
      </div>
    </div>
  );
}

export default CharacterModal;
