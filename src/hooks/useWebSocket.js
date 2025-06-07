// medspasync-frontend-main/src/hooks/useWebSocket.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../services/AuthContext'; // Updated import path
import toast from 'react-hot-toast'; // Import toast for user feedback

export const useWebSocket = (url, options = {}) => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth(); // Get authLoading state
  const [socket, setSocket] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [readyState, setReadyState] = useState(0); // 0: CONNECTING, 1: OPEN, 2: CLOSING, 3: CLOSED
  const [connectionStatus, setConnectionStatus] = useState('Connecting');

  const {
    onOpen,
    onClose,
    onMessage,
    onError,
    shouldReconnect = true,
    reconnectAttempts = 5,
    reconnectInterval = 3000,
    requiresAuth = true // New option: set to false for public WebSockets
  } = options;

  const reconnectTimeoutId = useRef(null);
  const reconnectCount = useRef(0);

  const connect = useCallback(() => {
    // Clear any pending reconnection attempts
    if (reconnectTimeoutId.current) {
      clearTimeout(reconnectTimeoutId.current);
      reconnectTimeoutId.current = null;
    }

    // IMPORTANT: Check authentication status and user data BEFORE attempting connection
    if (requiresAuth && (!isAuthenticated || !user || authLoading)) {
      setConnectionStatus('Waiting for authentication...');
      setReadyState(3); // Closed state until auth is confirmed
      console.log('WebSocket: Waiting for authentication before connecting.');
      return; // Do not proceed with connection
    }

    try {
      // Conditionally add token based on 'requiresAuth' and user availability
      let wsUrl = url;
      if (requiresAuth && user?.token) {
        wsUrl = `${url}?token=${user.token}`;
      } else if (requiresAuth && (!user || !user.token)) {
          // If auth is required but no token, don't try to connect yet
          setConnectionStatus('Disconnected: No Auth Token');
          setReadyState(3);
          console.warn('WebSocket: Attempted to connect to authenticated endpoint without a token.');
          return;
      }
      // If requiresAuth is false, just use the provided URL without a token

      const ws = new WebSocket(wsUrl);

      ws.onopen = (event) => {
        setReadyState(ws.readyState);
        setConnectionStatus('Open');
        reconnectCount.current = 0; // Reset reconnect count on successful connection
        if (onOpen) onOpen(event);
        console.log('WebSocket: Connected successfully.');
      };

      ws.onclose = (event) => {
        setReadyState(ws.readyState);
        setConnectionStatus('Closed');
        if (onClose) onClose(event);
        console.log('WebSocket: Connection closed.', event.code, event.reason);

        // Attempt reconnect if enabled and within limits
        if (shouldReconnect && reconnectCount.current < reconnectAttempts) {
          reconnectCount.current++;
          setConnectionStatus(`Reconnecting (Attempt ${reconnectCount.current}/${reconnectAttempts})...`);
          console.log(`WebSocket: Reconnecting (Attempt ${reconnectCount.current})...`);
          reconnectTimeoutId.current = setTimeout(() => {
            connect(); // Attempt to reconnect
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
        // Closing the socket here will trigger the onclose handler, which handles reconnects
        ws.close();
      };

      setSocket(ws);
    } catch (error) {
      console.error('WebSocket connection setup failed:', error);
      setConnectionStatus('Error');
      if (onError) onError(error);
      // Attempt reconnect if the initial connection failed (e.g. invalid URL or initial network issue)
      if (shouldReconnect && reconnectCount.current < reconnectAttempts) {
        reconnectCount.current++;
        reconnectTimeoutId.current = setTimeout(() => {
          setConnectionStatus(`Reconnecting (Attempt ${reconnectCount.current}/${reconnectAttempts})...`);
          connect();
        }, reconnectInterval);
      }
    }
  }, [url, user, isAuthenticated, authLoading, onOpen, onClose, onMessage, onError, shouldReconnect, reconnectAttempts, reconnectInterval, requiresAuth]);


  useEffect(() => {
    // Only attempt to connect if authentication is not loading AND (it's authenticated OR it doesn't require auth)
    // This prevents connection attempts while auth status is unknown (isLoading is true)
    if (!authLoading && (isAuthenticated || !requiresAuth)) {
      // If a socket exists but is closed or closing, or if no socket, try to connect
      if (!socket || socket.readyState === WebSocket.CLOSED || socket.readyState === WebSocket.CLOSING) {
        connect();
      }
    } else if (!authLoading && requiresAuth && !isAuthenticated) {
        // If authLoading is false, but it requires auth and isn't authenticated, disconnect if connected
        if (socket && socket.readyState === WebSocket.OPEN) {
            disconnect(); // Ensure it's disconnected
        }
        setConnectionStatus('Disconnected: Not Authenticated');
        setReadyState(3);
    }

    // Cleanup function
    return () => {
      if (reconnectTimeoutId.current) {
        clearTimeout(reconnectTimeoutId.current);
      }
      if (socket) {
        socket.close(1000, 'Component unmounted or forced disconnect'); // 1000 is normal closure
      }
    };
  }, [user, isAuthenticated, authLoading, url, connect, disconnect, requiresAuth, socket]); // Added socket to dependencies of useEffect for proper cleanup control

  const sendMessage = useCallback((message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected. Message not sent:', message);
      toast.error('WebSocket not connected. Please refresh or check your internet.'); // User feedback
    }
  }, [socket]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutId.current) {
      clearTimeout(reconnectTimeoutId.current);
      reconnectTimeoutId.current = null;
    }
    if (socket) {
      // Attempt to close cleanly, setting a code and reason
      socket.close(1000, 'Explicit disconnect by client'); // 1000 is normal closure
      setSocket(null); // Clear socket state
      setConnectionStatus('Disconnected');
      setReadyState(3); // CLOSED
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