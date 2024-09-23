import { useState } from "react";

function HelpPage() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number | null) => {
    setActiveQuestion(index === activeQuestion ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Page Title */}
      <h1 className="text-5xl max-md:text-3xl  max-sm:text-xl font-bold text-center text-yellow-600">
        Need Help?
      </h1>
      <p className="mt-6 text-lg max-sm:text-sm text-gray-600 text-center">
        We're here to assist you! Find answers to the most common questions
        below, or get in touch with us directly.
      </p>

      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="text-3xl max-md:text-2xl max-sm:text-lg font-semibold text-gray-800 text-center">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 max-sm:mt-4 space-y-6 max-sm:space-y-3">
          {/* FAQ Item 1 */}
          <div className="bg-white p-6 max-sm:p-3 rounded-lg shadow-md">
            <button
              onClick={() => toggleQuestion(0)}
              className="w-full text-left text-xl max-sm:text-base font-semibold text-gray-700"
            >
              How do I track my order?
            </button>
            {activeQuestion === 0 && (
              <p className="mt-4 text-gray-600">
                You can track your order by visiting the "Order Tracking"
                section in your account or by clicking on the tracking link in
                your confirmation email.
              </p>
            )}
          </div>

          {/* FAQ Item 2 */}
          <div className="bg-white p-6 max-sm:p-3 rounded-lg shadow-md">
            <button
              onClick={() => toggleQuestion(1)}
              className="w-full text-left text-xl max-sm:text-base font-semibold text-gray-700"
            >
              What is your return policy?
            </button>
            {activeQuestion === 1 && (
              <p className="mt-4 text-gray-600">
                We offer a 30-day return policy for all purchases. Items must be
                unused, with the original packaging intact. For more details,
                visit our Returns page.
              </p>
            )}
          </div>

          {/* FAQ Item 3 */}
          <div className="bg-white p-6 max-sm:p-3 rounded-lg shadow-md">
            <button
              onClick={() => toggleQuestion(2)}
              className="w-full text-left text-xl max-sm:text-base font-semibold text-gray-700"
            >
              How can I contact customer support?
            </button>
            {activeQuestion === 2 && (
              <p className="mt-4 text-gray-600">
                You can reach us via email at support@example.com or call our
                support line at 1-800-555-5555. Our customer support team is
                available 24/7.
              </p>
            )}
          </div>

          {/* FAQ Item 4 */}
          <div className="bg-white p-6 max-sm:p-3 rounded-lg shadow-md">
            <button
              onClick={() => toggleQuestion(3)}
              className="w-full text-left text-xl max-sm:text-base font-semibold text-gray-700"
            >
              How do I change or cancel my order?
            </button>
            {activeQuestion === 3 && (
              <p className="mt-4 text-gray-600">
                You can modify or cancel your order within 24 hours by visiting
                your account and selecting the "Modify Order" option. If you
                need further assistance, contact our support team.
              </p>
            )}
          </div>

          {/* FAQ Item 5 */}
          <div className="bg-white p-6 max-sm:p-3 rounded-lg shadow-md">
            <button
              onClick={() => toggleQuestion(4)}
              className="w-full text-left text-xl max-sm:text-base font-semibold text-gray-700"
            >
              Do you offer international shipping?
            </button>
            {activeQuestion === 4 && (
              <p className="mt-4 text-gray-600">
                Yes, we offer international shipping to most countries. Shipping
                fees and delivery times vary depending on the destination. Visit
                our Shipping Information page for more details.
              </p>
            )}
          </div>

          {/* FAQ Item 6 */}
          <div className="bg-white p-6 max-sm:p-3 rounded-lg shadow-md">
            <button
              onClick={() => toggleQuestion(5)}
              className="w-full text-left text-xl max-sm:text-base font-semibold text-gray-700"
            >
              What payment methods do you accept?
            </button>
            {activeQuestion === 5 && (
              <p className="mt-4 text-gray-600">
                We accept major credit cards, PayPal, and Apple Pay. All
                transactions are secure and encrypted for your protection.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="mt-16 max-sm:mt-8">
        <h2 className="text-3xl max-md:text-2xl max-sm:text-lg font-semibold text-gray-800 text-center">
          Need More Assistance?
        </h2>
        <p className="mt-4 text-lg max-sm:text-sm text-gray-600 text-center">
          Our support team is here to help with any additional questions or
          issues you may have.
        </p>

        <div className="mt-8 max-sm:mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 max-sm:p-3 rounded-lg shadow-md text-center">
            <h3 className="text-xl max-sm:text-base font-bold text-gray-700">
              Call Us
            </h3>
            <p className="mt-2 text-gray-600 max-sm:text-sm">1-800-555-5555</p>
            <p className="mt-1 text-gray-500 max-sm:text-sm">Available 24/7</p>
          </div>

          <div className="bg-white p-6 max-sm:p-3 rounded-lg shadow-md text-center">
            <h3 className="text-xl max-sm:text-base font-bold text-gray-700">
              Email Us
            </h3>
            <p className="mt-2 text-gray-600 max-sm:text-sm">
              support@fesco.com
            </p>
            <p className="mt-1 text-gray-500 max-sm:text-sm">
              Response within 24 hours
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-16 max-sm:mt-8 text-center">
        <h2 className="text-3xl max-md:text-2xl max-sm:text-lg font-semibold text-gray-800">
          Still Need Help?
        </h2>
        <p className="mt-4 text-lg max-sm:text-sm text-gray-600">
          If you can't find the answers you're looking for, feel free to contact
          our support team for further assistance.
        </p>

        {/* Contact Button */}
        <button className="mt-8 max-sm:mt-4 px-8 py-4 bg-yellow-600 text-white font-bold rounded-lg shadow-md hover:bg-yellow-700 transition duration-300">
          Contact Us
        </button>
      </div>
    </div>
  );
}

export default HelpPage;
