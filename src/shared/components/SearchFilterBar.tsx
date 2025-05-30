import { useState } from 'react';

interface Props {
  onSearch: (value: string) => void;
  onFilter: (type: string, value: string) => void;
}

function SearchFilterBar({ onSearch, onFilter }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('homeworld');
  const [filterValue, setFilterValue] = useState('');

  const applyAll = (search: string, type: string, value: string) => {
    onSearch(search.trim());
    onFilter(type, value.trim());
  };

  const handleSearchApply = () => {
    applyAll(searchTerm, filterType, filterValue);
  };

  const handleFilterApply = () => {
    applyAll(searchTerm, filterType, filterValue);
  };

  return (
    <div className="mb-8 max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full max-w-md px-5 py-3 rounded-lg border border-gray-300 shadow-sm \
                     focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400\
                     transition duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={handleSearchApply}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearchApply();
          }}
        />
      </div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <select
          className="w-full md:w-40 h-12 px-4 py-2 rounded-lg border border-gray-300 \
                     shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400\
                     transition duration-300"
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            // When filter type changes, reset filterValue and apply
            setFilterValue('');
            applyAll(searchTerm, e.target.value, '');
          }}
        >
          <option value="homeworld">Homeworld</option>
          <option value="film">Film</option>
          <option value="species">Species</option>
        </select>
        <input
          type="text"
          placeholder={`Filter by ${filterType}`}
          className="w-full md:w-64 px-5 py-3 rounded-lg border border-gray-300 \
                     shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400\
                     transition duration-300"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          onBlur={handleFilterApply}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleFilterApply();
          }}
        />
      </div>
      <div className="flex items-center justify-center gap-2 mt-3 text-sm">
        {/* Disclaimer */}
        <div className="flex items-center gap-1 text-gray-400">
          <span>Press</span>
          <kbd className="inline-flex items-center justify-center h-5 px-2 py-0.5 rounded bg-gray-700 text-gray-200 border border-gray-600 shadow-sm text-xs font-mono">
            Enter
          </kbd>
          <span>or click outside to apply</span>
        </div>
        <div className="text-yellow-400 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default SearchFilterBar;
