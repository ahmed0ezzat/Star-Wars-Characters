import { render, screen, fireEvent } from '@testing-library/react';
import CharacterModal from '../components/CharacterModal';
import { vi } from 'vitest';

const mockCharacter = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  birth_year: '19BBY',
  created: '2014-12-09T13:50:51.644000Z',
  films: ['film1', 'film2'],
  homeworld: 'https://swapi.dev/api/planets/1/',
};

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      name: 'Tatooine',
      terrain: 'desert',
      climate: 'arid',
      population: '200000',
    }),
  })
) as unknown as typeof fetch;

describe('CharacterModal', () => {
  it('renders character info correctly', async () => {
    const handleClose = vi.fn();
    render(<CharacterModal character={mockCharacter} onClose={handleClose} />);

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Height:')).toBeInTheDocument();
    expect(screen.getByText('Mass:')).toBeInTheDocument();
    expect(screen.getByText('Birth Year:')).toBeInTheDocument();
    expect(screen.getByText('Films:')).toBeInTheDocument();
  });
});