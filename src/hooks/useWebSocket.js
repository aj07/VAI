import { useEffect, useState, useCallback } from 'react';
import websocketService from '../services/websocketService';

/**
 * Custom hook for WebSocket connection and message handling
 */
export const useWebSocket = (apiKey, token) => {
  const [isConnected, setIsConnected] = useState(false);
  const [priceData, setPriceData] = useState(null);
  const [error, setError] = useState(null);

  // Handle incoming WebSocket messages
  const handleMessage = useCallback((data) => {
    setPriceData(data);
  }, []);

  // Connect to WebSocket when apiKey or token changes
  useEffect(() => {
    if (apiKey && token) {
      try {
        websocketService.connect(apiKey, token);
        setIsConnected(websocketService.isConnected());
        setError(null);

        // Register message handler
        const unsubscribe = websocketService.onMessage(handleMessage);

        // Check connection status periodically
        const checkInterval = setInterval(() => {
          setIsConnected(websocketService.isConnected());
        }, 1000);

        return () => {
          unsubscribe();
          clearInterval(checkInterval);
        };
      } catch (err) {
        console.error('WebSocket hook error:', err);
        setError(err.message);
      }
    }

    return () => {};
  }, [apiKey, token, handleMessage]);

  return {
    isConnected,
    priceData,
    error
  };
};
