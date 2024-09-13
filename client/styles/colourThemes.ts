// src/styles/colorThemes.ts

export const colourThemes = {
  classic: {
    background: '#1a1a2e',
    tileBackground: '#16213e',
    tileBorder: '#0f3460',
    tileText: '#e94560',
    headerText: '#f1f1f1',
    buttonBackground: '#0f3460',
    buttonText: '#f1f1f1',
    backgroundImage: 'url("classic.jpg")',
  },
  neon: {
    background: '#0f0f1a',
    tileBackground: '#1a1a2b',
    tileBorder: '#00ff00',
    tileText: '#00ffff',
    headerText: '#ff00ff',
    buttonBackground: '#2a2a3a',
    buttonText: '#00ff00',
    backgroundImage: 'url("neon.jpg")',
  },
  serene: {
    background: '#a4c3b2',
    tileBackground: '#cce3de',
    tileBorder: '#6b9080',
    tileText: '#2c3e50',
    headerText: '#1d3557',
    buttonBackground: '#6b9080',
    buttonText: '#ffffff',
    backgroundImage: 'url("serene.jpg")',
  },
  earthy: {
    background: '#e0d4ae', // Parchment
    tileBackground: '#d7ccc8', // Light earth
    tileBorder: '#795548', // Dark earth
    tileText: '#33691e', // Forest green
    headerText: '#4e342e', // Dark brown
    buttonBackground: '#ff7043', // Warm orange (fire)
    buttonText: '#ffffff', // White
    backgroundImage: 'url("earthy.jpg")',
  },
  vibrant: {
    background: '#f5f5f5',
    tileBackground: '#ffeb3b',
    tileBorder: '#ff9800',
    tileText: '#4caf50',
    headerText: '#000000',
    buttonBackground: '#ff9800',
    buttonText: '#ffffff',
    backgroundImage: 'url("vibrant.jpg")',
  },
  dusk: {
    background: '#2c3e50',
    tileBackground: '#34495e',
    tileBorder: '#1a2530',
    tileText: '#ecf0f1',
    headerText: '#ffffff',
    buttonBackground: '#1a2530',
    buttonText: '#ecf0f1',
    backgroundImage: 'url("dusk.jpg")',
  },
  sunset: {
    background: '#fff4e6',
    tileBackground: '#ffebcc',
    tileBorder: '#f4a261',
    tileText: '#d64f4f',
    headerText: '#2b2d2f',
    buttonBackground: '#f4a261',
    buttonText: '#ffffff',
    backgroundImage: 'url("sunset.jpg")',
  },
  pastel: {
    background: '#fce4ec', // Light pink
    tileBackground: '#fff9c4', // Light yellow
    tileBorder: '#81d4fa', // Light blue
    tileText: '#7e57c2', // Soft purple
    headerText: '#ff80ab', // Bright pink
    buttonBackground: '#b2ebf2', // Light cyan
    buttonText: '#7e57c2', // Soft purple
    backgroundImage: 'url("pastel.jpg")',
  },
  oceanic: {
    background: '#1a2a6c',
    tileBackground: '#b2ebf2',
    tileBorder: '#0052d4',
    tileText: '#012a4a',
    headerText: '#ffffff',
    buttonBackground: '#0052d4',
    buttonText: '#ffffff',
    backgroundImage: 'url("oceanic.jpg")',
  },
  retro: {
    background: '#faf3e1',
    tileBackground: '#f3e5ab',
    tileBorder: '#fbc02d',
    tileText: '#8d6e63',
    headerText: '#3e2723',
    buttonBackground: '#fbc02d',
    buttonText: '#ffffff',
    backgroundImage: 'url("retro.jpg")',
  },
  forest: {
    background: '#2d3a3a',
    tileBackground: '#7cae7a',
    tileBorder: '#3e5641',
    tileText: '#1b4332',
    headerText: '#b7e4c7',
    buttonBackground: '#3e5641',
    buttonText: '#ffffff',
    backgroundImage: 'url("forest.jpg")',
  },
  coolMint: {
    background: '#1e2a38',
    tileBackground: '#a6e3e9',
    tileBorder: '#3dccc7',
    tileText: '#004d40',
    headerText: '#e3fdfd',
    buttonBackground: '#3dccc7',
    buttonText: '#1e2a38',
    backgroundImage: 'url("coolmint.jpg")',
  },
  warmEmber: {
    background: '#fff3e0',
    tileBackground: '#ffccbc',
    tileBorder: '#ff5722',
    tileText: '#bf360c',
    headerText: '#3e2723',
    buttonBackground: '#ff5722',
    buttonText: '#ffffff',
    backgroundImage: 'url("warmember.jpg")',
  },
}

export type ColourTheme = keyof typeof colourThemes
