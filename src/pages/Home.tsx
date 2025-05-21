import { useState, useEffect } from 'react';
import { useCharacters } from '../hooks/useCharacters';
import CharacterGrid from '../components/CharacterGrid';
import CharacterModal from '../components/CharacterModal';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import ErrorMessage from '../components/ErrorMessage';
import SearchFilterBar from '../components/SearchFilterBar';

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
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Destructure filters for easier passing to hook
  const { searchTerm, filterType, filterValue } = filters;

  // Whenever filters or page changes, fetch characters accordingly
  const { characters, loading, error, totalPages, retry } = useCharacters(
    page,
    searchTerm,
    filterType,
    filterValue
  );

  // Reset page to 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  // Handlers to update filter state
  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, searchTerm: value }));
  };

  const handleFilter = (type: string, value: string) => {
    setFilters((prev) => ({ ...prev, filterType: type, filterValue: value }));
  };

  if (error)
    return <ErrorMessage message={error} onRetry={retry} showRetry={true} />;

  return (
    <>
      {/* <Header /> */}
      <SearchFilterBar onSearch={handleSearch} onFilter={handleFilter} />

      {loading ? (
        <Loader />
      ) : characters.length > 0 ? (
        <>
          <CharacterGrid characters={characters} onSelect={setSelectedCharacter} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      ) : (
        <div className="text-center text-gray-400 py-20">No characters found.</div>
      )}

      {selectedCharacter && (
        <CharacterModal character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
      )}
    </>
  );
}

export default Home;
