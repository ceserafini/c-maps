# C-Maps: Interactive World Map with Search and Country Information

C-Maps is an interactive web application that allows users to explore the world map, search for countries by name, ISO code, or region, and view detailed information about each country. The map uses a terrain-based map style to provide a visually appealing and informative experience.

<p align="center">
  <img src="https://github.com/user-attachments/assets/118843df-9fd0-4aa2-8a86-475a579cc7b1" alt="C-Maps Icon" width="200"/>
</p>


## Features

- **Interactive Map**: Pan and zoom across the world with smooth transitions.
- **Search Functionality**: Search for countries by name, ISO code, or region using an autocomplete search bar.
- **Country Information Panel**: Display detailed country information in a side panel, including the flag, capital, population, and geographic coordinates.
- **Map Styling**: Beautiful terrain-based map style using the Stamen Terrain tile layer.
- **Zoom and Pan Restrictions**: Prevent infinite panning and limit zoom levels to maintain a clean and focused map view.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/c-maps.git
   cd c-maps
   ```

2. **Install dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

### Running the Project

To run the development server:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to view the application.

### Building the Project

To build the project for production:

```bash
npm run build
```

Or with yarn:

```bash
yarn build
```

### Linting and Formatting

The project includes linting and formatting configurations for consistent code quality:

- **Linting**: Run `npm run lint` or `yarn lint` to check for code style issues.
- **Formatting**: Run `npm run format` or `yarn format` to format your code with Prettier.

## Project Structure

```
/src
├── components
│   ├── Map
│   │   ├── LeafletMap.tsx       # Main map component
│   │   ├── CountryInfoPanel.tsx # Side panel for country details
│   ├── SearchPlace.tsx          # Search input component
├── store
│   ├── CountryStore.ts          # Zustand store for state management
├── styles
│   └── globals.css              # Global styles
└── app
    ├── page.tsx                 # Main page entry point
    ├── layout.tsx               # Layout component
```

## Configuration

### Map Settings

- **Map Tile Layer**: The application uses the Stamen Terrain tile layer for a beautiful, terrain-focused map. You can customize the map tile layer in the `LeafletMap` component.
- **Zoom and Bounds**: The map is configured with specific zoom levels and bounds to prevent infinite panning and maintain a clear view.

### Environment Variables

If you decide to use a service like Mapbox that requires an API token, you can store it in a `.env` file:

```env
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your-mapbox-access-token
```

## Contributing

Contributions are welcome! If you have suggestions or find issues, feel free to create a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React Leaflet](https://react-leaflet.js.org/) for the mapping functionality.
- [Stamen Design](http://maps.stamen.com/) for the beautiful terrain map tiles.
- [REST Countries API](https://restcountries.com/) for the country data.
