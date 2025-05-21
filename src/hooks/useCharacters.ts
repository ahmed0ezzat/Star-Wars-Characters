import { useEffect, useState } from 'react';
import { fetchPeople } from '../api/swapi';

interface Character {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  created: string;
  films: string[];
  homeworld: string;
  species: string[];
  url: string;
}

export function useCharacters(
  page: number,
  searchTerm: string,
  filterType: string,
  filterValue: string
) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await fetchPeople(page, searchTerm);
        setCharacters(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10));
        setError('');
      } catch (e) {
        setError('Failed to fetch characters');
      } finally {
        setLoading(false);
      }
    };
  
    fetch();
  }, [page, searchTerm, filterType, filterValue]);
  

  return { characters, loading, error, totalPages };
}
