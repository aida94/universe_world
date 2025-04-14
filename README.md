# Rick & Morty and Pokémon Application

## Project Structure and Architecture

This project follows a clean and modular architecture, organized as follows:

```
app/
├── components/        # Reusable UI components
│   ├── Application/  # App-wide components (header, layout)
│   ├── Character/    # Character-related components
│   └── Display/      # Display mode components
├── composables/      # Shared logic and data handling
├── constants/        # App-wide constants and enums
├── data/
│   └── providers/    # Data providers for different universes
├── pages/           # Route components
└── types/           # TypeScript type definitions
```

### Key Architectural Decisions

#### Data Providers

Each universe (Rick & Morty, Pokémon, etc.) has its own data provider that implements a common interface. This makes adding new universes straightforward without modifying existing code.

#### Composables

- `useCharacterList` and `useCharacterDetails` handle data fetching and processing
- `useViewMode` manages display preferences (grid/list) per universe using localStorage
- `useUniverseProvider` centralizes access to all universe providers

#### State Management

Given the project's simplicity and limited state requirements, I opted not to include a state management library like Pinia. The main state needs are:

1. Character data (handled by composables with `useAsyncData`)
2. Display mode preferences (managed via localStorage per universe)

#### Display Mode Implementation

I implemented a per-universe display mode preference using localStorage:

- Each universe's view mode is stored separately (e.g., "Pokemon-viewMode", "RickAndMorty-viewMode")
- The `useViewMode` composable handles saving and retrieving these preferences
- This approach provides a better user experience by remembering each universe's preferred view

### Adding New Universes

To add a new universe:

1. Create a new provider in `data/providers/`
2. Add the universe ID to `constants/universes.ts`
3. Register the provider in `useUniverseProvider`

The rest of the application will automatically handle the new universe without additional changes.
