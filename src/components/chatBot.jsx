import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ChatbotIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const [pulsing, setPulsing] = useState(true);
  
  // Colors for gradient animation
  const colors = [
    "rgb(255, 100, 100)",
    "rgb(255, 180, 100)",
    "rgb(255, 255, 100)",
    "rgb(100, 255, 100)",
    "rgb(100, 180, 255)",
    "rgb(180, 100, 255)"
  ];
  
  const [colorIndex, setColorIndex] = useState(0);
  
  // Animate color every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Stop pulsing animation after 10 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPulsing(false);
    }, 10000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <motion.div 
          className="bg-white rounded-lg p-4 mb-4 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="w-64">
            <p className="font-semibold mb-2">Hotel Win Win Chatbot</p>
            <p className="text-sm text-gray-600 mb-2">How can I help you today?</p>
            <div className="flex justify-end">
              <button 
                className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}
      
      <motion.div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Pulsing background */}
        {pulsing && (
          <motion.div 
            className="absolute inset-0 rounded-full"
            style={{ 
              backgroundColor: colors[colorIndex],
              opacity: 0.3 
            }}
            animate={{ 
              scale: [1, 1.5, 1],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
            }}
          />
        )}
        
        {/* Main button */}
        <motion.div 
          className="relative w-16 h-16 flex items-center justify-center rounded-full shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${colors[colorIndex]}, ${colors[(colorIndex + 2) % colors.length]})`
          }}
        >
          {/* Message bubble icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            
            {/* Animated dots */}
            <motion.circle
              cx="9" 
              cy="12" 
              r="1"
              fill="white"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse",
                duration: 1,
                delay: 0 
              }}
            />
            <motion.circle 
              cx="12" 
              cy="12" 
              r="1"
              fill="white"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse",
                duration: 1,
                delay: 0.3 
              }}
            />
            <motion.circle 
              cx="15" 
              cy="12" 
              r="1"
              fill="white"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse",
                duration: 1,
                delay: 0.6 
              }}
            />
          </svg>
        </motion.div>
        
        {/* Notification dot */}
        <motion.div 
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 15,
            delay: 1
          }}
        >
          1
        </motion.div>
      </motion.div>
    </div>
  );
}