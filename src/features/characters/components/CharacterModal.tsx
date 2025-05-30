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
  const [homeworld, setHomeworld] = useState<any>(null);
  const [films, setFilms] = useState<string[]>([]);

  useEffect(() => {
    const fetchHomeworld = async () => {
      if (character.homeworld) {
        const res = await fetchResource(character.homeworld);
        setHomeworld(res.data);
      }
    };

    const fetchFilms = async () => {
      const filmPromises = character.films.map((film) => fetchResource(film));
      const filmData = await Promise.all(filmPromises);
      setFilms(filmData.map((film) => film.data.title));
    };

    fetchHomeworld();
    fetchFilms();
  }, [character.homeworld, character.films]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" data-testid="character-modal">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl border border-gray-700 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/90 text-gray-300 hover:text-white"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="relative p-6 pb-4 border-b border-gray-700">
          <div className="left-6 h-12 w-12 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-yellow-400 mt-2" data-testid="modal-character-name">{character.name}</h2>
          <p className="text-sm text-gray-400 mt-1">Star Wars Character</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <p className="text-xs text-gray-400">Height</p>
              <p className="font-medium" data-testid="modal-character-height">{Number(character.height) / 100} m</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <p className="text-xs text-gray-400">Mass</p>
              <p className="font-medium" data-testid="modal-character-mass">{character.mass} kg</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <p className="text-xs text-gray-400">Birth Year</p>
              <p className="font-medium" data-testid="modal-character-birth-year">{character.birth_year}</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <p className="text-xs text-gray-400">Added</p>
              <p className="font-medium" data-testid="modal-character-created">{dayjs(character.created).format('DD MMM YYYY')}</p>
            </div>
          </div>
          <div className="bg-gray-800/50 p-3 rounded-lg">
            <p className="text-xs text-gray-400">Films Appeared In</p>
            <p className="font-medium" data-testid="modal-character-film-count">{films.length}</p>
            <ul className="list-disc list-inside text-sm text-gray-300 mt-1">
              {films.map((title, idx) => (
                <li key={idx}>{title}</li>
              ))}
            </ul>
          </div>
          {homeworld && (
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 p-4 rounded-lg border border-gray-700/50" data-testid="modal-character-created">
              <h3 className="font-semibold text-yellow-400 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Homeworld
              </h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <p className="text-xs text-gray-400">Name</p>
                  <p className="text-sm" data-testid="modal-homeworld-name">{homeworld.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Terrain</p>
                  <p className="text-sm" data-testid="modal-homeworld-terrain">{homeworld.terrain}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Climate</p>
                  <p className="text-sm" data-testid="modal-homeworld-climate">{homeworld.climate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Population</p>
                  <p className="text-sm" data-testid="modal-homeworld-population">{homeworld.population}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterModal;
