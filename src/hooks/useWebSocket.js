// medspasync-pro/src/hooks/useWebSocket.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../services/AuthContext';
import toast from 'react-hot-toast';

export const useWebSocket = (originalUrl, options = {}) => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [socket, setSocket] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [readyState, setReadyState] = useState(WebSocket.CONNECTING); // Initial state
  const [connectionStatus, setConnectionStatus] = useState('Connecting');

  const {
    onOpen,
    onClose,
    onMessage,
    onError,
    shouldReconnect = true,
    reconnectAttempts = 5,
    reconnectInterval = 3000,
    requiresAuth = true // Option to control if auth is needed for connection
  } = options;

  const reconnectTimeoutId = useRef(null);
  const reconnectCount = useRef(0);
  const isMounted = useRef(false); // To prevent state updates on unmounted component

  // Helper to construct Codespace-compatible WebSocket URL
  const getCodespaceWsUrl = useCallback((baseHttpUrl, wsPath) => {
    try {
      const urlObj = new URL(baseHttpUrl);
      urlObj.protocol = urlObj.protocol === 'https:' ? 'wss:' : 'ws:';
      // Remove the port if it's explicitly stated and Codespaces manages it (e.g., 3000, 8080)
      if (urlObj.port === '3000' || urlObj.port === '8080' || urlObj.port === '5000') { // Added 5000 for backend
        urlObj.port = '';
      }
      return `${urlObj.href.replace(/\/$/, '')}${wsPath.startsWith('/') ? '' : '/'}${wsPath}`;
    } catch (e) {
      console.error("Failed to construct Codespace WebSocket URL:", e);
      return originalUrl.replace(/^http/, 'ws'); // Fallback to a simple transformation
    }
  }, [originalUrl]);

  const connect = useCallback(() => {
    if (!isMounted.current) return; // Prevent connecting if component is unmounted

    if (reconnectTimeoutId.current) {
      clearTimeout(reconnectTimeoutId.current);
      reconnectTimeoutId.current = null;
    }

    // Guard against connecting if auth is required but not ready
    if (requiresAuth && (!isAuthenticated || !user || authLoading)) {
      setConnectionStatus('Waiting for authentication...');
      setReadyState(WebSocket.CLOSED); // Explicitly closed if waiting
      console.log('WebSocket: Waiting for authentication before connecting.');
      return;
    }

    try {
      let wsUrl = originalUrl;
      // Adjust URL for Codespaces/proxied environments
      if (window.location.hostname.endsWith('.app.github.dev') || window.location.hostname.includes('codesandbox.io')) { // Generic check
         // Assumes that if the app is on a codespace URL, the WS endpoint is relative or similar
         // You might need to refine the `wsPath` depending on your backend
         wsUrl = getCodespaceWsUrl(window.location.href, originalUrl.startsWith('/') ? originalUrl : `/${originalUrl.split('://')[1].split('/')[1] || ''}`);
      } else {
         // For local development, assume originalUrl (e.g., ws://localhost:8080/ws)
         wsUrl = originalUrl.replace(/^http/, 'ws');
      }

      // Append token if authentication is required and user has a token
      if (requiresAuth && user?.token) {
        wsUrl = `${wsUrl}?token=${user.token}`;
      } else if (requiresAuth && (!user || !user.token)) {
          // This case should ideally be caught by the earlier `if (requiresAuth && ...)` block,
          // but as a failsafe, prevent connection if no token despite requiring auth.
          setConnectionStatus('Disconnected: No Auth Token');
          setReadyState(WebSocket.CLOSED);
          console.warn('WebSocket: Attempted to connect to authenticated endpoint without a token.');
          return;
      }

      const ws = new WebSocket(wsUrl);
      setSocket(ws);
      setReadyState(WebSocket.CONNECTING);
      setConnectionStatus('Connecting...');

      ws.onopen = (event) => {
        if (!isMounted.current) return ws.close(); // Close if component unmounted prematurely
        setReadyState(WebSocket.OPEN);
        setConnectionStatus('Open');
        reconnectCount.current = 0; // Reset reconnect count on successful connection
        if (onOpen) onOpen(event);
        console.log('WebSocket: Connected successfully to', wsUrl);
      };

      ws.onclose = (event) => {
        if (!isMounted.current && event.code !== 1000) return; // Ignore if unmounted and not normal closure
        setReadyState(WebSocket.CLOSED);
        setConnectionStatus('Closed');
        if (onClose) onClose(event);
        console.log('WebSocket: Connection closed.', event.code, event.reason);

        // Attempt reconnect if enabled and within limits
        if (shouldReconnect && reconnectCount.current < reconnectAttempts && !event.wasClean) { // Only reconnect if not a clean close
          reconnectCount.current++;
          setConnectionStatus(`Reconnecting (Attempt ${reconnectCount.current}/${reconnectAttempts})...`);
          console.log(`WebSocket: Reconnecting (Attempt ${reconnectCount.current})...`);
          reconnectTimeoutId.current = setTimeout(() => {
            if (isMounted.current) connect(); // Only reconnect if still mounted
          }, reconnectInterval);
        } else if (shouldReconnect && reconnectCount.current >= reconnectAttempts) {
          setConnectionStatus('Reconnection failed. Max attempts reached.');
          console.warn('WebSocket: Max reconnection attempts reached. Giving up.');
          toast.error('WebSocket connection lost. Please refresh the page if issues persist.');
        }
      };

      ws.onmessage = (event) => {
        if (!isMounted.current) return;
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
        if (!isMounted.current) return;
        setConnectionStatus('Error');
        console.error('WebSocket error:', event);
        if (onError) onError(event);
        toast.error('WebSocket error encountered.');
        // Closing the socket here will trigger the onclose handler, which handles reconnects
        ws.close();
      };

    } catch (error) {
      console.error('WebSocket connection setup failed:', error);
      setConnectionStatus('Error');
      if (onError) onError(error);
      // Attempt reconnect if the initial connection failed
      if (shouldReconnect && reconnectCount.current < reconnectAttempts) {
        reconnectCount.current++;
        reconnectTimeoutId.current = setTimeout(() => {
          if (isMounted.current) connect();
        }, reconnectInterval);
      }
    }
  }, [originalUrl, user, isAuthenticated, authLoading, onOpen, onClose, onMessage, onError, shouldReconnect, reconnectAttempts, reconnectInterval, requiresAuth, getCodespaceWsUrl]);


  useEffect(() => {
    isMounted.current = true; // Set mounted flag

    // Only attempt to connect if authentication is not loading
    if (!authLoading) {
      // Connect if authentication is not required, OR if it is required AND isAuthenticated
      if (!requiresAuth || isAuthenticated) {
        // Only connect if not already connected or in a closing state
        if (!socket || socket.readyState === WebSocket.CLOSED || socket.readyState === WebSocket.CLOSING) {
          connect();
        }
      } else {
        // If authLoading is false, but it requires auth and isn't authenticated, disconnect if connected
        if (socket && socket.readyState === WebSocket.OPEN) {
          disconnect(); // Ensure it's disconnected
        }
        setConnectionStatus('Disconnected: Not Authenticated');
        setReadyState(WebSocket.CLOSED);
      }
    }

    // Cleanup function: Closes the WebSocket and clears timeout on unmount
    return () => {
      isMounted.current = false; // Unset mounted flag
      if (reconnectTimeoutId.current) {
        clearTimeout(reconnectTimeoutId.current);
      }
      if (socket) {
        socket.close(1000, 'Component unmounted'); // 1000 for normal closure
      }
    };
  }, [user, isAuthenticated, authLoading, originalUrl, connect, disconnect, requiresAuth, socket]); // Include socket in deps to ensure cleanup runs on current instance

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
      setReadyState(WebSocket.CLOSED);
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