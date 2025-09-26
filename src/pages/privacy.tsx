import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="relative container mx-auto px-4 py-10 text-gray-800">
      
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Privacy Policy
      </h1>
      <p className="text-center text-sm text-gray-500 mb-10">
        Centre for Microfinance and Livelihood (CML) <br />
        Effective Date: <strong>13/09/2025</strong>
      </p>

      {/* Intro */}
      <p className="mb-6 leading-relaxed">
        Centre for Microfinance and Livelihood (CML) values and respects the
        privacy of every individual who interacts with us. This Privacy Policy
        outlines how we collect, use, protect, and disclose your personal
        information when you engage with our organization—whether through
        donations, crowdfunding campaigns, our website, events, or other
        interactions.
      </p>
      <p className="mb-6 leading-relaxed">
        By visiting our website or sharing your personal information with us,
        you agree to the practices outlined in this Privacy Policy.
      </p>

      {/* Sections */}
      <div className="space-y-10">
        {/* 1. About Us */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. About Us</h2>
          <p>
            <strong>Centre for Microfinance and Livelihood (CML)</strong>
            <br />
            5th Floor, Divine Plaza, GS Rd, Super Market, Dispur, Sarumotoria,
            <br />
            Guwahati, Assam 781005
            <br />
             Email: contact@cmlnortheast.org
            <br />
             Phone: +91 96781 45549
          </p>
          <p className="mt-3">
            CML is a not-for-profit organization based in Northeast India,
            working to empower communities through sustainable livelihoods,
            microfinance, and community development initiatives.
          </p>
        </section>

        {/* 2. Information We Collect */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            2. Information We Collect
          </h2>
          <p>
            We collect personal information through our website, donation
            portals, events, email, and social media channels. This includes:
          </p>

          <h3 className="text-lg font-semibold mt-4">A. Personal Information</h3>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
            <li>Postal Address</li>
            <li>PAN (for tax exemption under Section 80G)</li>
            <li>
              Payment information (processed securely via third-party gateways)
            </li>
            <li>Country of residence (for FCRA compliance, if applicable)</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4">B. Non-Personal Information</h3>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Website usage and analytics data</li>
          </ul>
        </section>

        {/* 3. How We Use Your Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>To process donations and send receipts</li>
            <li>To issue 80G tax exemption certificates (for Indian donors)</li>
            <li>To comply with FCRA regulations (for foreign donors)</li>
            <li>
              To communicate with you about your donation, project updates, or
              upcoming campaigns
            </li>
            <li>To respond to your queries or requests</li>
            <li>To analyze donation trends and improve our outreach</li>
            <li>To maintain accurate donor records for internal use</li>
          </ul>
        </section>

        {/* 4. Data Sharing and Disclosure */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            4. Data Sharing and Disclosure
          </h2>
          <p>
            CML does not sell or rent your personal information to any third
            party.
          </p>
          <p className="mt-2">We may share limited personal data with:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              Trusted third-party service providers (e.g., payment gateways,
              email services) strictly for processing donations or
              communications.
            </li>
            <li>
              Government authorities or legal entities if required under
              applicable laws (e.g., Income Tax Department or FCRA authorities).
            </li>
            <li>
              Auditors and regulatory agencies for compliance and reporting
              purposes.
            </li>
          </ul>
          <p className="mt-2">
            All third-party service providers are bound by confidentiality
            obligations and data protection standards.
          </p>
        </section>

        {/* 5. Payment and Financial Data Security */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            5. Payment and Financial Data Security
          </h2>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              All online donations are processed through secure, PCI-DSS-compliant
              third-party payment gateways.
            </li>
            <li>
              CML does not store or have direct access to your credit/debit card
              or UPI credentials.
            </li>
            <li>
              Donation records are securely stored for auditing and legal
              compliance.
            </li>
          </ul>
        </section>

        {/* 6. Cookies and Website Analytics */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            6. Cookies and Website Analytics
          </h2>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Monitor site usage</li>
            <li>Improve user experience</li>
            <li>Optimize content and page performance</li>
          </ul>
          <p className="mt-2">
            You can disable cookies through your browser settings, but some
            parts of the website may not function properly as a result.
          </p>
        </section>

        {/* 7. Communication Preferences */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            7. Communication Preferences
          </h2>
          <p>We may send you:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Donation confirmations and tax receipts</li>
            <li>Project updates and newsletters</li>
            <li>Invitations to events or crowdfunding campaigns</li>
          </ul>
          <p className="mt-2">
            You may opt-out of promotional or campaign-related emails by
            clicking the unsubscribe link at the bottom of any such email or
            contacting us directly at{" "}
            <strong>contact@cmlnortheast.org</strong>.
          </p>
        </section>

        {/* 8. Your Rights */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request corrections to your personal information</li>
            <li>
              Withdraw consent or request data deletion (subject to legal and
              compliance limitations)
            </li>
            <li>Opt-out of marketing communications</li>
          </ul>
          <p className="mt-2">
            To exercise your rights, email us at{" "}
            <strong>contact@cmlnortheast.org</strong>.
          </p>
        </section>

        {/* 9. Data Retention */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">9. Data Retention</h2>
          <p>We retain donor information for as long as necessary:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>To comply with legal, regulatory, and tax obligations</li>
            <li>For donor relationship management and reporting</li>
            <li>For historical and audit purposes</li>
          </ul>
          <p className="mt-2">
            We securely delete or anonymize personal data when it is no longer
            required.
          </p>
        </section>

        {/* 10. Children’s Privacy */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">10. Children’s Privacy</h2>
          <p>
            CML does not knowingly collect or solicit information from
            individuals under the age of 18. If you believe we have
            inadvertently collected data from a minor, please contact us for
            immediate deletion.
          </p>
        </section>

        {/* 11. Changes to This Policy */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            11. Changes to This Policy
          </h2>
          <p>
            CML reserves the right to modify or update this Privacy Policy at
            any time. Changes will be posted on our website with the revised
            effective date. We encourage you to review this page periodically.
          </p>
        </section>

        {/* 12. Contact Us */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">12. Contact Us</h2>
          <p>
            If you have any questions, concerns, or complaints related to this
            Privacy Policy or how your data is handled, please contact:
          </p>
          <p className="mt-3">
            <strong>Centre for Microfinance and Livelihood (CML)</strong>
            <br />
             5th Floor, Divine Plaza, GS Rd, Super Market, Dispur, Sarumotoria,
            <br />
            Guwahati, Assam 781005
            <br />
             Email: contact@cmlnortheast.org
            <br />
             Phone: +91 96781 45549
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
