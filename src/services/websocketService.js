/**
 * WebSocket Service for real-time token price updates
 * Connects to trenches-test.velvetdao.xyz WebSocket endpoint
 */

class WebSocketService {
  constructor() {
    this.ws = null;
    this.apiKey = null;
    this.token = null;
    this.messageHandlers = [];
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000; // Start with 1 second
  }

  /**
   * Connect to WebSocket with API key and token
   */
  connect(apiKey, token) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.disconnect();
    }

    this.apiKey = apiKey;
    this.token = token;
    this.reconnectAttempts = 0;

    const wsUrl = `wss://trenches-test.velvetdao.xyz/ws?api_key=${apiKey}`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;

        // Subscribe to token
        if (this.token) {
          this.subscribe(this.token);
        }
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          // Notify all registered handlers
          this.messageHandlers.forEach(handler => handler(data));
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.attemptReconnect();
      };
    } catch (error) {
      console.error('Error creating WebSocket:', error);
      this.attemptReconnect();
    }
  }

  /**
   * Attempt to reconnect with exponential backoff
   */
  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      console.log(`Reconnecting in ${delay}ms... (Attempt ${this.reconnectAttempts})`);

      setTimeout(() => {
        if (this.apiKey && this.token) {
          this.connect(this.apiKey, this.token);
        }
      }, delay);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  /**
   * Subscribe to a token
   */
  subscribe(token) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const message = {
        action: 'subscribe',
        token: token
      };
      this.ws.send(JSON.stringify(message));
      console.log(`Subscribed to token: ${token}`);
    }
  }

  /**
   * Unsubscribe from a token
   */
  unsubscribe(token) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const message = {
        action: 'unsubscribe',
        token: token
      };
      this.ws.send(JSON.stringify(message));
      console.log(`Unsubscribed from token: ${token}`);
    }
  }

  /**
   * Register a message handler
   */
  onMessage(handler) {
    this.messageHandlers.push(handler);

    // Return unsubscribe function
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  /**
   * Disconnect WebSocket
   */
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.messageHandlers = [];
      console.log('WebSocket disconnected');
    }
  }

  /**
   * Get WebSocket state
   */
  isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }
}

// Export singleton instance
export default new WebSocketService();
