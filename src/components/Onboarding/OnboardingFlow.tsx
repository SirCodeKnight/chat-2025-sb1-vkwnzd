import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Camera, FileText } from 'lucide-react';
import { User as UserType } from '../../types/chat';

interface OnboardingFlowProps {
  onComplete: (user: UserType) => void;
  existingUsernames: string[];
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, existingUsernames }) => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');

  const generateAvatar = (name: string) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
  };

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }
    if (existingUsernames.includes(username)) {
      setError('Username already taken');
      return;
    }
    setError('');
    setAvatar(generateAvatar(username));
    setStep(2);
  };

  const handleAvatarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleBioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserType = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      avatar,
      bio
    };
    onComplete(user);
  };

  const slideVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key="username"
            initial="enter"
            animate="center"
            exit="exit"
            variants={slideVariants}
            onSubmit={handleUsernameSubmit}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md"
          >
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white text-center mb-6">Choose Your Username</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username..."
                className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/25"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-3 transition-colors"
              >
                Continue
              </button>
            </div>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form
            key="avatar"
            initial="enter"
            animate="center"
            exit="exit"
            variants={slideVariants}
            onSubmit={handleAvatarSubmit}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md"
          >
            <div className="mb-6">
              <img src={avatar} alt="Avatar" className="w-32 h-32 rounded-full mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-white text-center mb-6">Your Avatar</h2>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setAvatar(generateAvatar(username + Date.now()))}
                className="w-full bg-white/10 hover:bg-white/20 text-white rounded-lg px-4 py-3 transition-colors"
              >
                Generate New Avatar
              </button>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-3 transition-colors"
              >
                Continue
              </button>
            </div>
          </motion.form>
        )}

        {step === 3 && (
          <motion.form
            key="bio"
            initial="enter"
            animate="center"
            exit="exit"
            variants={slideVariants}
            onSubmit={handleBioSubmit}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md"
          >
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white text-center mb-6">Add a Bio</h2>
            <div className="space-y-4">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/25 h-32 resize-none"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-3 transition-colors"
              >
                Start Chatting
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OnboardingFlow;