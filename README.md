# React + Vite Star Wars Characters Explorer

This project is a React application built with Vite that allows users to search and filter Star Wars characters using the [SWAPI](https://swapi.dev/) API. It features a responsive UI with search and filter capabilities, pagination, and detailed character modals.

## Features

- Search characters by name.
- Filter characters by homeworld, film, or species.
- Pagination to navigate through results.
- Character details modal for more information.
- Loading and error handling states.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm or yarn package manager

### Installation

```bash
git clone https://github.com/ahmed0ezzat/Star-Wars-Characters.git
cd star-wars-explorer
npm install
# or
yarn install
```

### Running the Project

Start the development server with hot module replacement:

```bash
npm run dev
# or
yarn dev
```

Open your browser and go to http://localhost:5173 to view the app.

### Running Tests

### Unit & Integration Tests

Run all tests:

```bash
npm run test
```

- Unit tests are in the same folder as the component (e.g., `Login.test.tsx`, `Home.test.tsx`).
- Uses [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for component tests.

### End-to-End (E2E) Tests

Run Cypress E2E tests:

```bash
npm run cypress
```

- E2E tests are in `cypress/e2e/integration/`.

## Project Structure

The project is organized into the following key directories:

- `src/features/` — Feature-based folders (e.g., `auth`, `characters`) for scalable, modular code.
- `src/shared/components/` — Reusable UI components (Loader, Pagination, ErrorMessage, SearchFilterBar).
- `src/api/` — API logic and data fetching.
- `src/types/` — TypeScript types and interfaces.
- `src/utils/` — Utility functions.

## Testing

### Cypress E2E

- E2E tests are in `cypress/e2e/integration/`.
- Run tests with:

```bash
npm run cypress
```

### Unit/Integration Tests

- Add tests in `src/` using your preferred framework (e.g., Jest, React Testing Library).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT © Ahmed Ezzat
