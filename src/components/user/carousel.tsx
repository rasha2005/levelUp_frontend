"use client";

import Image from "next/image";
import { useState } from "react";

interface Review {
  id: string;
  value: string;
  createdAt: string;      
  instructorId: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    mobile: string;
    img: string | null;
  };
}

interface ReviewCarouselProps {
  review: Review[];
}

function ReviewCarousel({ review }: ReviewCarouselProps) {
  const REVIEWS_PER_PAGE = 5;
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + REVIEWS_PER_PAGE);
  };

  const visibleReviews = review.slice(0, visibleCount);

  return (
    <div className="max-w-6xl mx-auto mt-6">
      {review?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {visibleReviews.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white shadow-lg rounded-lg"
              >
                <div className="flex items-center space-x-4">
                <img
                  src={item.user?.img || "/images/defaultProfile.jpg"}
                  alt={item.user?.name || "User"}
                  className="w-10 h-10 rounded-full"
                />
                  <span className="text-sm font-semibold">
                    {item.user?.name || "Anonymous"}
                  </span>
                </div>
                <p className="mt-4 text-gray-700">{item.value}</p>
              </div>
            ))}
          </div>

          {visibleCount < review.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
                  <div className="relative w-48 h-48 mb-4">
                   <Image
                      src="/images/empty.png"
                      alt="No instructors found"
                      width={192} 
                      height={192} 
                      className="mb-6"
                                 />
                  </div>
                  <p className="text-gray-500 text-center">No reviews available .</p>
                </div>
      )}
    </div>
  );
}

export default ReviewCarousel;
