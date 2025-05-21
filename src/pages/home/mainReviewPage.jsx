import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

export default function ReviewPage() {
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [roomKey, setRoomKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // For the room we're reviewing (optional)
  const params = useParams();
  const key = params.key;
  
  useEffect(() => {
    if (key) {
      setRoomKey(key);
    }
    
    // Fetch existing reviews
    fetchReviews();
  }, [key]);
  
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/reviews`);
      // Filter to only include approved reviews
      const approvedReviews = response.data.filter(review => review.isApproved === true);
      setReviews(approvedReviews);
      setLoadingStatus("success");
      console.log("Approved reviews:", approvedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoadingStatus("error");
    }
  };
  
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        toast.error("Please login to submit a review");
        setIsSubmitting(false);
        return;
      }
      
      const reviewData = {
        rating,
        comment,
        roomKey: key || roomKey
      };
      
      await axios.post(
        `${import.meta.env.VITE_BACKEND_HOST_URL}/api/reviews`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      toast.success("Review submitted successfully! It will appear after approval.");
      setComment("");
      setRating(0);
      fetchReviews(); // Refresh reviews
      
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6 text-white">
      <h1 className="text-5xl font-bold text-[#53c28b] mt-12 mb-8">Guest Reviews</h1>
      
      {/* Review Form */}
      <div className="w-full max-w-md bg-[#1a1a1a] p-6 rounded-xl shadow-lg mb-10">
        <h2 className="text-2xl font-semibold mb-4">Share Your Experience</h2>
        <form onSubmit={handleSubmitReview}>
          <div className="mb-6">
            <label className="block text-sm mb-2">Your Rating</label>
            <div className="flex gap-2">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    className="cursor-pointer text-2xl"
                    color={(hoveredRating || rating) >= starValue ? "#FFC107" : "#555"}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHoveredRating(starValue)}
                    onMouseLeave={() => setHoveredRating(0)}
                  />
                );
              })}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm mb-2">Your Review</label>
            <textarea
              className="w-full p-3 rounded-md bg-[#2c2c2c] border border-[#444] text-white"
              rows="4"
              placeholder="Share your experience with us..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          
          {!key && (
            <div className="mb-6">
              <label className="block text-sm mb-2">Room Key (if not reviewing a specific room)</label>
              <input
                type="text"
                className="w-full p-3 rounded-md bg-[#2c2c2c] border border-[#444] text-white"
                placeholder="Room key or ID"
                value={roomKey}
                onChange={(e) => setRoomKey(e.target.value)}
              />
            </div>
          )}
          
          <button
            type="submit"
            className="w-full p-3 rounded-md bg-[#53c28b] hover:bg-[#53c28b90] text-white font-semibold transition-colors duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
      
      {/* Reviews List */}
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6">What Our Guests Say</h2>
        
        {loadingStatus === "loading" && (
          <div className="w-full flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}
        
        {loadingStatus === "success" && reviews.length === 0 && (
          <div className="text-center py-10 text-lg text-gray-400">
            No approved reviews yet. Be the first to share your experience!
          </div>
        )}
        
        {loadingStatus === "success" && reviews.length > 0 && (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.reviewId} className="bg-[#1a1a1a] p-5 rounded-xl shadow-md">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <img 
                      src={review.profilePicture} 
                      alt="User" 
                      className="w-10 h-10 rounded-full mr-3"
                      onError={(e) => {
                        e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                      }}
                    />
                    <div>
                      <p className="font-medium">{review.email}</p>
                      <p className="text-xs text-gray-400">{formatDate(review.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        color={index < review.rating ? "#FFC107" : "#555"}
                        className="text-lg"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
        
        {loadingStatus === "error" && (
          <div className="text-center py-10">
            <p className="text-xl text-red-400 mb-4">Unable to load reviews</p>
            <button 
              onClick={fetchReviews}
              className="px-4 py-2 bg-[#53c28b] rounded-lg hover:bg-[#53c28b90] transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}