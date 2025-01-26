import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SliderFilter = () => {
  const [sliderValues, setSliderValues] = useState([20, 80]);

  const handleSliderChange = (values: React.SetStateAction<number[]>) => {
    setSliderValues(values);
  };

  return (
    <div className="w-11/12  mt-8">
      <Slider
        range
        min={0}
        max={100}
        step={1}
        value={sliderValues}
        onChange={handleSliderChange}
        railStyle={{ backgroundColor: '#e0e0e0' }}
        trackStyle={[{ backgroundColor: '#9FB7B9' }, { backgroundColor: '#9FB7B9' }, { backgroundColor: '#9FB7B9' }]}
        handleStyle={[
          { backgroundColor: '#9FB7B9', borderColor: '#9FB7B9' },
          { backgroundColor: '#9FB7B9', borderColor: '#9FB7B9' },
          { backgroundColor: '#9FB7B9', borderColor: '#9FB7B9' },
          { backgroundColor: '#9FB7B9', borderColor: '#9FB7B9' },
        ]}
      />
      <div className="flex justify-center gap-2 mt-4">
        {sliderValues.map((value, index) => (
          <span key={index}>
            {index > 0 && ' - '}₹{value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SliderFilter;


//The below code is use after the dataset is ready and then remove the upper code

// import React, { useState } from "react";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";

// const SliderFilter = () => {
//   const [sliderValues, setSliderValues] = useState([20, 80]); // Slider range
//   const [data, setData] = useState([
//     { id: 1, name: "Item 1", price: 10 },
//     { id: 2, name: "Item 2", price: 30 },
//     { id: 3, name: "Item 3", price: 50 },
//     { id: 4, name: "Item 4", price: 70 },
//     { id: 5, name: "Item 5", price: 90 },
//   ]); // Example dataset

//   const [filteredData, setFilteredData] = useState(data);

//   const handleSliderChange = (values) => {
//     setSliderValues(values);

//     // Apply filter based on slider values
//     const [min, max] = values;
//     const filtered = data.filter((item) => item.price >= min && item.price <= max);
//     setFilteredData(filtered);
//   };

//   return (
//     <div className="w-11/12 mt-8">
//       <Slider
//         range
//         min={0}
//         max={100}
//         step={1}
//         value={sliderValues}
//         onChange={handleSliderChange}
//         railStyle={{ backgroundColor: "#e0e0e0" }}
//         trackStyle={[{ backgroundColor: "#9FB7B9" }]}
//         handleStyle={[
//           { backgroundColor: "#9FB7B9", borderColor: "#9FB7B9" },
//           { backgroundColor: "#9FB7B9", borderColor: "#9FB7B9" },
//         ]}
//       />
//       <div className="flex justify-center gap-2 mt-4">
//         <span>₹{sliderValues[0]}</span>
//         <span>-</span>
//         <span>₹{sliderValues[1]}</span>
//       </div>

//       <div className="mt-8">
//         <h3 className="text-lg font-bold mb-4">Filtered Items</h3>
//         {filteredData.length > 0 ? (
//           <ul>
//             {filteredData.map((item) => (
//               <li key={item.id}>
//                 {item.name} - ₹{item.price}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No items found in this range.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SliderFilter;

