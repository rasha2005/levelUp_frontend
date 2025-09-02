

  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

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
  

function ReviewCarousel({review}:ReviewCarouselProps) {
   
    return (
        <div className="w-[800px] mx-auto flex justify-center mt-6">
        {review?.length > 0 ? (
          <Carousel>
            <CarouselContent>
              {review.map((item: Review) => (
                <CarouselItem key={item.id} className={`w-[280px] ${
                    review.length < 3 ? "flex-grow flex-shrink-0" : "basis-1/3"
                  }`}>
                  <div className="p-4 bg-white shadow-lg rounded-lg">
                    <div className="flex items-center space-x-4">
                      {item.user?.img && (
                        <img
                          src={item.user.img}
                          alt={item.user.name || "User"}
                          className="w-7 h-7 rounded-full"
                        />
                      )}
                      <span className="text-sm">
                        {item.user?.name || "Anonymous"}
                      </span>
                    </div>
                    <p className="mt-4">{item.value}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious>Previous</CarouselPrevious>
            <CarouselNext>Next</CarouselNext>
          </Carousel>
        ) : (
          <p>no reviews yet</p>
        )}
      </div>
      
    )
}

export default ReviewCarousel