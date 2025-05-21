import { useEffect, useState, useCallback } from 'react';
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
  const [retryCount, setRetryCount] = useState(0);

  const fetchCharacters = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchPeople(page, searchTerm);
      setCharacters(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (e) {
      setError('Failed to fetch characters. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, filterType, filterValue]);

  const retry = useCallback(() => {
    setRetryCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters, retryCount]);

  return { 
    characters, 
    loading, 
    error, 
    totalPages,
    retry, 
    retryCount 
  };
}