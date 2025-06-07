// medspasync-frontend-main/src/hooks/useWebSocket.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../services/AuthContext'; // Updated import path

export const useWebSocket = (url, options = {}) => {
  const { user, isAuthenticated } = useAuth(); // Ensure isAuthenticated is also available
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
    reconnectInterval = 3000
  } = options;

  const reconnectTimeoutId = useRef(null);
  const reconnectCount = useRef(0);

  const connect = useCallback(() => {
    // Clear any pending reconnection attempts
    if (reconnectTimeoutId.current) {
      clearTimeout(reconnectTimeoutId.current);
      reconnectTimeoutId.current = null;
    }

    // Don't try to connect if user is not authenticated and URL requires a token
    if (!isAuthenticated && url.includes('?token=')) { // Simple check, adapt if your WS auth differs
      setConnectionStatus('Disconnected: Not Authenticated');
      setReadyState(3); // CLOSED
      return;
    }

    try {
      const wsUrl = user?.token ? `${url}?token=${user.token}` : url; // Append token if available
      const ws = new WebSocket(wsUrl);

      ws.onopen = (event) => {
        setReadyState(ws.readyState);
        setConnectionStatus('Open');
        reconnectCount.current = 0; // Reset reconnect count on successful connection
        if (onOpen) onOpen(event);
      };

      ws.onclose = (event) => {
        setReadyState(ws.readyState);
        setConnectionStatus('Closed');
        if (onClose) onClose(event);

        if (shouldReconnect && reconnectCount.current < reconnectAttempts) {
          reconnectCount.current++;
          setConnectionStatus(`Reconnecting (Attempt ${reconnectCount.current}/${reconnectAttempts})...`);
          reconnectTimeoutId.current = setTimeout(() => {
            connect(); // Attempt to reconnect
          }, reconnectInterval);
        } else if (shouldReconnect && reconnectCount.current >= reconnectAttempts) {
          setConnectionStatus('Reconnection failed. Max attempts reached.');
          console.warn('WebSocket: Max reconnection attempts reached.');
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
        }
      };

      ws.onerror = (event) => {
        setConnectionStatus('Error');
        console.error('WebSocket error:', event);
        if (onError) onError(event);
        // Close the socket to trigger onclose and potential reconnect
        ws.close();
      };

      setSocket(ws);
    } catch (error) {
      console.error('WebSocket connection setup failed:', error);
      setConnectionStatus('Error');
      if (onError) onError(error);
      // Attempt reconnect if the initial connection failed
      if (shouldReconnect && reconnectCount.current < reconnectAttempts) {
        reconnectCount.current++;
        reconnectTimeoutId.current = setTimeout(() => {
          setConnectionStatus(`Reconnecting (Attempt ${reconnectCount.current}/${reconnectAttempts})...`);
          connect();
        }, reconnectInterval);
      }
    }
  }, [url, user, isAuthenticated, onOpen, onClose, onMessage, onError, shouldReconnect, reconnectAttempts, reconnectInterval]);

  useEffect(() => {
    // Connect when component mounts and user is authenticated, or if it's a public WebSocket
    // Disconnect and reconnect if user/auth status changes (e.g., login/logout)
    // Only connect if not already connected or explicitly told to reconnect
    if (isAuthenticated || !url.includes('?token=')) { // Condition to attempt connection
      if (!socket || socket.readyState === WebSocket.CLOSED || socket.readyState === WebSocket.CLOSING) {
        connect();
      }
    } else {
      // If user logs out and socket exists, close it
      if (socket && socket.readyState === WebSocket.OPEN) {
        disconnect();
      }
    }


    return () => {
      // Cleanup on unmount
      if (reconnectTimeoutId.current) {
        clearTimeout(reconnectTimeoutId.current);
      }
      if (socket) {
        socket.close(); // Cleanly close WebSocket connection
      }
    };
  }, [user, isAuthenticated, url, connect]); // Removed socket from dependencies as it causes infinite loop with `connect`

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
      socket.close(1000, 'Component unmounted or forced disconnect'); // 1000 is normal closure
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