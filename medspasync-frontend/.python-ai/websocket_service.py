import asyncio
import json
import logging
import time
from typing import Dict, List, Set, Optional, Any
from fastapi import WebSocket, WebSocketDisconnect, HTTPException
from fastapi.websockets import WebSocketState
import redis.asyncio as redis
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

class ConnectionManager:
    """Manages WebSocket connections and message broadcasting"""
    
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        self.user_connections: Dict[str, Set[str]] = {}  # user_id -> set of connection_ids
        self.channel_subscriptions: Dict[str, Set[str]] = {}  # channel -> set of connection_ids
        self.connection_users: Dict[str, str] = {}  # connection_id -> user_id
        self.connection_metadata: Dict[str, Dict] = {}  # connection_id -> metadata
        self.redis_client: Optional[redis.Redis] = None
        self.heartbeat_interval = 30  # seconds
        self.connection_timeout = 300  # seconds
        
    async def connect_redis(self, redis_url: str):
        """Connect to Redis for distributed messaging"""
        try:
            self.redis_client = redis.from_url(redis_url)
            await self.redis_client.ping()
            logger.info("WebSocket service connected to Redis")
        except Exception as e:
            logger.error(f"Failed to connect to Redis: {e}")
            self.redis_client = None
    
    async def disconnect_redis(self):
        """Disconnect from Redis"""
        if self.redis_client:
            await self.redis_client.close()
            self.redis_client = None
    
    def generate_connection_id(self) -> str:
        """Generate unique connection ID"""
        return f"conn_{int(time.time() * 1000)}_{id(asyncio.current_task())}"
    
    async def connect(self, websocket: WebSocket, user_id: str = None, metadata: Dict = None) -> str:
        """Accept WebSocket connection and register it"""
        await websocket.accept()
        
        connection_id = self.generate_connection_id()
        self.active_connections[connection_id] = websocket
        self.connection_metadata[connection_id] = {
            "user_id": user_id,
            "connected_at": datetime.utcnow(),
            "last_heartbeat": datetime.utcnow(),
            "user_agent": metadata.get("user_agent", ""),
            "ip_address": metadata.get("ip_address", ""),
            "workspace": metadata.get("workspace", "unknown")
        }
        
        if user_id:
            self.connection_users[connection_id] = user_id
            if user_id not in self.user_connections:
                self.user_connections[user_id] = set()
            self.user_connections[user_id].add(connection_id)
        
        # Send welcome message
        await self.send_personal_message(connection_id, {
            "type": "connection_established",
            "connection_id": connection_id,
            "timestamp": datetime.utcnow().isoformat(),
            "message": "WebSocket connection established"
        })
        
        logger.info(f"WebSocket connected: {connection_id} (user: {user_id})")
        return connection_id
    
    async def disconnect(self, connection_id: str):
        """Remove WebSocket connection"""
        if connection_id in self.active_connections:
            # Remove from user connections
            user_id = self.connection_users.get(connection_id)
            if user_id and user_id in self.user_connections:
                self.user_connections[user_id].discard(connection_id)
                if not self.user_connections[user_id]:
                    del self.user_connections[user_id]
            
            # Remove from channel subscriptions
            for channel, connections in self.channel_subscriptions.items():
                connections.discard(connection_id)
                if not connections:
                    del self.channel_subscriptions[channel]
            
            # Clean up connection data
            del self.active_connections[connection_id]
            del self.connection_users[connection_id]
            del self.connection_metadata[connection_id]
            
            logger.info(f"WebSocket disconnected: {connection_id}")
    
    async def send_personal_message(self, connection_id: str, message: Dict):
        """Send message to specific connection"""
        if connection_id in self.active_connections:
            websocket = self.active_connections[connection_id]
            if websocket.client_state == WebSocketState.CONNECTED:
                try:
                    await websocket.send_text(json.dumps(message))
                except Exception as e:
                    logger.error(f"Failed to send message to {connection_id}: {e}")
                    await self.disconnect(connection_id)
    
    async def send_to_user(self, user_id: str, message: Dict):
        """Send message to all connections of a user"""
        if user_id in self.user_connections:
            for connection_id in self.user_connections[user_id].copy():
                await self.send_personal_message(connection_id, message)
    
    async def broadcast_to_channel(self, channel: str, message: Dict):
        """Broadcast message to all connections subscribed to a channel"""
        if channel in self.channel_subscriptions:
            for connection_id in self.channel_subscriptions[channel].copy():
                await self.send_personal_message(connection_id, message)
        
        # Also broadcast via Redis for distributed deployments
        if self.redis_client:
            try:
                await self.redis_client.publish(
                    f"websocket:channel:{channel}",
                    json.dumps(message)
                )
            except Exception as e:
                logger.error(f"Failed to publish to Redis channel {channel}: {e}")
    
    async def broadcast_to_all(self, message: Dict):
        """Broadcast message to all connected clients"""
        for connection_id in list(self.active_connections.keys()):
            await self.send_personal_message(connection_id, message)
    
    def subscribe_to_channel(self, connection_id: str, channel: str):
        """Subscribe connection to a channel"""
        if channel not in self.channel_subscriptions:
            self.channel_subscriptions[channel] = set()
        self.channel_subscriptions[channel].add(connection_id)
        logger.info(f"Connection {connection_id} subscribed to channel: {channel}")
    
    def unsubscribe_from_channel(self, connection_id: str, channel: str):
        """Unsubscribe connection from a channel"""
        if channel in self.channel_subscriptions:
            self.channel_subscriptions[channel].discard(connection_id)
            if not self.channel_subscriptions[channel]:
                del self.channel_subscriptions[channel]
            logger.info(f"Connection {connection_id} unsubscribed from channel: {channel}")
    
    async def update_heartbeat(self, connection_id: str):
        """Update connection heartbeat"""
        if connection_id in self.connection_metadata:
            self.connection_metadata[connection_id]["last_heartbeat"] = datetime.utcnow()
    
    async def cleanup_stale_connections(self):
        """Remove connections that haven't sent heartbeat"""
        current_time = datetime.utcnow()
        stale_connections = []
        
        for connection_id, metadata in self.connection_metadata.items():
            if (current_time - metadata["last_heartbeat"]).total_seconds() > self.connection_timeout:
                stale_connections.append(connection_id)
        
        for connection_id in stale_connections:
            logger.warning(f"Removing stale connection: {connection_id}")
            await self.disconnect(connection_id)
    
    def get_connection_stats(self) -> Dict:
        """Get connection statistics"""
        return {
            "total_connections": len(self.active_connections),
            "total_users": len(self.user_connections),
            "total_channels": len(self.channel_subscriptions),
            "connections_per_user": {user: len(conns) for user, conns in self.user_connections.items()},
            "subscribers_per_channel": {channel: len(conns) for channel, conns in self.channel_subscriptions.items()}
        }

class WebSocketService:
    """Main WebSocket service for MedSpaSync Pro"""
    
    def __init__(self, redis_url: str = "redis://localhost:6379/0"):
        self.manager = ConnectionManager()
        self.redis_url = redis_url
        self.cleanup_task = None
        
    async def start(self):
        """Start the WebSocket service"""
        await self.manager.connect_redis(self.redis_url)
        self.cleanup_task = asyncio.create_task(self._cleanup_loop())
        logger.info("WebSocket service started")
    
    async def stop(self):
        """Stop the WebSocket service"""
        if self.cleanup_task:
            self.cleanup_task.cancel()
        await self.manager.disconnect_redis()
        logger.info("WebSocket service stopped")
    
    async def _cleanup_loop(self):
        """Periodic cleanup of stale connections"""
        while True:
            try:
                await asyncio.sleep(60)  # Run every minute
                await self.manager.cleanup_stale_connections()
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error(f"Error in cleanup loop: {e}")
    
    async def handle_websocket(self, websocket: WebSocket, user_id: str = None, metadata: Dict = None):
        """Handle WebSocket connection lifecycle"""
        connection_id = None
        try:
            connection_id = await self.manager.connect(websocket, user_id, metadata)
            
            # Subscribe to user-specific channel
            if user_id:
                self.manager.subscribe_to_channel(connection_id, f"user:{user_id}")
            
            # Subscribe to general system channel
            self.manager.subscribe_to_channel(connection_id, "system")
            
            # Main message handling loop
            while True:
                try:
                    data = await websocket.receive_text()
                    message = json.loads(data)
                    await self._handle_message(connection_id, message)
                except WebSocketDisconnect:
                    break
                except json.JSONDecodeError:
                    await self.manager.send_personal_message(connection_id, {
                        "type": "error",
                        "message": "Invalid JSON format",
                        "timestamp": datetime.utcnow().isoformat()
                    })
                except Exception as e:
                    logger.error(f"Error handling message: {e}")
                    await self.manager.send_personal_message(connection_id, {
                        "type": "error",
                        "message": "Internal server error",
                        "timestamp": datetime.utcnow().isoformat()
                    })
        
        except Exception as e:
            logger.error(f"WebSocket error: {e}")
        finally:
            if connection_id:
                await self.manager.disconnect(connection_id)
    
    async def _handle_message(self, connection_id: str, message: Dict):
        """Handle incoming WebSocket messages"""
        message_type = message.get("type")
        
        if message_type == "heartbeat":
            await self.manager.update_heartbeat(connection_id)
            await self.manager.send_personal_message(connection_id, {
                "type": "heartbeat_ack",
                "timestamp": datetime.utcnow().isoformat()
            })
        
        elif message_type == "subscribe":
            channel = message.get("channel")
            if channel:
                self.manager.subscribe_to_channel(connection_id, channel)
                await self.manager.send_personal_message(connection_id, {
                    "type": "subscribed",
                    "channel": channel,
                    "timestamp": datetime.utcnow().isoformat()
                })
        
        elif message_type == "unsubscribe":
            channel = message.get("channel")
            if channel:
                self.manager.unsubscribe_from_channel(connection_id, channel)
                await self.manager.send_personal_message(connection_id, {
                    "type": "unsubscribed",
                    "channel": channel,
                    "timestamp": datetime.utcnow().isoformat()
                })
        
        elif message_type == "reconciliation_progress":
            # Handle reconciliation progress updates
            job_id = message.get("job_id")
            if job_id:
                await self.manager.broadcast_to_channel(f"reconciliation:{job_id}", message)
        
        elif message_type == "user_activity":
            # Handle user activity updates
            user_id = self.manager.connection_users.get(connection_id)
            if user_id:
                await self.manager.broadcast_to_channel("user_activity", {
                    "type": "user_activity",
                    "user_id": user_id,
                    "activity": message.get("activity"),
                    "timestamp": datetime.utcnow().isoformat()
                })
        
        else:
            await self.manager.send_personal_message(connection_id, {
                "type": "error",
                "message": f"Unknown message type: {message_type}",
                "timestamp": datetime.utcnow().isoformat()
            })
    
    # Public API methods for sending messages
    async def send_reconciliation_progress(self, job_id: str, progress: Dict):
        """Send reconciliation progress update"""
        message = {
            "type": "reconciliation_progress",
            "job_id": job_id,
            "progress": progress,
            "timestamp": datetime.utcnow().isoformat()
        }
        await self.manager.broadcast_to_channel(f"reconciliation:{job_id}", message)
    
    async def send_notification(self, user_id: str, notification: Dict):
        """Send notification to specific user"""
        message = {
            "type": "notification",
            "notification": notification,
            "timestamp": datetime.utcnow().isoformat()
        }
        await self.manager.send_to_user(user_id, message)
    
    async def broadcast_system_message(self, message: str, level: str = "info"):
        """Broadcast system message to all users"""
        await self.manager.broadcast_to_channel("system", {
            "type": "system_message",
            "message": message,
            "level": level,
            "timestamp": datetime.utcnow().isoformat()
        })
    
    async def send_user_presence_update(self, user_id: str, status: str):
        """Send user presence update"""
        await self.manager.broadcast_to_channel("user_presence", {
            "type": "user_presence",
            "user_id": user_id,
            "status": status,
            "timestamp": datetime.utcnow().isoformat()
        })
    
    def get_stats(self) -> Dict:
        """Get WebSocket service statistics"""
        return self.manager.get_connection_stats()

# Global WebSocket service instance
websocket_service = WebSocketService() 