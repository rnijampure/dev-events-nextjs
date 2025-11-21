"use client";
import React from "react";
const BookEvent = () => {
  const [email, setEmail] = React.useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking logic here
    alert(`Booking confirmed for ${email}`);
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <div id="book-event" className="mt-4 ">
      {submitted ? (
        <p className="text-green-400">
          Thank you for booking! We have sent a confirmation to your email.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mt-3">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white-700"
            >
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter  your email here"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Book Event
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
