import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

export default function RoomReviews({ roomKey }) {
  const [reviews, setReviews] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    fetchRoomReviews();
  }, [roomKey]);
  
  const fetchRoomReviews = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/reviews?roomKey=${roomKey}`);
      // Filter for approved reviews or all reviews if user is admin (you'd need to add this logic)
      const approvedReviews = response.data.filter(review => review.isApproved !== false);
      setReviews(approvedReviews);
      setLoadingStatus("success");
    } catch (error) {
      console.error("Error fetching room reviews:", error);
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
        roomKey
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
      
      toast.success("Review submitted successfully!");
      setComment("");
      setRating(0);
      setShowReviewForm(false);
      fetchRoomReviews(); // Refresh reviews
      
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
  
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };
  
  return (
    <div className="w-full bg-[#1a1a1a] p-5 rounded-xl shadow-lg mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Guest Reviews</h2>
        <div className="flex items-center">
          <div className="flex mr-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                color={index < Math.round(calculateAverageRating()) ? "#FFC107" : "#555"}
                className="text-lg"
              />
            ))}
          </div>
          <span className="text-[#53c28b] font-bold">{calculateAverageRating()}</span>
          <span className="text-gray-400 ml-2">({reviews.length} reviews)</span>
        </div>
      </div>
      
      {/* Write Review Button */}
      <button
        onClick={() => setShowReviewForm(!showReviewForm)}
        className="mb-6 px-4 py-2 bg-[#53c28b] hover:bg-[#53c28b90] text-white rounded-lg transition-colors duration-300"
      >
        {showReviewForm ? "Cancel" : "Write a Review"}
      </button>
      
      {/* Review Form */}
      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="mb-8 bg-[#222] p-4 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm mb-2 text-white">Your Rating</label>
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
          
          <div className="mb-4">
            <label className="block text-sm mb-2 text-white">Your Review</label>
            <textarea
              className="w-full p-3 rounded-md bg-[#2c2c2c] border border-[#444] text-white"
              rows="4"
              placeholder="Share your experience with this room..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full p-3 rounded-md bg-[#53c28b] hover:bg-[#53c28b90] text-white font-semibold transition-colors duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}
      
      {/* Reviews List */}
      {loadingStatus === "loading" && (
        <div className="w-full flex justify-center py-6">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}
      
      {loadingStatus === "success" && reviews.length === 0 && (
        <div className="text-center py-6 text-lg text-gray-400">
          No reviews yet. Be the first to share your experience!
        </div>
      )}
      
      {loadingStatus === "success" && reviews.length > 0 && (
        <div className="space-y-5">
          {reviews.map((review) => (
            <div key={review.reviewId} className="bg-[#222] p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <img 
                    src={review.profilePicture} 
                    alt="User" 
                    className="w-8 h-8 rounded-full mr-3"
                    onError={(e) => {
                      e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                    }}
                  />
                  <div>
                    <p className="font-medium text-white">{review.email}</p>
                    <p className="text-xs text-gray-400">{formatDate(review.createdAt)}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      color={index < review.rating ? "#FFC107" : "#555"}
                      className="text-sm"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
      
      {loadingStatus === "error" && (
        <div className="text-center py-6">
          <p className="text-red-400 mb-2">Unable to load reviews</p>
          <button 
            onClick={fetchRoomReviews}
            className="px-3 py-1 bg-[#53c28b] rounded-lg hover:bg-[#53c28b90] transition-colors duration-300 text-white text-sm"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}