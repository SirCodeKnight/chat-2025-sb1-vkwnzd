import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Video, MessageSquare, Mic } from 'lucide-react';
import ChatInterface from './Chat/ChatInterface';

const Hero = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      
      <div className="relative container mx-auto px-6 py-32 text-white">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Secure, Anonymous Communication
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200">
            Chat, call, and video conference without accounts. Your privacy is our priority.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsChatOpen(true)}
            className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Anonymous Session
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: MessageSquare, title: "Secure Chat", desc: "End-to-end encrypted messaging" },
            { icon: Video, title: "Video Calls", desc: "Crystal clear anonymous video" },
            { icon: Mic, title: "Voice Chat", desc: "High-quality voice communication" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center"
            >
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-sm"
        >
          <Shield className="w-4 h-4" />
          <span>No registration required. No data stored.</span>
        </motion.div>
      </div>

      <AnimatePresence>
        {isChatOpen && <ChatInterface onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default Hero;