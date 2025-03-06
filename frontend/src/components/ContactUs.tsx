import React, { useState } from 'react'

const ContactUs = () => {

    const faqs = [
        { id: 1, question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
        { id: 2, question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
        { id: 3, question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
        { id: 4, question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
        { id: 5, question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
      ];
      const [openFAQ, setOpenFAQ] = useState(null);
    
      const toggleFAQ = (id) => {
        setOpenFAQ(openFAQ === id ? null : id);
      };

  return (
    <>
      <div className="bg-[#3B5236] py-20 md:py-28 lg:py-32 text-white">
        <div className="container mx-auto px-4">
            <div className="mt-2 text-base md:text-lg text-center">
                <h5 className="text-5xl font-semibold">Contact Us</h5>
                <p className="mt-2 text-base md:text-md">
                Lorem ipsum dolor sit amet consectetur. Condimentum sed sed blandit purus nec nibh tortor ipsum.
                </p>
            </div>
            <div className="mt-2 text-base md:text-lg">
                <nav aria-label="breadcrumb">
                <ol className="flex justify-center md:justify-center space-x-2 text-sm md:text-base">
                    <li>
                    <a href="index.html" className="text-white text-xl hover:text-white">Home</a>
                    </li>
                    <li className="text-white text-xl">{">"}</li>
                    <li className="text-white text-xl">Contact</li>
                </ol>
                </nav>
            </div>
        </div>
    </div>

    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Details Section */}
          <div className="space-y-6">
            <div>
              <h5 className="text-xl font-semibold">Get in touch</h5>
              <a href="mailto:info@example.com" className="text-black flex items-center gap-2">
                info@example.com
                <img src="/assets/images/icons/Testimonial-right-arrowd.svg" alt="Arrow" />
              </a>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-lg font-semibold">Address</h5>
                <address className="text-gray-600">
                  12 NW 19th Place, Pompano<br />Beach, FL, 33063 United States
                </address>
              </div>
              <div>
                <h5 className="text-lg font-semibold">Phone</h5>
                <div className="text-gray-600">
                  <a href="tel:+12345678900">+(1) 234 567 8900</a>
                </div>
                <div className="text-gray-600">
                  <a href="tel:+12345678900">+(1) 234 567 8900</a>
                </div>
              </div>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?..."
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
          {/* Contact Form Section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h6 className="text-lg font-semibold">Fill the form</h6>
            <h5 className="text-xl font-bold">Leave Us A Message</h5>
            <p className="text-gray-600 text-sm mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry...
            </p>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="Name" placeholder="Name" className="p-3 border rounded w-full" />
                <input type="email" name="Email" placeholder="Email" className="p-3 border rounded w-full" />
              </div>
              <input type="text" name="Subject" placeholder="Subject" className="p-3 border rounded w-full" />
              <textarea name="Message" placeholder="Type your message here" className="p-3 border rounded w-full" rows="4"></textarea>
              <button type="submit" className="bg-[#3B5236] text-white px-6 py-2 rounded flex items-center gap-2">
                SEND MESSAGE <img src="/assets/images/icons/Right-arrow.svg" alt="Arrow" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h5 className="text-2xl font-bold">Frequently Asked Questions</h5>
        </div>
        <div className="max-w-6xl mx-auto">
          {faqs.map((faq) => (
            <div key={faq.id} className="mb-4 border border-gray-300 rounded-lg overflow-hidden">
              <button
                className="w-full text-left p-4 bg-white flex justify-between items-center"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span className="font-semibold text-gray-800">{faq.id}. {faq.question}</span>
                <span>{openFAQ === faq.id ? "-" : "+"}</span>
              </button>
              {openFAQ === faq.id && (
                <div className="p-4 bg-gray-50 text-gray-700">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

export default ContactUs
