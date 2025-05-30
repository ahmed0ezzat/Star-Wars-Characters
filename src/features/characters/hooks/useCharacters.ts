import { fetchPeople } from '../../../api/swapi';
import type { Character } from '../../../types/swapi';
import { useQuery } from '@tanstack/react-query';

export function useCharacters(page: number, searchTerm: string, filterType: string, filterValue: string) {
  return useQuery({
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
  });
}
