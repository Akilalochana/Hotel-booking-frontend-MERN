import { useState } from "react";
import { Calendar, Clock, DollarSign, Mail, Star, Tag, ChevronDown, ChevronUp } from "lucide-react";

export default function BookingCard({ room }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format dates for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Calculate total number of rooms booked
  const totalRooms = room.bookingItems.length;
  
  return (
    <div className="w-full md:w-[400px] max-w-md mx-auto my-4 bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
      {/* Header */}
      <div className="bg-[#363e36] px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Tag className="text-green-400" size={16} />
          <span className="text-white font-semibold text-sm">{room.bookingId}</span>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          room.isApproved 
            ? "bg-green-500/20 text-green-300" 
            : "bg-yellow-500/20 text-yellow-300"
        }`}>
          {room.isApproved ? "Approved" : "Pending"}
        </span>
      </div>
      
      {/* Main Content */}
      <div className="p-4 bg-[#1b201b]">
        {/* Basic Info */}
        <div className="flex items-center text-sm text-gray-300 mb-3">
          <Mail size={14} className="mr-2" />
          <span className="truncate">{room.email}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-300 mb-4">
          <Calendar size={14} className="mr-2" />
          <span>{formatDate(room.startingDate)} - {formatDate(room.endingDate)}</span>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{room.days}</div>
            <div className="text-xs text-gray-400">Days</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">{totalRooms}</div>
            <div className="text-xs text-gray-400">Rooms</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">Rs. {room.price.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Total</div>
          </div>
        </div>
        
        {/* View Details Button */}
        <button 
          className="w-full flex items-center justify-center text-green-400 text-sm py-2 hover:bg-gray-700 rounded transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="mr-1">
            {isExpanded ? "Hide Details" : `View ${totalRooms} Room${totalRooms > 1 ? 's' : ''}`}
          </span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {/* Expanded Room Details */}
        {isExpanded && (
          <div className="mt-3 space-y-2 border-t border-gray-700 pt-3">
            {room.bookingItems.map((item, index) => (
              <div key={item._id} className="flex items-center bg-gray-700 rounded p-2">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="w-12 h-12 object-cover rounded mr-3"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white text-sm font-medium truncate capitalize">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center ml-2">
                      <Star className="text-yellow-400 w-3 h-3 fill-current" />
                      <span className="text-yellow-300 text-xs ml-1">4.9</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-gray-400 text-xs">ID: {item.product.key}</span>
                    <span className="text-white text-sm font-medium">
                      Rs. {item.product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="bg-[#363e36] px-4 py-3 flex justify-between items-center text-xs">
        <span className="text-gray-400">
          Booked: {formatDate(room.bookingDate)}
        </span>
        <button className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-white text-xs font-medium transition-colors">
          Support
        </button>
      </div>
    </div>
  );
}