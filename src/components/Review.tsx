"use client";
import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface ReviewProps {
  productId: number;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const Review: React.FC<ReviewProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "John Doe",
      rating: 4,
      comment: "Great product! Very satisfied with the quality.",
      date: "2024-03-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 5,
      comment: "Excellent product, exceeded my expectations!",
      date: "2024-03-14"
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([...reviews, review]);
    setNewReview({ name: "", rating: 5, comment: "" });
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Your Review
            </label>
            <textarea
              id="comment"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Review
          </button>
        </div>
      </form>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{review.name}</h4>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review; 