import { useQuery } from '@tanstack/react-query';
import { fetchPeople } from '../api/swapi';
import { Character } from '../types/swapi';

export function useCharacters(
  page: number,
  searchTerm: string,
  filterType: string,
  filterValue: string
) {
  // Query key includes all params for caching and refetching
  const {
    data,
    isLoading: loading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['characters', page, searchTerm, filterType, filterValue],
    queryFn: async () => {
      const response = await fetchPeople(page, searchTerm);
      let results = response.data.results;
      // Client-side filtering
      if (filterType && filterValue.trim() !== '') {
        const filterValueLower = filterValue.toLowerCase();
        results = results.filter((char: Character) => {
          if (filterType === 'homeworld') {
            return char.homeworld.toLowerCase().includes(filterValueLower);
          } else if (filterType === 'film') {
            return char.films.some((filmUrl) => filmUrl.toLowerCase().includes(filterValueLower));
          } else if (filterType === 'species') {
            return char.species.some((speciesUrl) => speciesUrl.toLowerCase().includes(filterValueLower));
          }
          return true;
        });
      }
      return {
        characters: results,
        totalPages: Math.ceil(response.data.count / 10),
      };
    },
    retry: 1,
    // Remove keepPreviousData (not supported in v5)
  });

  return {
    characters: data?.characters ?? [],
    loading,
    error: isError ? 'Failed to fetch characters. Please try again.' : null,
    totalPages: data?.totalPages ?? 1,
    retry: refetch,
  };
}
