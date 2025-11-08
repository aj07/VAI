import React, { useState } from 'react';
import ApiKeyInput from './ApiKeyInput';
import TokenSelector from './TokenSelector';
import PriceChart from './PriceChart';
import { useWebSocket } from '../hooks/useWebSocket';
import './Dashboard.css';

/**
 * Main Dashboard component
 * Displays real-time token price comparison across providers
 */
const Dashboard = () => {
  const [apiKey, setApiKey] = useState('');
  const [selectedToken, setSelectedToken] = useState('');

  // Hook for Trenches WebSocket
  const trendches = useWebSocket(apiKey, selectedToken);

  const handleApiKeyChange = (newKey) => {
    setApiKey(newKey);
  };

  const handleTokenChange = (newToken) => {
    setSelectedToken(newToken);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Token Price Monitor</h1>
        <p className="dashboard-subtitle">
          Real-time price tracking and comparison across providers
        </p>
      </div>

      {/* API Configuration Section */}
      <div className="config-section">
        <ApiKeyInput onApiKeyChange={handleApiKeyChange} initialApiKey={apiKey} />
        <TokenSelector
          selectedToken={selectedToken}
          onTokenChange={handleTokenChange}
          disabled={!apiKey}
        />
      </div>

      {/* Charts Section - Split Screen View */}
      <div className="charts-section">
        <div className="chart-wrapper">
          <PriceChart
            priceData={trendches.priceData}
            token={selectedToken}
            isConnected={trendches.isConnected}
            title="Trenches API"
          />
        </div>

        <div className="chart-wrapper">
          <div className="price-chart-container placeholder">
            <div className="chart-header">
              <div className="chart-title-section">
                <h3 className="chart-title">Axiom (Coming Soon)</h3>
                {selectedToken && <span className="chart-token">{selectedToken}</span>}
              </div>
              <div className="chart-status">
                <span className="status-indicator disconnected">○ Placeholder</span>
              </div>
            </div>
            <div className="chart-info">
              <div className="info-box">
                <span className="info-label">Current Price</span>
                <span className="info-value">--</span>
              </div>
              <div className="info-box">
                <span className="info-label">Change</span>
                <span className="info-value">--</span>
              </div>
              <div className="info-box">
                <span className="info-label">Last Update</span>
                <span className="info-value">--</span>
              </div>
            </div>
            <div className="placeholder-message">
              <p>Axiom integration coming soon</p>
            </div>
          </div>
        </div>

        <div className="chart-wrapper">
          <div className="price-chart-container placeholder">
            <div className="chart-header">
              <div className="chart-title-section">
                <h3 className="chart-title">GMGN (Coming Soon)</h3>
                {selectedToken && <span className="chart-token">{selectedToken}</span>}
              </div>
              <div className="chart-status">
                <span className="status-indicator disconnected">○ Placeholder</span>
              </div>
            </div>
            <div className="chart-info">
              <div className="info-box">
                <span className="info-label">Current Price</span>
                <span className="info-value">--</span>
              </div>
              <div className="info-box">
                <span className="info-label">Change</span>
                <span className="info-value">--</span>
              </div>
              <div className="info-box">
                <span className="info-label">Last Update</span>
                <span className="info-value">--</span>
              </div>
            </div>
            <div className="placeholder-message">
              <p>GMGN integration coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {trendches.error && (
        <div className="error-message">
          <strong>Connection Error:</strong> {trendches.error}
        </div>
      )}

      {/* Info Panel */}
      <div className="info-panel">
        <h3>Available Token Pairs</h3>
        <div className="token-list">
          <div className="token-item">
            <span className="version v2">V2</span>
            <span className="pair">4/WBNB</span>
          </div>
          <div className="token-item">
            <span className="version v2">V2</span>
            <span className="pair">Giggle/WBNB</span>
          </div>
          <div className="token-item">
            <span className="version v2">V2</span>
            <span className="pair">DOGE/WBNB</span>
          </div>
          <div className="token-item">
            <span className="version v3">V3</span>
            <span className="pair">Aster/USDT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
