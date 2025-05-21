import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaStar, FaTrash, FaCheck } from "react-icons/fa";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [filterStatus, setFilterStatus] = useState("all"); // all, pending, approved
  
  useEffect(() => {
    fetchReviews();
  }, []);
  
  const fetchReviews = async () => {
    try {
      setLoadingStatus("loading");
      const token = localStorage.getItem("token");
      
      if (!token) {
        toast.error("Please login as admin");
        setLoadingStatus("error");
        return;
      }
      
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_HOST_URL}/api/reviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setReviews(response.data);
      setLoadingStatus("success");
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoadingStatus("error");
    }
  };
  
  const handleApproveReview = async (email) => {
    try {
      const token = localStorage.getItem("token");
      
      await axios.put(
        `${import.meta.env.VITE_BACKEND_HOST_URL}/api/reviews/approve/${email}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      toast.success("Review approved successfully");
      fetchReviews(); // Refresh the list
    } catch (error) {
      console.error("Error approving review:", error);
      toast.error(error.response?.data?.message || "Failed to approve review");
    }
  };
  
  const handleDeleteReview = async (email) => {
    try {
      const token = localStorage.getItem("token");
      
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_HOST_URL}/api/reviews/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      toast.success("Review deleted successfully");
      fetchReviews(); // Refresh the list
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error(error.response?.data?.message || "Failed to delete review");
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
  
  // Filter reviews based on status
  const filteredReviews = reviews.filter(review => {
    if (filterStatus === "pending") return review.isApproved === false;
    if (filterStatus === "approved") return review.isApproved === true;
    return true; // "all"
  });
  
  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold text-[#53c28b] mb-8">Manage Reviews</h1>
      
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            filterStatus === "all" 
              ? "bg-[#53c28b] text-white" 
              : "bg-[#2c2c2c] text-gray-300 hover:bg-[#3c3c3c]"
          }`}
        >
          All Reviews
        </button>
        <button
          onClick={() => setFilterStatus("pending")}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            filterStatus === "pending" 
              ? "bg-[#53c28b] text-white" 
              : "bg-[#2c2c2c] text-gray-300 hover:bg-[#3c3c3c]"
          }`}
        >
          Pending Approval
        </button>
        <button
          onClick={() => setFilterStatus("approved")}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            filterStatus === "approved" 
              ? "bg-[#53c28b] text-white" 
              : "bg-[#2c2c2c] text-gray-300 hover:bg-[#3c3c3c]"
          }`}
        >
          Approved
        </button>
      </div>
      
      {loadingStatus === "loading" && (
        <div className="w-full flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}
      
      {loadingStatus === "success" && filteredReviews.length === 0 && (
        <div className="text-center py-10 text-lg text-gray-400">
          No reviews found matching the selected filter.
        </div>
      )}
      
      {loadingStatus === "success" && filteredReviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div key={review.reviewId} className="bg-[#1a1a1a] p-5 rounded-xl shadow-lg">
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
                    <p className="font-medium text-white">{review.email}</p>
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
              
              <p className="text-gray-300 mb-4">{review.comment}</p>
              
              {review.roomKey && (
                <p className="text-sm text-gray-400 mb-3">
                  Room Key: <span className="text-[#53c28b]">{review.roomKey}</span>
                </p>
              )}
              
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-700">
                <div>
                  {review.isApproved ? (
                    <span className="text-sm text-green-500 flex items-center">
                      <FaCheck className="mr-1" /> Approved
                    </span>
                  ) : (
                    <span className="text-sm text-yellow-500">Pending Approval</span>
                  )}
                </div>
                
                <div className="flex gap-3">
                  {!review.isApproved && (
                    <button
                      onClick={() => handleApproveReview(review.email)}
                      className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-300"
                      title="Approve Review"
                    >
                      <FaCheck />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDeleteReview(review.email)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-300"
                    title="Delete Review"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {loadingStatus === "error" && (
        <div className="text-center py-10">
          <p className="text-xl text-red-400 mb-4">Failed to load reviews</p>
          <button 
            onClick={fetchReviews}
            className="px-4 py-2 bg-[#53c28b] rounded-lg hover:bg-[#53c28b90] transition-colors duration-300 text-white"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}