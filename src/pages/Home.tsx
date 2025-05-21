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

  const { characters, loading, error, totalPages } = useCharacters(
    page,
    searchTerm,
    filterType,
    filterValue
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        {error && <ErrorMessage message={error} />}
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
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : characters.length > 0 ? (
          <> 
            <CharacterGrid characters={characters} onSelect={setSelectedCharacter} />
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        ) : (
          <div className="text-center text-gray-400 py-20">No characters found.</div>
        )}
      </div>

      {selectedCharacter && (
        <CharacterModal character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
      )}
    </main>
  );
}

export default Home;
