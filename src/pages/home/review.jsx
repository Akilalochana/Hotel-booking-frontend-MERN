import React from 'react';
import { Link } from 'react-router-dom';

export function ReviewHomePage() {
  // Sample review data array
  const reviews = [
    {
      id: 1,
      name: "lochana",
      rating: 5,
      avatarUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      review: "The attention to detail was impeccable. From the moment we checked in until our departure, the staff made us feel like royalty. The room exceeded our expectations with its stunning view and luxurious amenities."
    },
    {
      id: 2,
      name: "sandhakelum",
      rating: 4.5,
      avatarUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      review: "As a frequent business traveler, I've stayed in many hotels, but this one stands out. The bed was incredibly comfortable, the room was quiet, and the high-speed internet was reliable. The executive lounge offered excellent refreshments."
    },
    {
      id: 3,
      name: "Sampath Bandara",
      rating: 5,
      avatarUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      review: "Our anniversary celebration was perfect thanks to the special touches provided by the hotel. The champagne upon arrival and rose petals on the bed created a romantic atmosphere. The spa services were exceptional."
    }
  ];

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-5 h-5 text-[#FFC107]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-[#FFC107]" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfGradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path fill="url(#halfGradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // Add empty stars to make up to 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div className="w-full flex flex-col items-center bg-black text-white py-12 px-4">
      <div className="max-w-4xl w-full flex flex-col justify-center items-center text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">What Our Guests Say</h1>
        <p className="text-gray-400 text-lg">
          Discover the experiences of guests who have enjoyed our exceptional hospitality.
        </p>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className="bg-[#222] rounded-md p-6 flex flex-col"
          >
            <div className="flex items-center mb-4">
              <img 
                src={review.avatarUrl} 
                alt={review.name} 
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <h3 className="text-lg font-medium">{review.name}</h3>
                <div className="flex mt-1">
                  {renderStars(review.rating)}
                </div>
              </div>
            </div>
            <p className="text-gray-400 flex-grow">"{review.review}"</p>
          </div>
        ))}
      </div>

      <Link to='/reviews' className="mt-10 flex items-center border border-green-500 text-green-500 px-6 py-2 rounded-md hover:bg-green-500 hover:text-black transition duration-300">
        Read More Reviews
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
}