import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className="flex items-start gap-2 max-w-[80%]">
        {!message.isUser && (
          <img
            src={message.user.avatar}
            alt={message.user.username}
            className="w-8 h-8 rounded-full"
          />
        )}
        <div
          className={`rounded-2xl px-4 py-2 ${
            message.isUser
              ? 'bg-indigo-600 text-white'
              : 'bg-white/10 backdrop-blur-sm text-white'
          }`}
        >
          {!message.isUser && (
            <p className="text-sm font-semibold mb-1">{message.user.username}</p>
          )}
          <p className="break-words">{message.text}</p>
          <p className="text-xs opacity-50 mt-1">
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        </div>
        {message.isUser && (
          <img
            src={message.user.avatar}
            alt={message.user.username}
            className="w-8 h-8 rounded-full"
          />
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;