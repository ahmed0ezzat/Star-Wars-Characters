import { useState } from 'react';
import CharacterGrid from '../features/characters/components/CharacterGrid';
import CharacterModal from '../features/characters/components/CharacterModal';
import { useCharacters } from '../features/characters/hooks/useCharacters';
import Loader from '../shared/components/Loader';
import Pagination from '../shared/components/Pagination';
import ErrorMessage from '../shared/components/ErrorMessage';
import SearchFilterBar from '../shared/components/SearchFilterBar';
import type { Character } from '../types/swapi';

interface Filters {
  searchTerm: string;
  filterType: string;
  filterValue: string;
}

function Home() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    filterType: 'homeworld',
    filterValue: '',
  });
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const { searchTerm, filterType, filterValue } = filters;

  const { data, isLoading, isError, error, refetch } = useCharacters(
    page,
    searchTerm,
    filterType,
    filterValue
  );

  const characters = data?.characters ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleSearch = (value: string) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, searchTerm: value }));
  };

  const handleFilter = (type: string, value: string) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, filterType: type, filterValue: value }));
  };

  if (isError)
    return <ErrorMessage message={String(error)} onRetry={refetch} showRetry={true} />;

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (characters.length > 0) {
    content = (
      <>
        <CharacterGrid characters={characters} onSelect={setSelectedCharacter} />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </>
    );
  } else {
    content = <div className="text-center text-gray-400 py-20">No characters found.</div>;
  }

  return (
    <>
      <SearchFilterBar onSearch={handleSearch} onFilter={handleFilter} />
      {content}
      {selectedCharacter && (
        <CharacterModal character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
      )}
    </>
  );
}

export default Home;
