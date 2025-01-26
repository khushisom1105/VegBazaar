import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  onRatingSelected: (rating: number) => void; // Callback to return the selected rating
}

const StarRating: React.FC<StarRatingProps> = ({ onRatingSelected }) => {
  const [rating, setRating] = useState(0); // Current rating
  const [hover, setHover] = useState(0);  // Hovered star index
  const [isLocked, setIsLocked] = useState(false); // Lock state after selection

  const totalStars = 5; // Number of stars

  const handleClick = (currentStar: number) => {
    if (!isLocked) {
      setRating(currentStar);
      setIsLocked(true); // Lock the rating after selection
      onRatingSelected(currentStar); // Call the callback with the selected rating
    }
  };

  return (
    <div className="flex space-x-1">
      {[...Array(totalStars)].map((_, index) => {
        const currentStar = index + 1; // Star index starts from 1
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(currentStar)} // Set rating and lock on click
            onMouseEnter={() => !isLocked && setHover(currentStar)} // Highlight on hover if not locked
            onMouseLeave={() => !isLocked && setHover(0)} // Reset highlight if not locked
            className="focus:outline-none"
          >
            <FaStar
              className={`w-6 h-6 cursor-pointer ${
                currentStar <= (hover || rating)
                  ? "text-yellow-400" // Highlighted star
                  : "text-gray-300" // Default star
              } ${isLocked ? "cursor-default" : ""}`} // Disable pointer if locked
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;


//How to use this in calling and storing the rating number of star
// import React from "react";
// import StarRating from "./StarRating";
// const App = () => {
//   const handleRatingSelected = (rating: number) => {
//     console.log("Selected Rating:", rating); // Use this rating as needed
//     // Example: send it to an API or store it in state
//   };
//   return (
//     <div className="p-4">
//       <h1 className="text-lg font-semibold mb-4">Rate the Product</h1>
//       <StarRating onRatingSelected={handleRatingSelected} />
//     </div>
//   );
// };
// export default App;
