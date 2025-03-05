import { useState, useRef, useEffect } from "react";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null); // Reference for auto-scrolling

  // Predefined FAQ Questions & Answers
  const faqOptions = [
    { question: "What are the delivery timings?", answer: "Our delivery timings are 9 AM - 9 PM daily." },
    { question: "Do you offer organic vegetables?", answer: "Yes! We have a wide range of organic vegetables available." },
    { question: "How can I track my order?", answer: "You can track your order in the 'My Orders' section of your account." },
    { question: "Do you accept cash on delivery?", answer: "Yes, we accept Cash on Delivery along with online payments." },
  ];

  // Scroll to bottom when messages update
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle question selection
  const handleQuestionClick = (question: string, answer: string) => {
    setMessages((prev) => [...prev, { text: question, sender: "user" }, { text: answer, sender: "bot" }]);
  };

  // Handle user input submission
  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    // Simulating a bot response (Default Answer)
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "Thank you for reaching out! We'll get back to you soon.", sender: "bot" }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-700 transition"
      >
        {isOpen ? "Close Chat" : "Chat with Us"}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-5 w-96 h-[450px] bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 flex flex-col">
          {/* Header */}
          <div className="bg-green-700 text-white px-5 py-4 font-semibold flex justify-between">
            <span>Veg Bazaar Chat</span>
            <button onClick={() => setIsOpen(false)}>X</button>
          </div>

          {/* Chat Messages */}
          <div ref={chatRef} className="h-[360px] overflow-y-auto p-4 space-y-2 flex flex-col">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">Select a question below or type your query...</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`p-3 rounded-lg max-w-[80%] ${msg.sender === "user" ? "bg-green-100 self-end ml-auto" : "bg-gray-200 self-start mr-auto"}`}>
                  {msg.text}
                </div>
              ))
            )}

            {/* FAQ Question Options Inside Chat */}
            {faqOptions.map((faq, index) => (
              <button
                key={index}
                className="w-auto text-left px-4 py-3 bg-gray-100 rounded-md text-gray-700 hover:bg-green-100 transition self-start"
                onClick={() => handleQuestionClick(faq.question, faq.answer)}
              >
                {faq.question}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex items-center border-t border-gray-300 p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 border rounded-md outline-none"
            />
            <button
              onClick={sendMessage}
              className="ml-3 bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;