import { Footer } from '@/components/footer';
import React from 'react';
import { motion } from 'framer-motion';

export default function ContactUsPage() {
   return (
    <>
    <div className="min-h-[calc(100vh-80px)]  flex flex-col mt-[40px] items-center py-12 px-4 bg-[#070707]">
      {/* Header */}
      <div className="w-full max-w-6xl text-center mb-6">
         <motion.h1
            className="text-5xl font-bold mb-3"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Contact Us
          </motion.h1>
          
        <p className="text-gray-600">Have questions or need assistance? Reach out to our dedicated team.</p>
      </div>

      {/* Contact Form and Map Container */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 mt-8">
        {/* Contact Form */}
        <div className="w-full md:w-1/2">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="John Doe" 
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#53c28b]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="john@example.com" 
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#53c28b]"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
              <textarea 
                id="message" 
                rows={5} 
                placeholder="How can we help you?" 
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#53c28b]"
              />
            </div>
            <div>
              <button 
                type="submit" 
                className="px-6 py-2 bg-[#53c28b] text-white font-medium rounded hover:bg-[#53c28b70] transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Map and Contact Info */}
        <div className="w-full md:w-1/2">
          {/* Map Placeholder */}
          <div className="w-full h-64 md:h-80 mb-8 rounded-lg overflow-hidden">
              <iframe
                title="WinWin Hotel Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.82526409238!2d80.37527667477201!3d8.320155891715595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcf57f7652d5bf%3A0x48fef78066fe025!2sWin%20Win%20Hotel!5e0!3m2!1sen!2slk!4v1746905650602!5m2!1sen!2slk"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0 w-full h-full"
              ></iframe>
            </div>
            


          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg 
                  className="w-5 h-5 text-[#53c28b]" 
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-700">Address</h3>
                <p className="text-sm text-gray-600">123 winwinHotel, Anuradhapura</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg 
                  className="w-5 h-5  text-[#53c28b]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-700">Phone</h3>
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg 
                  className="w-5 h-5  text-[#53c28b]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-700">Email</h3>
                <a href="mailto:info@winwinhotel.com" className="text-sm  hover:underline">
                  info@winwinhotel.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}