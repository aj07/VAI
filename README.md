# Token Price Monitor Dashboard

A real-time token price monitoring dashboard built with React and TradingView Lightweight Charts. Monitor token prices across different providers and compare their performance.

## Features

- ⚡ **Real-time Price Updates** via WebSocket connection to Trenches API
- 📊 **TradingView Charts** - Professional-grade candlestick charts
- 🔄 **Multi-Provider Support** - Compare prices across different endpoints (Trenches, Axiom, GMGN)
- 🎯 **Token Selector** - Easy switching between available token pairs
- 🔐 **Secure API Key Handling** - API key stored locally, never committed to repo
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🌙 **Dark Theme UI** - Eye-friendly interface optimized for trading

## Supported Token Pairs

### V2 Trading
- 4/WBNB
- Giggle/WBNB
- DOGE/WBNB

### V3 Trading
- Aster/USDT

## Quick Start

### Prerequisites
- Node.js 14+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd VAI
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (copy from `.env.example`):
```bash
cp .env.example .env.local
```

4. Add your Trenches API key to `.env.local`:
```
VITE_TRENCHES_API_KEY=your_actual_api_key_here
```

### Development

Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

### Preview

Preview the production build locally:
```bash
npm run preview
```

## Usage

1. **Enter API Key**: Paste your Trenches API key in the "API Configuration" section
   - ⚠️ Keep your API key private - it's only stored in your browser memory
   - Never share or commit your API key to version control

2. **Select Token**: Choose a token pair from the dropdown

3. **View Chart**: Real-time price updates will appear on the chart

4. **Compare Providers**: The split-screen view allows side-by-side comparison with other providers

## Architecture

### Components
- `Dashboard.jsx` - Main container component
- `ApiKeyInput.jsx` - API key input with security warnings
- `TokenSelector.jsx` - Token pair selector dropdown
- `PriceChart.jsx` - Real-time chart using TradingView Lightweight Charts

### Hooks
- `useWebSocket.js` - Custom hook for WebSocket connection and message handling

### Services
- `websocketService.js` - Manages WebSocket connection, reconnection logic, and message routing

## Security

- 🔒 API keys are stored in memory only (not in localStorage or Redux)
- 🚫 Environment variables are never exposed to the client at build time
- 📋 `.env` files are in `.gitignore` - they're never committed
- ✅ Use `.env.example` as a template for setting up your local environment

## Configuration

### API Endpoints
- **Trenches WebSocket**: `wss://trenches-test.velvetdao.xyz/ws`
- **Health Check**: `https://trenches-test.velvetdao.xyz/health`

### Environment Variables
Create a `.env.local` file in the root directory:
```
VITE_TRENCHES_API_KEY=your_api_key_here
```

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool and dev server
- **TradingView Lightweight Charts** - Charting library
- **WebSocket API** - Real-time data streaming
- **CSS3** - Styling with gradients and animations

## Deployment

### GitHub Pages
To deploy to GitHub Pages:

1. Update `vite.config.js` with your repository name:
```javascript
export default {
  base: '/repository-name/',
  // ... other config
}
```

2. Build the project:
```bash
npm run build
```

3. Deploy using GitHub Pages workflow (configure in repository settings)

## Troubleshooting

### WebSocket Connection Issues
- Ensure your API key is valid and has WebSocket access
- Check that the Trenches API service is operational
- Verify your network connection and firewall settings

### Chart Not Updating
- Check browser console for WebSocket errors
- Verify token pair is correctly selected
- Ensure API key is properly configured

### Build Issues
- Delete `node_modules` and `package-lock.json`, then run `npm install`
- Clear browser cache and restart dev server
- Check Node.js version compatibility

## Contributing

Contributions are welcome! Please follow these guidelines:
- Keep API keys and sensitive data out of commits
- Test all changes locally before submitting
- Document any new features or changes

## License

MIT - Feel free to use this project for any purpose

## Support

For issues and questions:
1. Check the Trenches API documentation
2. Review WebSocket connection logs in browser console
3. Ensure `.env.local` is properly configured
