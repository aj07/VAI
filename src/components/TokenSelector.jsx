import React from 'react';
import './TokenSelector.css';

/**
 * Component for token selection
 * Available tokens: 4/WBNB, Giggle/WBNB, DOGE/WBNB, Aster/USDT
 */
const TokenSelector = ({ selectedToken, onTokenChange, disabled = false }) => {
  const tokens = [
    {
      symbol: '4/WBNB',
      pair: '4 / WBNB',
      type: 'V2'
    },
    {
      symbol: 'Giggle/WBNB',
      pair: 'Giggle / WBNB',
      type: 'V2'
    },
    {
      symbol: 'DOGE/WBNB',
      pair: 'DOGE / WBNB',
      type: 'V2'
    },
    {
      symbol: 'Aster/USDT',
      pair: 'Aster / USDT',
      type: 'V3'
    }
  ];

  return (
    <div className="token-selector-container">
      <label htmlFor="tokenSelect" className="token-label">
        Select Token Pair
      </label>
      <div className="select-wrapper">
        <select
          id="tokenSelect"
          value={selectedToken}
          onChange={(e) => onTokenChange(e.target.value)}
          disabled={disabled}
          className="token-select"
        >
          <option value="">-- Choose a token pair --</option>
          {tokens.map((token) => (
            <option key={token.symbol} value={token.symbol}>
              {token.pair} ({token.type})
            </option>
          ))}
        </select>
      </div>

      {selectedToken && (
        <div className="token-info">
          <div className="info-item">
            <span className="info-label">Selected Pair:</span>
            <span className="info-value">{selectedToken}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Version:</span>
            <span className={`info-value ${tokens.find(t => t.symbol === selectedToken)?.type === 'V2' ? 'v2' : 'v3'}`}>
              {tokens.find(t => t.symbol === selectedToken)?.type}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenSelector;
