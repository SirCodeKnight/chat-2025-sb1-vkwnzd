import React from 'react';
import { motion } from 'framer-motion';
import { OnlineUser } from '../../types/chat';

interface OnlineUsersProps {
  users: OnlineUser[];
}

const OnlineUsers: React.FC<OnlineUsersProps> = ({ users }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-lg p-4 w-64">
      <h3 className="text-white font-semibold mb-4">Online Users ({users.length})</h3>
      <div className="space-y-3">
        {users.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-3"
          >
            <img
              src={user.avatar}
              alt={user.username}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-white">{user.username}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;