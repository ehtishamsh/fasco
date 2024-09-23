function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mb-4  mx-auto px-4 py-16 max-sm:py-4">
      {/* Page Title */}
      <h1 className="text-5xl max-md:text-3xl  max-sm:text-xl font-bold text-center text-yellow-600">
        Privacy Policy
      </h1>
      <p className="mt-6 text-lg max-sm:text-sm text-gray-600 text-center">
        Your privacy is of utmost importance to us. This Privacy Policy outlines
        the types of information we collect from users, how we use that
        information, and the measures we take to protect it.
      </p>

      {/* Information We Collect */}
      <div className="mt-12 max-sm:mt-6">
        <h2 className="text-3xl max-md:text-2xl  max-sm:text-lg font-semibold text-gray-800">
          Information We Collect
        </h2>
        <p className="mt-4 text-gray-600 max-sm:text-sm">
          We collect a variety of information to enhance your experience and
          provide better services. This includes:
        </p>
        <ul className="mt-4 text-gray-600 list-disc max-sm:text-sm ml-6">
          <li>
            <strong>Personal Identification Information:</strong> Such as your
            name, email address, phone number, and shipping/billing address,
            which you provide during activities such as registration, placing an
            order, or subscribing to our newsletter.
          </li>
          <li>
            <strong>Non-Personal Identification Information:</strong> Includes
            your browser type, the type of device you use, and technical details
            about how you connect to our site, such as the operating system and
            internet service provider.
          </li>
          <li>
            <strong>Cookies:</strong> Cookies are used to enhance your
            experience on our site by saving preferences, tracking user
            activity, and providing personalized content.
          </li>
          <li>
            <strong>Payment Information:</strong> When making a purchase, we
            collect payment details such as credit card numbers, which are
            processed securely via third-party payment processors.
          </li>
        </ul>
      </div>

      {/* How We Use Your Information */}
      <div className="mt-12 max-sm:mt-6">
        <h2 className="text-3xl max-md:text-2xl  max-sm:text-lg font-semibold text-gray-800">
          How We Use Your Information
        </h2>
        <p className="mt-4 text-gray-600 max-sm:text-sm">
          We use the information we collect for various purposes, including:
        </p>
        <ul className="mt-4 text-gray-600 list-disc max-sm:text-sm ml-6">
          <li>To process transactions and fulfill your orders efficiently.</li>
          <li>
            To improve our website and user experience by analyzing site usage
            and trends.
          </li>
          <li>
            To personalize your experience by showing relevant products and
            content based on your preferences.
          </li>
          <li>
            To send you promotional materials, newsletters, and updates, only if
            you have opted in to receive such communications.
          </li>
          <li>To respond to your inquiries, requests, or concerns promptly.</li>
          <li>
            To prevent fraud, monitor for security risks, and ensure the safety
            of our site and its users.
          </li>
        </ul>
      </div>

      {/* How We Protect Your Information */}
      <div className="mt-12 max-sm:mt-6">
        <h2 className="text-3xl max-md:text-2xl  max-sm:text-lg font-semibold text-gray-800">
          How We Protect Your Information
        </h2>
        <p className="mt-4 text-gray-600 max-sm:text-sm">
          We take data security seriously and implement industry-standard
          security measures to ensure that your information is safe from
          unauthorized access, alteration, or disclosure. These measures
          include:
        </p>
        <ul className="mt-4 text-gray-600 list-disc max-sm:text-sm ml-6">
          <li>
            Encryption of sensitive data such as payment information during
            transmission using SSL technology.
          </li>
          <li>
            Firewalls and other security technologies to protect our network and
            systems from external threats.
          </li>
          <li>
            Regular security assessments and updates to maintain the integrity
            of our systems.
          </li>
          <li>
            Limiting access to personal data to authorized personnel only, under
            strict confidentiality agreements.
          </li>
        </ul>
      </div>

      {/* Sharing Your Information */}
      <div className="mt-12 max-sm:mt-6">
        <h2 className="text-3xl max-md:text-2xl  max-sm:text-lg font-semibold text-gray-800">
          Sharing Your Information
        </h2>
        <p className="mt-4 text-gray-600 max-sm:text-sm">
          We do not sell, trade, or rent your personal identification
          information to others. However, we may share your information with
          trusted partners in the following circumstances:
        </p>
        <ul className="mt-4 text-gray-600 list-disc max-sm:text-sm ml-6">
          <li>
            <strong>Service Providers:</strong> We may share information with
            third-party service providers that help us operate our business and
            the website, such as payment processors, delivery services, and
            marketing platforms.
          </li>
          <li>
            <strong>Legal Compliance:</strong> We may disclose your information
            when required by law or to comply with legal obligations, court
            orders, or governmental requests.
          </li>
          <li>
            <strong>Business Transfers:</strong> If we are involved in a merger,
            acquisition, or sale of all or a portion of our assets, your
            information may be transferred as part of that transaction.
          </li>
        </ul>
      </div>

      {/* How We Use Cookies */}
      <div className="mt-12 max-sm:mt-6">
        <h2 className="text-3xl max-md:text-2xl  max-sm:text-lg font-semibold text-gray-800">
          How We Use Cookies
        </h2>
        <p className="mt-4 text-gray-600 max-sm:text-sm">
          Cookies are small files stored on your browser that help us provide a
          personalized browsing experience. We use cookies to:
        </p>
        <ul className="mt-4 text-gray-600 list-disc max-sm:text-sm ml-6">
          <li>Remember your preferences and settings for future visits.</li>
          <li>
            Track site activity and analytics to improve our website's
            performance and usability.
          </li>
          <li>
            Display relevant ads based on your browsing habits and preferences.
          </li>
        </ul>
        <p className="mt-4 text-gray-600 max-sm:text-sm">
          You can choose to disable cookies through your browser settings;
          however, this may limit your ability to use certain features of our
          site.
        </p>
      </div>

      {/* Your Rights and Choices */}
      <div className="mt-12 max-sm:mt-6">
        <h2 className="text-3xl max-md:text-2xl  max-sm:text-lg font-semibold text-gray-800">
          Your Rights and Choices
        </h2>
        <p className="mt-4 text-gray-600 max-sm:text-sm">
          You have the right to access, correct, or delete any personal
          information we have collected from you. Additionally, you can opt out
          of receiving promotional communications at any time by following the
          unsubscribe instructions included in our emails.
        </p>
        <ul className="mt-4 text-gray-600 list-disc max-sm:text-sm ml-6">
          <li>Access your personal data and request copies.</li>
          <li>Request correction of inaccurate or incomplete data.</li>
          <li>Request deletion of personal information, where applicable.</li>
        </ul>
      </div>

      {/* Updates to This Policy */}
      <div className="mt-12 max-sm:mt-6">
        <h2 className="text-3xl max-md:text-2xl  max-sm:text-lg font-semibold text-gray-800">
          Changes to This Privacy Policy
        </h2>
        <p className="mt-4 text-gray-600 max-sm:text-sm">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page, and we encourage you to review this policy
          periodically to stay informed about how we are protecting your
          information.
        </p>
      </div>

      {/* Contact Us */}
      <div className="mt-12 max-sm:mt-6">
        <h2 className="text-3xl max-md:text-2xl  max-sm:text-lg font-semibold text-gray-800">
          Contact Us
        </h2>
        <p className="mt-4 text-gray-600 max-sm:text-sm">
          If you have any questions about this Privacy Policy, the practices of
          our site, or your dealings with us, please contact us at:
        </p>
        <p className="mt-2 text-gray-600">Email: privacy@fesco.com</p>
        <p className="mt-2 text-gray-600">Phone: 1-800-555-5555</p>
        <p className="mt-2 text-gray-600">
          Address: 123 Privacy St., Suite 100, City, USA
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
