import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, MapPin, Clock } from "lucide-react";
import keycloak from '../../keycloak'; // Assuming this is your Keycloak instance
import ReservationForm from '../ReservationPage/ReservationPage'; // Import the ReservationForm component

const VITE_RESTAURANT_BASE_URL = import.meta.env.VITE_RESTAURANT_BASE_URL;
const VITE_REVIEW_BASE_URL = import.meta.env.VITE_REVIEW_BASE_URL;
const S3_BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME;
const AWS_REGION = import.meta.env.VITE_AWS_REGION;

const RestaurantDetailsPage = () => {
  const { business_id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    stars: 0,
    text: "",
  });
  const [editingReview, setEditingReview] = useState(null);


  
  const user = keycloak.tokenParsed;
  //console.log(user, 'user');
  console.log(user.sub, 'user.sub');
  console.log(business_id,'business_id');

  

  // S3 base URL
  const S3_BASE_URL = `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/photos/`;

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Fetch restaurant details and reviews
  useEffect(() => {
    fetch(`${VITE_RESTAURANT_BASE_URL}/restaurants/${business_id}`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurant(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching restaurant:", error);
        setLoading(false);
      });

      fetch(`${VITE_REVIEW_BASE_URL}/reviews/business/${business_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching reviews:", data.error);
          setReviews([]);
        } else {
          // Pin user's review to the top
          const userReview = data.find((review) => review.user_id === user.sub);
          const otherReviews = data.filter((review) => review.user_id !== user.sub);
          const sortedReviews = userReview ? [userReview, ...otherReviews] : otherReviews;
  
          setReviews(sortedReviews);
        }
        setReviewsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setReviews([]);
        setReviewsLoading(false);
      });
  }, [business_id, user.sub]);

  // Handle form input for adding/updating reviews
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update a review
  const handleAddOrUpdateReview = () => {
    if (!user || !user.sub) {
      console.error("User is not authenticated or user ID is missing");
      return;
    }
    const existingReview = reviews.find((review) => review.user_id === user.sub);
    if (!editingReview && existingReview) {
      alert("You can only add one review per restaurant.");
      return;
  }

    const url = editingReview
      ? `${VITE_REVIEW_BASE_URL}/reviews/${editingReview.review_id}`
      : `${VITE_REVIEW_BASE_URL}/reviews`;

    const method = editingReview ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keycloak.token}`, // Use Keycloak token if available
      },
      body: JSON.stringify({
        business_id,
        ...newReview,
        user_id: user.sub, // Keycloak user ID
        date: new Date().toISOString(),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add/update review");
        }
        return response.json();
      })
      .then(() => {
        setEditingReview(null);
      setNewReview({ stars: 0, text: "" });
      fetch(`${VITE_REVIEW_BASE_URL}/reviews/business/${business_id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error("Error refreshing reviews:", data.error);
            setReviews([]);
          } else {
            // Pin user's review to the top
            const userReview = data.find((review) => review.user_id === user.sub);
            const otherReviews = data.filter((review) => review.user_id !== user.sub);
            const sortedReviews = userReview ? [userReview, ...otherReviews] : otherReviews;

            setReviews(sortedReviews);
          }
        })
        .catch((error) => console.error("Error refreshing reviews:", error));
    })
    .catch((error) => console.error("Error adding/updating review:", error));
};

  // Delete a review
  const handleDeleteReview = (review_id) => {
    fetch(`${VITE_REVIEW_BASE_URL}/reviews/${review_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete review");
        }
        return response.json();
      })
      .then(() => {
        fetch(`${VITE_REVIEW_BASE_URL}/reviews/business/${business_id}`)
          .then((response) => response.json())
          .then((data) => setReviews(Array.isArray(data) ? data : []))
          .catch((error) => {
            console.error("Error fetching reviews:", error);
            setReviews([]);
          });
      })
      .catch((error) => console.error("Error deleting review:", error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }

  const { name, description, average_rating, review_count, address, city, state, hours, image } = restaurant;
  const imageUrl = image ? `${S3_BASE_URL}${image}.jpg` : "../../Images/temporary.jpg";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Restaurant Header */}
      <div className="flex flex-col md:flex-row mb-8">
        <img
          src={imageUrl}
          alt={name}
          className="w-full md:w-1/3 h-64 object-cover rounded-lg shadow-md"
        />
        <div className="md:ml-8 flex-1">
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <div className="flex items-center mb-2">
            {[...Array(Math.floor(average_rating))].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-blue-500 fill-current" />
            ))}
            {[...Array(5 - Math.floor(average_rating))].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-gray-300" />
            ))}
            
          </div>
          <p className="text-gray-700 mb-4">{description}</p>
          <p className="text-gray-600 mb-2">
            <MapPin className="inline-block h-5 w-5 text-gray-500 mr-2" />
            {address}, {city}, {state}
          </p>
          <div className="text-gray-600">
            <h3 className="text-lg font-semibold mb-2">Hours</h3>
            <ul>
              {Object.entries(hours).map(([day, time]) => (
                <li key={day} className="flex justify-between">
                  <span className="font-medium">{day}:</span>
                  <span>{time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Reservation Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <ReservationForm
          userId={user.sub} // Keycloak user ID
          restaurantId={business_id}
        />
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviewsLoading ? (
          <div>Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div>No reviews available for this restaurant.</div>
        ) : (
          <ul>
            {reviews.map((review, index) => (
              <li key={index} className="mb-4 border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span className="text-gray-800 font-bold mr-2">
                      {review.user_name || "Anonymous"}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({formatDate(review.date)})
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(Math.floor(review.stars))].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-blue-500 fill-current" />
                    ))}
                    {[...Array(5 - Math.floor(review.stars))].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-gray-300" />
                    ))}
                  </div>
                  <div>
                    {review.user_id === user.sub ? (
                      <>
                        <button
                          onClick={() => {
                            setEditingReview(review);
                            setNewReview({ stars: review.stars, text: review.text });
                          }}
                          className="text-blue-500 hover:underline mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review.review_id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500 text-sm"></span>
                    )}
                  </div>
                </div>
                <p className="text-gray-700">{review.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add/Edit Review Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">{editingReview ? "Edit Review" : "Add a Review"}</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Stars:</label>
          <input
            type="number"
            name="stars"
            value={newReview.stars}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            min="1"
            max="5"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Text:</label>
          <textarea
            name="text"
            value={newReview.text}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleAddOrUpdateReview}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingReview ? "Update Review" : "Add Review"}
        </button>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
