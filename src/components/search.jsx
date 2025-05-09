import { useState } from 'react';

export default function Search() {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('1 Guest');

  return (
    <div className="w-full max-w-lg p-6 bg-[#111] mt-[350px] mr-[840px] rounded-lg text-white">
      <h2 className="text-xl font-bold mb-4">Book Your Stay</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-300 text-sm mb-2">Check-in Date</label>
          <div className="relative">
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="w-full  text-white p-1.5 rounded pl-3 pr-10 border border-gray-700"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-300 text-sm mb-2">Check-out Date</label>
          <div className="relative">
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="w-full  text-white p-1.5 rounded pl-3 pr-10 border border-gray-700"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-300 text-sm mb-2">Guests</label>
        <div className="relative">
          <select
            className="w-full appearance-none text-white p-1.5 rounded border border-gray-700"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4 Guests</option>
            <option>5+ Guests</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      
      <button className="w-full bg-accent hover:bg-green-500 text-white py-1.5 rounded font-medium transition ">
        Search Availability
      </button>
    </div>
  );
}