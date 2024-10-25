import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, X, Users, Wifi, WifiOff } from 'lucide-react';
import ChatMessage from './ChatMessage';
import OnlineUsers from './OnlineUsers';
import { useChat } from '../../hooks/useChat';
import { User } from '../../types/chat';

interface ChatInterfaceProps {
  onClose: () => void;
  currentUser: User;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose, currentUser }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const { messages, sendMessage, onlineUsers, isConnected } = useChat(currentUser);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    sendMessage(inputMessage);
    setInputMessage('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col p-4 md:p-8"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="w-8 h-8 rounded-full"
            />
            <h2 className="text-2xl font-bold text-white">{currentUser.username}</h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowOnlineUsers(!showOnlineUsers)}
              className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <Users className="w-4 h-4 text-white" />
              <span className="text-sm text-white">{onlineUsers.length} online</span>
            </button>
            <div className={`flex items-center gap-2 ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex-1 flex gap-4">
        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {showOnlineUsers && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <OnlineUsers users={onlineUsers} />
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2 mt-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-white/10 backdrop-blur-md text-white placeholder-white/50 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-white/25"
        />
        <button
          type="submit"
          disabled={!isConnected}
          className={`rounded-full p-3 transition-colors ${
            isConnected 
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
              : 'bg-gray-600 cursor-not-allowed text-gray-400'
          }`}
        >
          <Send className="w-6 h-6" />
        </button>
      </form>
    </motion.div>
  );
};

export default ChatInterface;