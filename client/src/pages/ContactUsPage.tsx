import { useState } from "react";

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Perform form submission logic here (e.g., sending data to an API)
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 mb-4 max-sm:py-4">
      {/* Page Title */}
      <h1 className="text-5xl max-md:text-3xl  max-sm:text-xl  font-bold text-center text-yellow-600">
        Contact Us
      </h1>
      <p className="mt-6 text-lg max-sm:text-sm text-gray-600 text-center">
        Have any questions or inquiries? We’re here to help. Reach out to us by
        filling the form below, and we’ll get back to you as soon as possible.
      </p>

      {/* Contact Form */}
      <div className="mt-12 max-sm:mt-6">
        {submitted ? (
          <div className="text-center text-green-600">
            <h2 className="text-3xl max-md:text-2xl max-sm:text-lg  font-semibold">
              Thank you for reaching out!
            </h2>
            <p className="mt-4 max-sm:text-sm">
              We have received your message and will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8  max-sm:space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-lg max-sm:text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 w-full p-4 max-sm:p-2 max-sm:text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-lg max-sm:text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full p-4 max-sm:p-2 max-sm:text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-lg max-sm:text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-2 w-full p-4 max-sm:p-2 max-sm:text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Enter the subject of your message"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-lg max-sm:text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-2 w-full p-4 max-sm:p-2 max-sm:text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                rows={6}
                placeholder="Enter your message here"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-4 max-sm:py-2 max-sm:text-base max-sm:px-4 bg-yellow-600 text-white font-bold rounded-lg shadow-md hover:bg-yellow-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Contact Information */}
      <div className="mt-16 max-sm:mt-8 text-center">
        <h2 className="text-3xl max-md:text-2xl max-sm:text-lg  font-semibold text-gray-800">
          Other Ways to Contact Us
        </h2>
        <p className="mt-4 text-lg max-sm:text-sm text-gray-600">
          Feel free to reach us through any of the following methods:
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl max-sm:text-base font-bold text-gray-700">
              Call Us
            </h3>
            <p className="mt-2 text-gray-600">1-800-555-5555</p>
            <p className="mt-1 text-gray-500">Available 24/7</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl max-sm:text-base font-bold text-gray-700">
              Email Us
            </h3>
            <p className="mt-2 text-gray-600">support@example.com</p>
            <p className="mt-1 text-gray-500">Response within 24 hours</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl max-sm:text-base font-bold text-gray-700">
              Visit Us
            </h3>
            <p className="mt-2 text-gray-600">123 Main St, Anytown, USA</p>
            <p className="mt-1 text-gray-500">Mon-Fri: 9am - 5pm</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
