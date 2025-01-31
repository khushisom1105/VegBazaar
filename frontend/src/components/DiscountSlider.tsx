import Slider from 'react-slick'; // import the slick carousel component
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

const DiscountSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const discountSlides = [
    {
      id: 1,
      text: 'Discount Up To 20% Off',
      imageSrc: 'assets/images/gallery/single-Leaf.png',
    },
    {
      id: 2,
      text: 'Discount Up To 20% Off',
      imageSrc: 'assets/images/gallery/single-Leaf.png',
    },
    {
      id: 3,
      text: 'Discount Up To 20% Off',
      imageSrc: 'assets/images/gallery/single-Leaf.png',
    },
    {
      id: 4,
      text: 'Discount Up To 20% Off',
      imageSrc: 'assets/images/gallery/single-Leaf.png',
    },
  ];

  return (
    <div className="mg-discount-section py-8">
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {discountSlides.map((slide) => (
            <div className="mg-discount-slide" key={slide.id}>
              <div className="flex justify-between items-center space-x-4">
              <div className="w-1/4 sm:w-2/12 md:w-2/12">
                  <div className="flex justify-center">
                    <img
                      src={slide.imageSrc}
                      alt="Discount Leaf"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>
                <div className="w-full md:w-10/12">
                  <div className="text-lg font-semibold text-gray-700">
                    <span>{slide.text}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DiscountSlider;
