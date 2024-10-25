import { useState, useCallback, useEffect, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Message, WebSocketMessage, User, OnlineUser } from '../types/chat';

const WEBSOCKET_URL = 'wss://socketsbay.com/wss/v2/1/demo/';

export const useChat = (currentUser: User) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const messageQueue = useRef<Message[]>([]);

  const {
    sendMessage,
    lastMessage,
    readyState,
  } = useWebSocket(WEBSOCKET_URL, {
    onOpen: () => {
      console.log('Connected to chat');
      // Announce user presence
      sendMessage(JSON.stringify({
        type: 'user_joined',
        user: {
          id: currentUser.id,
          username: currentUser.username,
          avatar: currentUser.avatar
        }
      }));
    },
    onError: (event) => console.error('WebSocket error:', event),
    onClose: () => console.log('Disconnected from chat'),
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const data = JSON.parse(lastMessage.data);
        if (data.type === 'user_joined') {
          setOnlineUsers(prev => [...prev, data.user]);
        } else if (data.type === 'user_left') {
          setOnlineUsers(prev => prev.filter(user => user.id !== data.userId));
        } else {
          const newMessage: Message = {
            id: Math.random().toString(36).substr(2, 9),
            text: data.message || data.text || JSON.stringify(data),
            isUser: false,
            timestamp: new Date(),
            user: data.user
          };
          setMessages((prev) => [...prev, newMessage]);
        }
      } catch (e) {
        const newMessage: Message = {
          id: Math.random().toString(36).substr(2, 9),
          text: lastMessage.data,
          isUser: false,
          timestamp: new Date(),
          user: currentUser
        };
        setMessages((prev) => [...prev, newMessage]);
      }
    }
  }, [lastMessage, currentUser]);

  const sendChatMessage = useCallback((text: string) => {
    if (readyState === ReadyState.OPEN) {
      const message: Message = {
        id: Math.random().toString(36).substr(2, 9),
        text,
        isUser: true,
        timestamp: new Date(),
        user: currentUser
      };
      setMessages((prev) => [...prev, message]);
      sendMessage(JSON.stringify({
        type: 'message',
        text,
        user: {
          id: currentUser.id,
          username: currentUser.username,
          avatar: currentUser.avatar
        }
      }));
    } else {
      messageQueue.current.push({
        id: Math.random().toString(36).substr(2, 9),
        text,
        isUser: true,
        timestamp: new Date(),
        user: currentUser
      });
    }
  }, [readyState, sendMessage, currentUser]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN && messageQueue.current.length > 0) {
      messageQueue.current.forEach((message) => {
        sendMessage(JSON.stringify({
          type: 'message',
          text: message.text,
          user: {
            id: currentUser.id,
            username: currentUser.username,
            avatar: currentUser.avatar
          }
        }));
      });
      messageQueue.current = [];
    }
  }, [readyState, sendMessage, currentUser]);

  return {
    messages,
    sendMessage: sendChatMessage,
    onlineUsers,
    isConnected: readyState === ReadyState.OPEN,
  };
};