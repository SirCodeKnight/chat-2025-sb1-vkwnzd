import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatInterface from './components/Chat/ChatInterface';
import OnboardingFlow from './components/Onboarding/OnboardingFlow';
import { User } from './types/chat';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [existingUsernames, setExistingUsernames] = useState<string[]>([]);

  const handleUserComplete = (newUser: User) => {
    setUser(newUser);
    setExistingUsernames(prev => [...prev, newUser.username]);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {!isChatOpen ? (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
            Anonymous Chat
          </h1>
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-white text-indigo-900 rounded-full px-8 py-4 font-semibold flex items-center gap-2 hover:bg-opacity-90 transition-all transform hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
            Start Anonymous Session
          </button>
        </div>
      ) : !user ? (
        <OnboardingFlow
          onComplete={handleUserComplete}
          existingUsernames={existingUsernames}
        />
      ) : (
        <ChatInterface
          onClose={() => {
            setIsChatOpen(false);
            setUser(null);
          }}
          currentUser={user}
        />
      )}
    </div>
  );
}

export default App;