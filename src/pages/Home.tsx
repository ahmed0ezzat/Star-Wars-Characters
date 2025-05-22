import { useState, useEffect } from 'react';
import { useCharacters } from '../hooks/useCharacters';
import CharacterGrid from '../components/CharacterGrid';
import CharacterModal from '../components/CharacterModal';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import ErrorMessage from '../components/ErrorMessage';
import SearchFilterBar from '../components/SearchFilterBar';
import { Character } from '../types/swapi';

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

  const { characters, loading, error, totalPages, retry } = useCharacters(
    page,
    searchTerm,
    filterType,
    filterValue
  );

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, searchTerm: value }));
  };

  const handleFilter = (type: string, value: string) => {
    setFilters((prev) => ({ ...prev, filterType: type, filterValue: value }));
  };

  if (error)
    return <ErrorMessage message={error} onRetry={retry} showRetry={true} />;

  let content;

  if (loading) {
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
