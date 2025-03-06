import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Ornare id lacus volutpat eget aliquet eu at sed massa tincidunt tristique fermentum?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac orci et diam pulvinar malesuada."
    },
    {
      question: "Ornare id lacus volutpat eget aliquet eu at sed massa tincidunt tristique?",
      answer: "Nullam non neque et lectus dignissim luctus. Suspendisse a lorem at sapien tincidunt egestas."
    }
  ];

  return (
    <>
      {/* Header Section */}
      <div className="bg-[#3B5236] flex flex-col justify-center items-center h-96 text-white gap-3 p-10">
        <p className="flex font-marcellus text-4xl font-semibold">Have Any Questions?</p>
        <p className="flex">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, beatae magnam quaerat dicta sequi esse.</p>
        <p className="flex font-nunito text-lg font-semibold">Home &rarr; FAQs</p>
      </div>

      {/* Centered FAQ Section */}
      <div className="flex items-center justify-center m-10 px-4">
        <div className="bg-white w-full max-w-3xl p-6 shadow-lg rounded-md">
          <h1 className="text-xl sm:text-2xl font-bold text-center">Welcome, How Can We Help You?</h1>
          <p className=" text-center mt-2 text-sm sm:text-base">
            Libero ut pretium vestibulum tellus magna gravida sit aliquam. Habitant mauris lectus commodo semper posuere aliquam.
          </p>

          <div className="mt-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-300 py-3">
                <button
                  className="w-full flex justify-between items-center text-left text-sm sm:text-lg font-semibold"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="flex-1 break-words pr-2">{faq.question}</span>
                  <span className="text-green-700 text-xl">{openIndex === index ? "−" : "+"}</span>
                </button>
                {openIndex === index && <p className="text-gray-600 mt-2 text-sm sm:text-base">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
