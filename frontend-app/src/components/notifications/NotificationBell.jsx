import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Check, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../hooks/useApi';
import './NotificationBell.css';

const NotificationBell = () => {
  const { user } = useAuth();
  const { apiCall } = useApi();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState(null);

  // Fetch notifications on component mount
  useEffect(() => {
    if (user) {
      fetchNotifications();
      fetchUnreadCount();
      initializeWebSocket();
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user]);

  // Initialize WebSocket connection
  const initializeWebSocket = () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const socketUrl = process.env.REACT_APP_WEBSOCKET_URL || 'http://localhost:3001';
    const newSocket = new WebSocket(`${socketUrl.replace('http', 'ws')}?token=${token}`);

    newSocket.onopen = () => {
      console.log('WebSocket connected');
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'notification') {
        handleNewNotification(data);
      } else if (data.action === 'mark_all_read') {
        setUnreadCount(0);
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      } else if (data.action === 'delete') {
        setNotifications(prev => prev.filter(n => n.id !== data.notificationId));
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    newSocket.onclose = () => {
      console.log('WebSocket disconnected');
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        if (user) {
          initializeWebSocket();
        }
      }, 5000);
    };

    setSocket(newSocket);
  };

  // Handle new notification from WebSocket
  const handleNewNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
    if (!notification.isRead) {
      setUnreadCount(prev => prev + 1);
    }
  };

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall('/api/notifications?limit=20');
      if (response.success) {
        setNotifications(response.notifications);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const response = await apiCall('/api/notifications/unread-count');
      if (response.success) {
        setUnreadCount(response.count);
      }
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await apiCall(`/api/notifications/${notificationId}/read`, {
        method: 'PATCH'
      });
      
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await apiCall('/api/notifications/read-all', {
        method: 'PATCH'
      });
      
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      await apiCall(`/api/notifications/${notificationId}`, {
        method: 'DELETE'
      });
      
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      if (!notifications.find(n => n.id === notificationId)?.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'APPOINTMENT_CREATED':
      case 'APPOINTMENT_UPDATED':
      case 'APPOINTMENT_CANCELLED':
        return '📅';
      case 'PAYMENT_RECEIVED':
      case 'PAYMENT_FAILED':
        return '💰';
      case 'RECONCILIATION_COMPLETED':
      case 'RECONCILIATION_FAILED':
        return '🔍';
      case 'SYSTEM_MAINTENANCE':
        return '🔧';
      case 'SECURITY_ALERT':
        return '⚠️';
      default:
        return '📢';
    }
  };

  // Get notification priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'URGENT':
        return 'urgent';
      case 'HIGH':
        return 'high';
      case 'NORMAL':
        return 'normal';
      case 'LOW':
        return 'low';
      default:
        return 'normal';
    }
  };

  // Format notification time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  if (!user) return null;

  return (
    <div className="notification-bell-container">
      <button
        className="notification-bell-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        {unreadCount > 0 ? (
          <div className="notification-bell-with-badge">
            <Bell className="notification-bell-icon" />
            <span className="notification-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
          </div>
        ) : (
          <BellOff className="notification-bell-icon" />
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button
                className="mark-all-read-button"
                onClick={markAllAsRead}
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="notification-list">
            {isLoading ? (
              <div className="notification-loading">Loading notifications...</div>
            ) : notifications.length === 0 ? (
              <div className="notification-empty">
                <BellOff className="notification-empty-icon" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${!notification.isRead ? 'unread' : ''} ${getPriorityColor(notification.priority)}`}
                >
                  <div className="notification-content">
                    <div className="notification-icon">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="notification-details">
                      <h4 className="notification-title">{notification.title}</h4>
                      <p className="notification-message">{notification.message}</p>
                      <span className="notification-time">
                        {formatTime(notification.createdAt)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="notification-actions">
                    {!notification.isRead && (
                      <button
                        className="notification-action-button"
                        onClick={() => markAsRead(notification.id)}
                        title="Mark as read"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button
                      className="notification-action-button delete"
                      onClick={() => deleteNotification(notification.id)}
                      title="Delete notification"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="notification-footer">
              <button
                className="view-all-button"
                onClick={() => {
                  // Navigate to full notifications page
                  window.location.href = '/notifications';
                }}
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}

      {/* Backdrop to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="notification-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default NotificationBell; 