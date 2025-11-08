import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import './PriceChart.css';

/**
 * Component for displaying real-time price chart using TradingView Lightweight Charts
 */
const PriceChart = ({ priceData, token, isConnected, title = 'Trenches API' }) => {
  const chartContainer = useRef(null);
  const chart = useRef(null);
  const candleSeries = useRef(null);
  const candlesData = useRef([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Initialize chart
  useEffect(() => {
    if (!chartContainer.current) return;

    const width = chartContainer.current.clientWidth;
    const height = 400;

    chart.current = createChart(chartContainer.current, {
      layout: {
        textColor: '#d1d5db',
        background: {
          type: 'solid',
          color: '#111827',
        },
      },
      grid: {
        vertLines: {
          color: '#1f2937',
        },
        hLines: {
          color: '#1f2937',
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
      width: width,
      height: height,
    });

    candleSeries.current = chart.current.addCandlestickSeries({
      upColor: '#4caf50',
      downColor: '#f44336',
      borderDownColor: '#f44336',
      borderUpColor: '#4caf50',
      wickDownColor: '#f44336',
      wickUpColor: '#4caf50',
    });

    // Handle window resize
    const handleResize = () => {
      if (chart.current && chartContainer.current) {
        chart.current.applyOptions({
          width: chartContainer.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chart.current) {
        chart.current.remove();
      }
    };
  }, []);

  // Update chart with price data
  useEffect(() => {
    if (!priceData || !candleSeries.current) return;

    try {
      // Extract price from WebSocket message
      // Adjust based on actual API response structure
      const price = priceData.price || priceData.value || 0;
      const timestamp = Math.floor(Date.now() / 1000);

      if (price > 0) {
        setCurrentPrice(price);
        setLastUpdate(new Date().toLocaleTimeString());

        // Calculate price change
        if (candlesData.current.length > 0) {
          const lastCandle = candlesData.current[candlesData.current.length - 1];
          const change = price - lastCandle.close;
          setPriceChange(change);
        }

        // For simplicity, create a new candle for each price update
        // In a real scenario, you might want to aggregate into specific time intervals
        const candle = {
          time: timestamp,
          open: price,
          high: price,
          low: price,
          close: price,
        };

        // Update or add candle
        if (candlesData.current.length === 0) {
          candlesData.current.push(candle);
        } else {
          const lastCandle = candlesData.current[candlesData.current.length - 1];
          if (lastCandle.time === timestamp) {
            // Update existing candle
            lastCandle.high = Math.max(lastCandle.high, price);
            lastCandle.low = Math.min(lastCandle.low, price);
            lastCandle.close = price;
          } else {
            // Add new candle
            candlesData.current.push(candle);
          }
        }

        candleSeries.current.setData(candlesData.current);
        chart.current.timeScale().fitContent();
      }
    } catch (error) {
      console.error('Error updating chart:', error);
    }
  }, [priceData]);

  return (
    <div className="price-chart-container">
      <div className="chart-header">
        <div className="chart-title-section">
          <h3 className="chart-title">{title}</h3>
          {token && <span className="chart-token">{token}</span>}
        </div>
        <div className="chart-status">
          <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '● Connected' : '○ Disconnected'}
          </span>
        </div>
      </div>

      <div className="chart-info">
        <div className="info-box">
          <span className="info-label">Current Price</span>
          <span className="info-value">
            {currentPrice ? currentPrice.toFixed(8) : 'N/A'}
          </span>
        </div>
        <div className="info-box">
          <span className="info-label">Change</span>
          <span className={`info-value ${priceChange >= 0 ? 'positive' : 'negative'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(8)}
          </span>
        </div>
        <div className="info-box">
          <span className="info-label">Last Update</span>
          <span className="info-value">{lastUpdate || 'Waiting...'}</span>
        </div>
      </div>

      <div ref={chartContainer} className="chart-canvas" />
    </div>
  );
};

export default PriceChart;
