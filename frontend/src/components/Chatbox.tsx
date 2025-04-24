import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot"; commentId?: string; isFAQ?: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [isAdminResponse, setIsAdminResponse] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const faqOptions = [
    { question: "What are the delivery timings?", answer: "Our delivery timings are 9 AM - 9 PM daily." },
    { question: "Do you offer organic vegetables?", answer: "Yes! We have a wide range of organic vegetables available." },
    { question: "How can I track my order?", answer: "You can track your order in the 'My Orders' section of your account." },
    { question: "Do you accept cash on delivery?", answer: "Yes, we accept Cash on Delivery along with online payments." },
  ];

  // Scroll to bottom of chat when messages update
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch comments and map them to chat messages
  const fetchComments = async () => {
    try {
      const res = await axios.get('http://localhost:4007/cms/comments');
      const fetchedComments = res.data.comments;

      // Filter out FAQ messages to avoid overwriting them
      const currentFAQMessages = messages.filter(msg => msg.isFAQ);

      // Map comments to messages, ensuring both user message and admin reply are shown
      const commentMessages = fetchedComments.flatMap(comment => {
        const messageList = [];
        // Add user message
        messageList.push({
          text: comment.message,
          sender: "user",
          commentId: comment._id,
        });
        // If replied, add admin reply as a separate message
        if (comment.replied) {
          messageList.push({
            text: comment.reply,
            sender: "bot",
            commentId: comment._id,
          });
        } else if (!messages.some(msg => msg.commentId === comment._id && msg.sender === "bot")) {
          // Add "awaiting response" message only if not already present
          messageList.push({
            text: "Thank you for reaching out! We'll get back to you soon.",
            sender: "bot",
            commentId: comment._id,
          });
        }
        return messageList;
      });

      // Combine FAQ messages with comment messages
      setMessages([...currentFAQMessages, ...commentMessages]);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Fetch comments on mount
  useEffect(() => {
    fetchComments();
  }, []);

  // Poll for admin replies if a message is sent to admin
  useEffect(() => {
    if (isAdminResponse) {
      const interval = setInterval(fetchComments, 5000); // Poll every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isAdminResponse]);

  // Handle clicking a predefined FAQ question
  const handleQuestionClick = (question: string, answer: string) => {
    setMessages((prev) => [
      ...prev,
      { text: question, sender: "user", isFAQ: true },
      { text: answer, sender: "bot", isFAQ: true },
    ]);
  };

  // Handle sending a custom message
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user's message to the chat
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);

    // Check if the message matches a predefined FAQ
    const faq = faqOptions.find((option) => option.question.toLowerCase() === input.toLowerCase());
    if (faq) {
      setMessages((prev) => [
        ...prev,
        { text: faq.answer, sender: "bot", isFAQ: true },
      ]);
    } else {
      // If not a predefined question, send to admin
      try {
        const res = await axios.post('http://localhost:4007/cms/comments', { message: input });
        const commentId = res.data.comment._id;
        setMessages((prev) => [
          ...prev,
          { text: "Thank you for reaching out! We'll get back to you soon.", sender: "bot", commentId },
        ]);
        setIsAdminResponse(true);
      } catch (error) {
        console.error('Error sending comment:', error);
        setMessages((prev) => [...prev, { text: "Error sending message. Please try again.", sender: "bot" }]);
      }
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Chat Avatar Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-green-600 rounded-full shadow-lg hover:scale-105 transition duration-300 flex items-center justify-center"
        >
          <span className="text-white text-2xl">💬</span>
        </button>
      )}

      {/* AnimatePresence for smooth enter/exit */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-5 w-[90vw] sm:w-96 h-[500px] bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="bg-green-700 text-white px-5 py-4 flex justify-between items-center">
              <h2 className="font-semibold text-lg">Veg Bazaar Chat</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition font-bold"
              >
                X
              </button>
            </div>

            {/* Messages */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center italic">Select a question or type your message below...</p>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                      msg.sender === "user"
                        ? "bg-green-100 self-end ml-auto rounded-br-none"
                        : "bg-gray-200 self-start mr-auto rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))
              )}

              {/* FAQ Quick Replies */}
              {faqOptions.map((faq, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(faq.question, faq.answer)}
                  className="text-sm bg-white border border-gray-300 hover:bg-green-100 transition duration-200 px-3 py-2 rounded-xl text-gray-700 shadow-sm w-fit self-start"
                >
                  {faq.question}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center border-t border-gray-200 p-3 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-green-400"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="ml-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition duration-300"
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBox;