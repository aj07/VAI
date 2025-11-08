import React, { useState } from 'react';
import './ApiKeyInput.css';

/**
 * Component for API Key input
 * User can enter their Trenches API key here
 */
const ApiKeyInput = ({ onApiKeyChange, initialApiKey = '' }) => {
  const [apiKey, setApiKey] = useState(initialApiKey);
  const [showKey, setShowKey] = useState(false);

  const handleChange = (e) => {
    const newKey = e.target.value;
    setApiKey(newKey);
    onApiKeyChange(newKey);
  };

  const handleClear = () => {
    setApiKey('');
    onApiKeyChange('');
  };

  return (
    <div className="api-key-container">
      <div className="api-key-header">
        <h3>API Configuration</h3>
        <p className="warning">⚠️ Keep your API key private. Never commit it to version control.</p>
      </div>

      <div className="api-key-input-group">
        <label htmlFor="apiKey">Trenches API Key</label>
        <div className="input-wrapper">
          <input
            id="apiKey"
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={handleChange}
            placeholder="Enter your Trenches API key"
            className="api-key-input"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="toggle-btn"
            title={showKey ? 'Hide' : 'Show'}
          >
            {showKey ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
      </div>

      {apiKey && (
        <div className="api-key-actions">
          <span className="key-status">✓ API Key Loaded</span>
          <button onClick={handleClear} className="clear-btn">
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;
