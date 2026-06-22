module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2D5016',      // Forest Green
          secondary: '#0077BE',    // Water Blue
          accent: '#D2691E',       // Terracotta/Warm Earth
          tertiary: '#5FA8D3',     // Sky Blue
          sage: '#6B8E23',         // Sage Green
          sand: '#C2B280',         // Natural Sand/Beige
          earth: '#8B4513',        // Rich Earth Brown
        },
      },
      backgroundImage: {
        'gradient-nature': 'linear-gradient(135deg, #2D5016 0%, #0077BE 50%, #D2691E 100%)',
        'gradient-forest': 'linear-gradient(135deg, #1F4D2B 0%, #5FA8D3 100%)',
      },
    },
  },
  plugins: [],
}
