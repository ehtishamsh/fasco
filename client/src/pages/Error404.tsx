import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Error404() {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);
  useEffect(() => {
    const interval = setTimeout(() => {
      setCount((prev) => {
        if (prev === 0) {
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    // Redirect to the home page after 5 seconds

    return () => clearTimeout(interval); // Clear timeout if the component unmounts
  }, [count]);
  if (count === 0) {
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* 404 Error Message */}
      <div className="text-center">
        <h1 className="text-7xl md:text-9xl font-extrabold text-yellow-600">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-4 md:mt-6">
          Oops! Page Not Found
        </h2>
        <p className="mt-2 md:mt-4 text-base md:text-lg text-gray-600">
          Sorry, the page you're looking for doesn't exist. You'll be redirected
          to the homepage shortly.
        </p>

        {/* Timer animation */}
        <div className="mt-6 md:mt-10 text-yellow-600 flex items-center justify-center flex-col gap-2">
          <div className="w-16 h-16 md:w-20 md:h-20 border-8 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 md:mt-3 text-gray-600 font-bold">
            Redirecting in {count} seconds...
          </p>
        </div>
      </div>

      {/* Link to return home immediately */}
      <div className="mt-6 md:mt-8">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 md:px-6 md:py-3 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition duration-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}

export default Error404;
