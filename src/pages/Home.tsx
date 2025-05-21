import { useState } from 'react';
import { useCharacters } from '../hooks/useCharacters';
import CharacterGrid from '../components/CharacterGrid';
import CharacterModal from '../components/CharacterModal';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import SearchFilterBar from '../components/SearchFilterBar';

function Home() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('homeworld');
  const [filterValue, setFilterValue] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const { characters, loading, error, totalPages, retry } = useCharacters(
    page,
    searchTerm,
    filterType,
    filterValue
  );

  if (error) return <ErrorMessage message={error} onRetry={() => retry()} showRetry={true} />

  return (
      <>
        {/* <Header /> */}
        <SearchFilterBar
              onSearch={(value) => {
                setSearchTerm(value);
                setPage(1);
              }}
              onFilter={(type, value) => {
                setFilterType(type);
                setFilterValue(value);
                setPage(1);
              }}
            /> 
        {loading ? (
          <Loader />
        ):
        characters.length > 0 ? (
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
