import React, { useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6';

const ContactUs = () => {

    const faqs = [
        { id: 1, question: "What types of vegetables do you offer?", answer: "We offer a wide range of fresh vegetables, including leafy greens, root vegetables, exotic produce, and organic options." },
        { id: 2, question: "Do you sell organic vegetables?", answer: "Yes, we provide a selection of certified organic vegetables. Look for the Organic label on product pages." },
        { id: 3, question: "Are your vegetables fresh?", answer: "Absolutely! We source our vegetables daily to ensure the freshest produce reaches your doorstep." },
        { id: 4, question: "Do you offer seasonal vegetables?", answer: "Yes, we stock seasonal vegetables based on availability. Check our website for the latest arrivals." },
        { id: 5, question: "How can I place an order?", answer: "Simply browse our website, add items to your cart, and proceed to checkout." },
      ];
      const [openFAQ, setOpenFAQ] = useState(null);
    
      const toggleFAQ = (id) => {
        setOpenFAQ(openFAQ === id ? null : id);
      };

  return (
    <>
    <div className='bg-[#3B5236] flex flex-col justify-center items-center h-96 text-white gap-3 p-10'>
                <p className='flex font-marcellus text-4xl font-semibold'>Contact Us</p>
                <p className='flex'>Let’s connect! We’re just a message or call away.</p>
                <p className='flex font-nunito text-lg font-semibold'>Home &rarr; Contact</p>
            </div>

    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Details Section */}
          <div className="space-y-6">
            <div>
              <h5 className="text-xl font-semibold">Get in touch</h5>
              <a href="mailto:info@example.com" className="text-black flex items-center gap-2">
                vegbazaar@gmail.com
                <img src="/assets/images/icons/Testimonial-right-arrowd.svg" alt="Arrow" />
              </a>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-lg font-semibold">Address</h5>
                <address className="text-gray-600">
                  B-108, Landmark<br />Kudasan, Gandhinagar, Gujarat, India
                </address>
              </div>
              <div>
                <h5 className="text-lg font-semibold">Phone</h5>
                <div className="text-gray-600">
                  <a href="tel:+12345678900">+(91) 99 0999 9999  </a>
                </div>
                <div className="text-gray-600">
                  <a href="tel:+12345678900">+(91) 99 9505 9955</a>
                </div>
              </div>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.82706218519!2d72.62672367477478!3d23.176511110567063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2bb3619f9fdf%3A0xc4be3eeb15516748!2sThe%20Landmark!5e0!3m2!1sen!2sin!4v1741276141914!5m2!1sen!2sin"
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
            <h5 className="text-xl font-bold">Leave Us A Message</h5> <br/>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="Name" placeholder="Name" className="p-3 border rounded w-full" />
                <input type="email" name="Email" placeholder="Email" className="p-3 border rounded w-full" />
              </div>
              <input type="text" name="Subject" placeholder="Subject" className="p-3 border rounded w-full" />
              <textarea name="Message" placeholder="Type your message here" className="p-3 border rounded w-full" rows="4"></textarea>
              <button className='flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 bg-[#3B5236] text-white font-semibold hover:bg-[#D3B758]'>SEND MESSAGE <FaArrowRightLong /></button>
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
