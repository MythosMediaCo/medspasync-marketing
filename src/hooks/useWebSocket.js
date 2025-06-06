// src/hooks/useWebSocket.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useWebSocket = (url, options = {}) => {
  const { user } = useAuth();
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
    reconnectInterval = 3000
  } = options;

  const reconnectTimeoutId = useRef(null);
  const reconnectCount = useRef(0);

  const connect = useCallback(() => {
    try {
      const wsUrl = user ? `${url}?token=${user.token}` : url;
      const ws = new WebSocket(wsUrl);

      ws.onopen = (event) => {
        setReadyState(ws.readyState);
        setConnectionStatus('Open');
        reconnectCount.current = 0;
        if (onOpen) onOpen(event);
      };

      ws.onclose = (event) => {
        setReadyState(ws.readyState);
        setConnectionStatus('Closed');
        if (onClose) onClose(event);

        if (shouldReconnect && reconnectCount.current < reconnectAttempts) {
          reconnectCount.current++;
          reconnectTimeoutId.current = setTimeout(() => {
            setConnectionStatus('Reconnecting');
            connect();
          }, reconnectInterval);
        }
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setLastMessage(message);
        if (onMessage) onMessage(message);
      };

      ws.onerror = (event) => {
        setConnectionStatus('Error');
        if (onError) onError(event);
      };

      setSocket(ws);
    } catch (error) {
      console.error('WebSocket connection error:', error);
      setConnectionStatus('Error');
    }
  }, [url, user, onOpen, onClose, onMessage, onError, shouldReconnect, reconnectAttempts, reconnectInterval]);

  useEffect(() => {
    if (user) {
      connect();
    }

    return () => {
      if (reconnectTimeoutId.current) {
        clearTimeout(reconnectTimeoutId.current);
      }
      if (socket) {
        socket.close();
      }
    };
  }, [user, connect]);

  const sendMessage = useCallback((message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected');
    }
  }, [socket]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutId.current) {
      clearTimeout(reconnectTimeoutId.current);
    }
    if (socket) {
      socket.close();
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