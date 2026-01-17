'use client'

import Link from 'next/link'

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex flex-col items-center justify-center px-4 py-12">
      {/* Main Error Content Box */}
      <div className="max-w-2xl w-full">
        {/* Decorative Icon/Illustration */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 rounded-full p-8 shadow-2xl">
              <svg
                className="w-24 h-24 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Content Box */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100 transform transition-all hover:shadow-3xl">
          {/* Greeting */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Hello! 👋
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto rounded-full"></div>
          </div>

          {/* Apology Message */}
          <div className="text-center space-y-6 mb-8">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              We sincerely apologize for the inconvenience you're experiencing.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              It seems something went wrong, and we're working hard to fix it. 
              Your patience and understanding mean the world to us.
            </p>
            <p className="text-base text-gray-500 leading-relaxed">
              We value your experience and are committed to providing you with 
              the best service possible. Thank you for being a valued customer.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
            >
              Go Back Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-12 text-center">
          <p className="text-lg md:text-xl text-gray-600 font-medium animate-pulse">
            Please stay tuned, it will be available soon
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

