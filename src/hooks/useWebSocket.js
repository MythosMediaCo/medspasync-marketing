// src/hooks/useWebSocket.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../services/AuthContext';
import toast from 'react-hot-toast';

export const useWebSocket = (originalUrl, options = {}) => { // Changed param name to originalUrl
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [socket, setSocket] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [readyState, setReadyState] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('Connecting');

  const {
    onOpen,
    onClose,
    onMessage,
    onError,
    shouldReconnect = true,
    reconnectAttempts = 5,
    reconnectInterval = 3000,
    requiresAuth = true
  } = options;

  const reconnectTimeoutId = useRef(null);
  const reconnectCount = useRef(0);

  // Function to get the correct WebSocket URL for Codespaces
  const getCodespaceWsUrl = useCallback((baseHttpUrl, wsPath) => {
    try {
      const urlObj = new URL(baseHttpUrl);
      // Replace http/https with ws/wss
      urlObj.protocol = urlObj.protocol === 'https:' ? 'wss:' : 'ws:';
      // Remove the port if it's explicitly stated and Codespaces handles it
      if (urlObj.port === '3000' || urlObj.port === '8080') { // Assuming typical dev ports
        urlObj.port = ''; // Clear port if it's one Codespaces manages
      }
      // Append the path, ensuring no double slashes
      return `<span class="math-inline">\{urlObj\.href\.replace\(/\\/</span>/, '')}<span class="math-inline">\{wsPath\.startsWith\('/'\) ? '' \: '/'\}</span>{wsPath}`;
    } catch (e) {
      console.error("Failed to construct Codespace WebSocket URL:", e);
      return `${originalUrl.replace(/^http/, 'ws')}`; // Fallback or use original transformed
    }
  }, [originalUrl]);


  const connect = useCallback(() => {
    if (reconnectTimeoutId.current) {
      clearTimeout(reconnectTimeoutId.current);
      reconnectTimeoutId.current = null;
    }

    if (requiresAuth && (!isAuthenticated || !user || authLoading)) {
      setConnectionStatus('Waiting for authentication...');
      setReadyState(3);
      console.log('WebSocket: Waiting for authentication before connecting.');
      return;
    }

    try {
      let wsUrl = originalUrl;
      // Dynamically adjust URL if running in Codespaces (or similar proxy environment)
      // You might set an environment variable like process.env.CODESPACES to detect this
      // For now, assuming you are in Codespaces if URL looks like its forwarded
      if (window.location.hostname.endsWith('.app.github.dev')) {
         wsUrl = getCodespaceWsUrl(window.location.href, '/ws'); // Pass current page URL and WS path
      } else {
         // For local development, assume originalUrl (e.g., ws://localhost:8080/ws)
         wsUrl = originalUrl.replace(/^http/, 'ws');
      }

      if (requiresAuth && user?.token) {
        wsUrl = `<span class="math-inline">\{wsUrl\}?token\=</span>{user.token}`;
      } else if (requiresAuth && (!user || !user.token)) {
          setConnectionStatus('Disconnected: No Auth Token');
          setReadyState(3);
          console.warn('WebSocket: Attempted to connect to authenticated endpoint without a token.');
          return;
      }

      const ws = new WebSocket(wsUrl);

      ws.onopen = (event) => {
        setReadyState(ws.readyState);
        setConnectionStatus('Open');
        reconnectCount.current = 0;
        if (onOpen) onOpen(event);
        console.log('WebSocket: Connected successfully to', wsUrl);
      };

      ws.onclose = (event) => {
        setReadyState(ws.readyState);
        setConnectionStatus('Closed');
        if (onClose) onClose(event);
        console.log('WebSocket: Connection closed.', event.code, event.reason);

        if (shouldReconnect && reconnectCount.current < reconnectAttempts) {
          reconnectCount.current++;
          setConnectionStatus(`Reconnecting (Attempt <span class="math-inline">\{reconnectCount\.current\}/</span>{reconnectAttempts})...`);
          console.log(`WebSocket: Reconnecting (Attempt ${reconnectCount.current})...`);
          reconnectTimeoutId.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        } else if (shouldReconnect && reconnectCount.current >= reconnectAttempts) {
          setConnectionStatus('Reconnection failed. Max attempts reached.');
          console.warn('WebSocket: Max reconnection attempts reached. Giving up.');
          toast.error('WebSocket connection lost. Please refresh the page if issues persist.');
        }
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setLastMessage(message);
          if (onMessage) onMessage(message);
        } catch (parseError) {
          console.error('WebSocket: Failed to parse message:', parseError);
          if (onError) onError(new Error('Failed to parse WebSocket message'));
          toast.error('Received malformed WebSocket message.');
        }
      };

      ws.onerror = (event) => {
        setConnectionStatus('Error');
        console.error('WebSocket error:', event);
        if (onError) onError(event);
        toast.error('WebSocket error encountered.');
        ws.close();
      };

      setSocket(ws);
    } catch (error) {
      console.error('WebSocket connection setup failed:', error);
      setConnectionStatus('Error');
      if (onError) onError(error);
      if (shouldReconnect && reconnectCount.current < reconnectAttempts) {
        reconnectCount.current++;
        reconnectTimeoutId.current = setTimeout(() => {
          setConnectionStatus(`Reconnecting (Attempt <span class="math-inline">\{reconnectCount\.current\}/</span>{reconnectAttempts})...`);
          connect();
        }, reconnectInterval);
      }
    }
  }, [originalUrl, user, isAuthenticated, authLoading, onOpen, onClose, onMessage, onError, shouldReconnect, reconnectAttempts, reconnectInterval, requiresAuth, getCodespaceWsUrl]); // Added getCodespaceWsUrl dependency


  useEffect(() => {
    if (!authLoading && (isAuthenticated || !requiresAuth)) {
      if (!socket || socket.readyState === WebSocket.CLOSED || socket.readyState === WebSocket.CLOSING) {
        connect();
      }
    } else if (!authLoading && requiresAuth && !isAuthenticated) {
        if (socket && socket.readyState === WebSocket.OPEN) {
            disconnect();
        }
        setConnectionStatus('Disconnected: Not Authenticated');
        setReadyState(3);
    }

    return () => {
      if (reconnectTimeoutId.current) {
        clearTimeout(reconnectTimeoutId.current);
      }
      if (socket) {
        socket.close(1000, 'Component unmounted or forced disconnect');
      }
    };
  }, [user, isAuthenticated, authLoading, originalUrl, connect, disconnect, requiresAuth, socket]);

  const sendMessage = useCallback((message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected. Message not sent:', message);
      toast.error('WebSocket not connected. Please refresh or check your internet.');
    }
  }, [socket]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutId.current) {
      clearTimeout(reconnectTimeoutId.current);
      reconnectTimeoutId.current = null;
    }
    if (socket) {
      socket.close(1000, 'Explicit disconnect by client');
      setSocket(null);
      setConnectionStatus('Disconnected');
      setReadyState(3);
    }
  }, [socket]);

  return {
    socket,
    lastMessage,
    readyState,
    connectionStatus,
    sendMessage,
    disconnect
  };
};