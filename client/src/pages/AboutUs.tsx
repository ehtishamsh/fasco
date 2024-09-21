import { BreadCrum } from "@/components/BreadCrum";

function AboutUs() {
  return (
    <div className="max-w-6xl mx-auto px-4 my-20">
      {/* Breadcrumb */}
      <BreadCrum cat="about" />

      {/* Introduction Section */}
      <div className="mt-12 text-center">
        <h1 className="text-5xl max-md:text-3xl max-sm:text-xl  inline-block font-extrabold bg-yellowColor w-fit text-black rounded-lg p-2">
          About Us
        </h1>
        <p className="mt-5 text-lg max-sm:text-base text-gray-700 leading-relaxed">
          At{" "}
          <span className="font-semibold bg-yellowColor text-black rounded-lg p-1">
            FESCO
          </span>
          , we are more than just a business. We are a passionate team committed
          to delivering the best ecommerce experience. From innovative products
          to exceptional service, our mission is to exceed your expectations
          with every interaction. We believe in forging lasting connections with
          our customers and growing together in this exciting digital age.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="mt-20 max-sm:mt-10 ">
        <h2 className="text-4xl max-md:text-2xl max-sm:text-xl font-semibold text-gray-800 text-center">
          Our Story
        </h2>
        <p className="text-center text-lg max-sm:text-base text-gray-600 mt-4 max-w-3xl mx-auto">
          Founded in 2015, we started as a small team with big dreams. Our
          journey has been marked by growth, innovation, and a relentless drive
          to provide the best ecommerce solutions. From our humble beginnings to
          becoming a leading name in the industry, our story is one of passion
          and determination.
        </p>
        <div className="mt-10 text-center">
          <img
            className="mx-auto w-full max-w-4xl rounded-lg shadow-lg"
            src="/ourstory.png"
            alt="Company Journey"
          />
          <p className="mt-4 text-gray-600 max-sm:text-sm">
            A glimpse of our journey over the years.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mt-20 max-sm:mt-10">
        <h2 className="text-4xl max-md:text-2xl max-sm:text-xl font-semibold text-gray-800 text-center">
          Our Core Values
        </h2>
        <p className="text-center text-lg max-sm:text-base text-gray-600 mt-4 max-sm:mt-2">
          Built on trust, driven by innovation, and focused on the customer.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 max-sm:mt-5 max-sm:gap-5 gap-10 mt-10">
          <div className="bg-yellowColor p-8 max-sm:p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl max-md:text-xl max-sm:text-base font-bold text-black">
              Customer First
            </h3>
            <p className="mt-4 max-sm:mt-2 text-gray-600 max-sm:text-sm">
              Our customers are at the heart of everything we do. We offer
              personalized services, ensuring each interaction leaves you
              satisfied.
            </p>
          </div>
          <div className="bg-yellowColor p-8 max-sm:p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-bold text-black max-md:text-xl max-sm:text-base">
              Innovation
            </h3>
            <p className="mt-4 max-sm:mt-2 text-gray-600 max-sm:text-sm">
              By embracing new technologies and ideas, we continuously evolve to
              offer the most innovative products and experiences.
            </p>
          </div>
          <div className="bg-yellowColor p-8 max-sm:p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-bold text-black max-md:text-xl max-sm:text-base">
              Integrity
            </h3>
            <p className="mt-4 max-sm:mt-2 text-gray-600 max-sm:text-sm">
              We maintain transparency, honesty, and ethics in all our dealings,
              creating trust with our customers and partners.
            </p>
          </div>
        </div>
      </div>

      {/* Our Achievements Section */}
      <div className="mt-20 max-sm:mt-10">
        <h2 className="text-4xl max-md:text-2xl max-sm:text-xl font-semibold text-gray-800  text-center">
          Our Achievements
        </h2>
        <p className="text-center text-lg max-sm:text-base text-gray-600 mt-4">
          We take pride in our accomplishments as a company. Here are some
          milestones we've achieved.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 max-sm:mt-5 max-sm:gap-5 gap-10 mt-10 text-center">
          <div className="bg-yellow-100 p-8 max-sm:p-4 rounded-lg shadow-lg">
            <h3 className="text-3xl max-sm:text-xl font-bold text-yellow-700">
              100K+
            </h3>
            <p className="mt-4 text-gray-600">Satisfied Customers</p>
          </div>
          <div className="bg-yellow-100 p-8 max-sm:p-4 rounded-lg shadow-lg">
            <h3 className="text-3xl max-sm:text-xl font-bold text-yellow-600">
              500+
            </h3>
            <p className="mt-4 text-gray-600">Products Sold</p>
          </div>
          <div className="bg-yellow-100 p-8 max-sm:p-4 rounded-lg shadow-lg">
            <h3 className="text-3xl max-sm:text-xl font-bold text-yellow-600">
              50+
            </h3>
            <p className="mt-4 text-gray-600">Team Members</p>
          </div>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="mt-20 max-sm:mt-10">
        <h2 className="text-4xl max-md:text-2xl max-sm:text-xl font-semibold text-gray-800 text-center">
          Meet Our Team
        </h2>
        <p className="text-center text-lg max-sm:text-base text-gray-600 mt-4">
          A group of talented individuals driving FESCO forward.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 max-sm:mt-5 max-sm:gap-5">
          <div className="text-center">
            <img
              className="w-40 h-40 mx-auto rounded-full border-2 border-yellowColor shadow-lg"
              src="/ceo.jpg"
              alt="Ehtisham Shah"
            />
            <h3 className="mt-6 text-2xl max-sm:text-lg font-semibold text-yellow-900">
              Ehtisham Shah
            </h3>
            <p className="text-gray-500">CEO</p>
            <p className="mt-3 max-sm:mt-1 text-gray-600">
              With a passion for innovation, Jane leads the company with a
              vision for a brighter future.
            </p>
          </div>
          <div className="text-center">
            <img
              className="w-40 h-40 mx-auto rounded-full border-2 border-yellowColor shadow-lg"
              src="/cto.png"
              alt="John Smith"
            />
            <h3 className="mt-6 text-2xl max-sm:text-lg font-semibold text-yellow-900">
              John Smith
            </h3>
            <p className="text-gray-500">CTO</p>
            <p className="mt-3 max-sm:mt-1 text-gray-600">
              John spearheads our tech initiatives, always pushing boundaries to
              offer the best solutions.
            </p>
          </div>
          <div className="text-center">
            <img
              className="w-40 h-40 mx-auto rounded-full border-2 border-yellowColor shadow-lg"
              src="/coo.png"
              alt="Emily Johnson"
            />
            <h3 className="mt-6 text-2xl max-sm:text-lg font-semibold text-yellow-900">
              Emily Johnson
            </h3>
            <p className="text-gray-500">COO</p>
            <p className="mt-3 max-sm:mt-1 text-gray-600">
              Emily ensures smooth operations and oversees the company's ongoing
              growth.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-20 max-sm:mt-10">
        <h2 className="text-4xl max-md:text-2xl max-sm:text-xl font-semibold text-gray-800 text-center">
          What Our Customers Say
        </h2>
        <p className="text-center text-lg max-sm:text-base text-gray-600 mt-4">
          Hear from some of our valued customers about their experiences with
          us.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          <div className="bg-white p-8 max-sm:p-4 max-sm:text-sm rounded-lg shadow-lg">
            <p className="text-gray-600">
              "The team at{" "}
              <span className="font-semibold bg-yellowColor text-black rounded-lg p-1">
                FESCO
              </span>{" "}
              has exceeded my expectations every step of the way. The products
              are high quality and the customer service is top-notch."
            </p>
            <p className="mt-4 text-yellow-900 font-bold">- Alex Thompson</p>
          </div>
          <div className="bg-white p-8 max-sm:p-4 max-sm:text-sm rounded-lg shadow-lg">
            <p className="text-gray-600">
              "I’ve never had such a smooth online shopping experience. Fast
              delivery, excellent products, and great communication."
            </p>
            <p className="mt-4 text-yellow-900 font-bold">- Sarah Lee</p>
          </div>
          <div className="bg-white p-8 max-sm:p-4 max-sm:text-sm rounded-lg shadow-lg">
            <p className="text-gray-600">
              "Simply the best! I recommend{" "}
              <span className="font-semibold bg-yellowColor text-black rounded-lg p-1">
                FESCO
              </span>{" "}
              to anyone looking for a reliable ecommerce service provider."
            </p>
            <p className="mt-4 text-yellow-900 font-bold">- Michael Brown</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-20 max-sm:mt-10 py-16 bg-yellow-600 text-white rounded-lg shadow-lg text-center">
        <h2 className="text-4xl max-md:text-2xl max-sm:text-xl font-extrabold">
          Join Our Dynamic Team
        </h2>
        <p className="mt-6 text-lg  max-sm:px-4 max-sm:text-base">
          If you're driven by innovation and passion for excellence, we want to
          hear from you!
        </p>
        <button className="mt-8 px-8 py-4 max-sm:text-sm max-sm:py-2 max-sm:px-4 bg-black text-yellowColor font-bold rounded-lg shadow-md hover:bg-gray-800 transition duration-300">
          Contact Us
        </button>
      </div>
    </div>
  );
}

export default AboutUs;
