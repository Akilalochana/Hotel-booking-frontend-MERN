import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatbotIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const [pulsing, setPulsing] = useState(true);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Hotel Win Win's chatbot. How can I help you today?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
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
  
  // Predefined responses for the hotel chatbot
  const getResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // Greeting responses
    if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
      return "Hi! I'm Hotel Win Win chat assistant. How can I help you today?";
    }
    
    // Swimming pool question
    if (input.includes('swimming') || input.includes('pool') || input.includes('swim')) {
      return "No, we don't have a swimming pool in our hotel. However, we offer many other great amenities!";
    }
    
    // Booking related questions
    if (input.includes('booking') || input.includes('book') || input.includes('reservation') || input.includes('reserve')) {
      return "You can easily make a booking through our website. Just select your check-in and check-out dates, choose your room type, and complete the reservation process.";
    }
    
    // Room types
    if (input.includes('room') || input.includes('rooms') || input.includes('types')) {
      return "We offer various room types including Standard Rooms, Deluxe Rooms, and Suites. Each room comes with modern amenities and comfortable furnishing.";
    }
    
    // Pricing
    if (input.includes('price') || input.includes('cost') || input.includes('rate') || input.includes('charges')) {
      return "Room prices vary based on the type and season. Please check our booking page for current rates and special offers.";
    }
    
    // Amenities
    if (input.includes('amenities') || input.includes('facilities') || input.includes('services')) {
      return "Our hotel offers free Wi-Fi, 24/7 room service, air conditioning, restaurant, parking, and much more. Check our facilities page for the complete list.";
    }
    
    // Restaurant/Food
    if (input.includes('restaurant') || input.includes('food') || input.includes('dining') || input.includes('breakfast')) {
      return "Yes, we have an in-house restaurant serving delicious local and international cuisine. We also offer room service 24/7.";
    }
    
    // Parking
    if (input.includes('parking') || input.includes('car') || input.includes('vehicle')) {
      return "Yes, we provide free parking facilities for our guests. The parking area is secure and monitored 24/7.";
    }
    
    // WiFi
    if (input.includes('wifi') || input.includes('internet') || input.includes('connection')) {
      return "Yes, we offer complimentary high-speed Wi-Fi throughout the hotel premises for all our guests.";
    }
    
    // Location
    if (input.includes('location') || input.includes('address') || input.includes('where')) {
      return "Hotel Win Win is conveniently located in the heart of the city with easy access to major attractions and transportation.";
    }
    
    // Check-in/Check-out
    if (input.includes('check') || input.includes('checkin') || input.includes('checkout')) {
      return "Check-in time is 2:00 PM and check-out time is 12:00 PM. Early check-in and late check-out may be available upon request.";
    }
    
    // Contact
    if (input.includes('contact') || input.includes('phone') || input.includes('call') || input.includes('email')) {
      return "You can contact us through our website's contact form or call our reception for immediate assistance.";
    }
    
    // Cancellation
    if (input.includes('cancel') || input.includes('refund') || input.includes('policy')) {
      return "We have a flexible cancellation policy. Please check your booking confirmation email for specific cancellation terms for your reservation.";
    }
    
    // Payment
    if (input.includes('payment') || input.includes('pay') || input.includes('card') || input.includes('cash')) {
      return "We accept all major credit cards, debit cards, and cash payments. Online payments are also available during booking.";
    }
    
    // AC/Air conditioning
    if (input.includes('ac') || input.includes('air') || input.includes('conditioning') || input.includes('cooling')) {
      return "Yes, all our rooms are equipped with modern air conditioning systems for your comfort.";
    }
    
    // Laundry
    if (input.includes('laundry') || input.includes('washing') || input.includes('clothes')) {
      return "We provide laundry services for our guests. Please contact reception for more details about pricing and timing.";
    }
    
    // Gym/Fitness
    if (input.includes('gym') || input.includes('fitness') || input.includes('exercise') || input.includes('workout')) {
      return "Currently, we don't have a gym facility, but we can recommend nearby fitness centers if needed.";
    }
    
    // Pet policy
    if (input.includes('pet') || input.includes('dog') || input.includes('cat') || input.includes('animal')) {
      return "Please contact our reception to inquire about our pet policy and any additional charges that may apply.";
    }
    
    // Events/Meetings
    if (input.includes('event') || input.includes('meeting') || input.includes('conference') || input.includes('party')) {
      return "We have facilities for small meetings and events. Please contact our management for availability and pricing.";
    }
    
    // Thank you responses
    if (input.includes('thank') || input.includes('thanks')) {
      return "You're welcome! If you have any other questions, feel free to ask. We're here to help!";
    }
    
    // Goodbye responses
    if (input.includes('bye') || input.includes('goodbye') || input.includes('see you')) {
      return "Thank you for choosing Hotel Win Win! Have a great day and we look forward to welcoming you soon!";
    }
    
    // Default response for unrecognized queries
    return "I'm sorry, I didn't quite understand that. Could you please rephrase your question? I can help you with information about rooms, booking, amenities, and other hotel services.";
  };
  
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
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = inputValue.trim();
    
    // Add user message
    setMessages(prev => [...prev, { text: userMessage, sender: "user" }]);
    setInputValue("");
    setIsLoading(true);
    
    // Add typing indicator
    const typingMessage = { text: "Typing...", sender: "bot", isTyping: true };
    setMessages(prev => [...prev, typingMessage]);
    
    // Simulate thinking time (1-2 seconds)
    setTimeout(() => {
      const botResponse = getResponse(userMessage);
      
      // Remove typing indicator and add actual response
      setMessages(prev => {
        const newMessages = prev.filter(msg => !msg.isTyping);
        return [...newMessages, { text: botResponse, sender: "bot" }];
      });
      
      setIsLoading(false);
    }, Math.random() * 1000 + 1000); // Random delay between 1-2 seconds
  };
  
  return (
    <div className="fixed bottom-8 right-8 md:bottom-15 md:right-16 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <div className="w-80 h-96 flex flex-col">
              {/* Header */}
              <div 
                className="p-4 flex items-center justify-between text-white font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${colors[colorIndex]}, ${colors[(colorIndex + 2) % colors.length]})`
                }}
              >
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>Hotel Win Win Assistant</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div 
                      className={`max-w-xs p-3 rounded-lg ${message.sender === "user" 
                        ? "bg-blue-500 text-white rounded-br-none" 
                        : "bg-white text-gray-800 rounded-bl-none shadow"} ${
                        message.isTyping ? "animate-pulse" : ""
                      }`}
                    >
                      {message.isTyping ? (
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      ) : (
                        message.text
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input area */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
                <div className="flex">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 rounded-full border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="ml-2 p-2 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: `linear-gradient(135deg, ${colors[colorIndex]}, ${colors[(colorIndex + 2) % colors.length]})`
                    }}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Chat button */}
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
        {!isOpen && (
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
        )}
      </motion.div>
    </div>
  );
}