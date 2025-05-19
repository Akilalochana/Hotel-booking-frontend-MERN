import { useState } from "react";
import { Calendar, Clock, DollarSign, Mail, Star, Tag, X } from "lucide-react";

export default function BookingCard({ room }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format dates for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate total number of rooms booked
  const totalRooms = room.bookingItems.length;
  
  return (
    <div className="w-full max-w-2xl mx-auto my-6 bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-800">
      {/* Header Section */}
      <div className="bg-gray-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Tag className="text-white" size={20} />
          <span className="text-white font-bold text-lg">{room.bookingId}</span>
        </div>
        <div className="flex items-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${room.isApproved ? "bg-green-500 text-green-100" : "bg-yellow-500 text-yellow-100"}`}>
            {room.isApproved ? "Approved" : "Pending"}
          </span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-6">
        {/* Basic Info */}
        <div className="flex flex-col md:flex-row md:justify-between mb-6">
          <div className="flex items-center mb-3 md:mb-0">
            <Mail className="text-gray-400 mr-2" size={16} />
            <span className="text-gray-300">{room.email}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="text-gray-400 mr-2" size={16} />
            <span className="text-gray-300">
              {formatDate(room.startingDate)} - {formatDate(room.endingDate)}
            </span>
          </div>
        </div>
        
        {/* Booking Details */}
        <div className="flex flex-wrap justify-between bg-gray-800 p-4 rounded-lg mb-4">
          <div className="flex flex-col items-center mb-3 md:mb-0">
            <span className="text-gray-400 text-sm">Duration</span>
            <div className="flex items-center mt-1">
              <Clock className="text-green-500 mr-1" size={16} />
              <span className="text-lg font-semibold text-white">{room.days} Days</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center mb-3 md:mb-0">
            <span className="text-gray-400 text-sm">Rooms</span>
            <span className="text-lg font-semibold text-white">{totalRooms}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-sm">Total</span>
            <div className="flex items-center mt-1">
              <DollarSign className="text-green-500 mr-1" size={16} />
              <span className="text-lg font-semibold text-white">Rs. {room.price.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* Rooms Section */}
        <div>
          <button 
            className="flex items-center text-green-500 font-medium mb-4"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <span>Hide room details</span>
                <X className="ml-1" size={16} />
              </>
            ) : (
              <>
                <span>View room details</span>
                <span className="ml-1 w-5 h-5 rounded-full bg-gray-800 text-green-500 flex items-center justify-center text-xs">{totalRooms}</span>
              </>
            )}
          </button>
          
          {isExpanded && (
            <div className="space-y-3">
              {room.bookingItems.map((item) => (
                <div key={item._id} className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
                  <div className="w-24 h-24">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-white capitalize">{item.product.name}</h3>
                      <div className="flex items-center">
                        <Star className="text-yellow-500 w-4 h-4" />
                        <span className="text-yellow-500 text-sm ml-1">4.9</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">Room ID: {item.product.key}</p>
                    <p className="text-white font-medium mt-1">Rs. {item.product.price.toLocaleString()} <span className="text-gray-400 text-sm">/night</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-gray-800 px-6 py-4 bg-gray-800 flex justify-between items-center">
        <div className="text-sm text-gray-400">
          Booked on {formatDate(room.bookingDate)}
        </div>
        <div>
          <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white text-sm">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}