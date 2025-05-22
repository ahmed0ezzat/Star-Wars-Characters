import { useEffect, useState, useCallback } from 'react';
import { fetchPeople } from '../api/swapi';
import { Character } from '../types/swapi';

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

      // Raw results from API
      let results = response.data.results;

      // Filter client side by filterType and filterValue if provided
      if (filterType && filterValue.trim() !== '') {
        const filterValueLower = filterValue.toLowerCase();

        results = results.filter((char: Character) => {
          if (filterType === "homeworld") {
            // Homeworld is a URL; you may want to fetch the name or do partial match on URL
            // Assuming you have cached homeworld names or just match URL for demo
            // For example purposes: check if homeworld URL includes filterValue string
            return char.homeworld.toLowerCase().includes(filterValueLower);
          } else if (filterType === "film") {
            // char.films is array of URLs, so filter if any film URL includes filterValue
            return char.films.some((filmUrl) =>
              filmUrl.toLowerCase().includes(filterValueLower)
            );
          } else if (filterType === "species") {
            // char.species is array of URLs, check if any species URL includes filterValue
            return char.species.some((speciesUrl) =>
              speciesUrl.toLowerCase().includes(filterValueLower)
            );
          }
          return true;
        });
      }

      setCharacters(results);
      setTotalPages(Math.ceil(response.data.count / 10)); // count is from API, but this doesn't reflect client filtering
    } catch (e) {
      setError('Failed to fetch characters. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, filterType, filterValue]);

  const retry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
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
  };
}
