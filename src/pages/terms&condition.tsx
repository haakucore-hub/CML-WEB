import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4 text-center">
        Terms and Conditions for Crowdfunding
      </h1>
      <p className="text-sm text-gray-500 text-center mb-6">
        Effective Date: 13/09/25
      </p>

      {/* Intro */}
      <p className="mb-6">
        These Terms and Conditions ("Terms") govern the use of crowdfunding
        platforms and donation mechanisms operated by or on behalf of{" "}
        <strong>Centre for Microfinance and Livelihood (CML)</strong>. By
        participating in any crowdfunding campaign organized or hosted by CML,
        you agree to comply with and be legally bound by these Terms.
      </p>

      {/* Section 1 */}
      <h2 className="text-xl font-semibold mb-2">1. About Us</h2>
      <p className="mb-6">
        Centre for Microfinance and Livelihood (CML) is a not-for-profit
        organization working to promote sustainable livelihoods, financial
        inclusion, and community empowerment in the Northeast region of India.
        Our crowdfunding campaigns aim to support specific projects aligned with
        our mission.
      </p>

      {/* Section 2 */}
      <h2 className="text-xl font-semibold mb-2">2. Eligibility to Contribute</h2>
      <ul className="list-disc ml-6 mb-6">
        <li>You must be at least 18 years old or have the consent of a legal guardian to contribute.</li>
        <li>You must provide accurate and complete personal information while making a donation.</li>
        <li>
          If contributing from outside India, your donation must comply with the
          Foreign Contribution Regulation Act (FCRA), and you must use
          designated channels.
        </li>
      </ul>

      {/* Section 3 */}
      <h2 className="text-xl font-semibold mb-2">3. Purpose of Funds</h2>
      <p className="mb-2">
        Funds raised through crowdfunding will be used only for the project or
        cause stated in the campaign.
      </p>
      <p className="mb-6">
        In cases where the project is overfunded, delayed, modified, cancelled,
        or surplus funds remain, CML reserves the right to redirect funds to
        similar community development initiatives or other ongoing charitable
        programs within the organization’s scope.
      </p>

      {/* Section 4 */}
      <h2 className="text-xl font-semibold mb-2">4. Donation Process</h2>
      <ul className="list-disc ml-6 mb-6">
        <li>
          Donations can be made through our official crowdfunding page, website,
          or approved third-party platforms.
        </li>
        <li>
          Accepted payment methods include UPI, credit/debit cards, internet
          banking, wallets, and international remittance (if FCRA-approved).
        </li>
        <li>
          A receipt will be issued after a successful donation, sent to your
          registered email address.
        </li>
      </ul>

      {/* Section 5 */}
      <h2 className="text-xl font-semibold mb-2">5. Tax Exemption (If Applicable)</h2>
      <ul className="list-disc ml-6 mb-6">
        <li>
          Donations made by Indian citizens may be eligible for tax deductions
          under Section 80G of the Income Tax Act, 1961, subject to CML’s
          registration status.
        </li>
        <li>
          For issuance of 80G receipts, you must provide valid personal details,
          including PAN and address.
        </li>
        <li>Foreign donors are not eligible for 80G benefits under Indian law.</li>
      </ul>

      {/* Section 6 */}
      <h2 className="text-xl font-semibold mb-2">6. Refund and Cancellation Policy</h2>
      <ul className="list-disc ml-6 mb-6">
        <li>All donations are final and non-refundable.</li>
        <li>
          In case of technical errors (e.g., double charge, incorrect amount),
          please contact us at{" "}
          <a
            href="mailto:contact@cmlnortheast.org"
            className="text-blue-600 underline"
          >
            contact@cmlnortheast.org
          </a>{" "}
          within 7 days of the transaction.
        </li>
        <li>
          Refunds, if approved, will be made to the original payment method
          within a reasonable timeframe.
        </li>
      </ul>

      {/* Section 7 */}
      <h2 className="text-xl font-semibold mb-2">7. Privacy and Data Use</h2>
      <p className="mb-6">
        Your personal and financial information is kept secure and used only for
        donation processing, internal analysis, and compliance with legal
        requirements. CML does not sell or share donor data with third parties
        for commercial purposes. You may be contacted for updates or future
        campaigns unless you choose to opt out.
      </p>

      {/* Section 8 */}
      <h2 className="text-xl font-semibold mb-2">8. Transparency and Reporting</h2>
      <p className="mb-6">
        CML is committed to transparency and will provide periodic updates on
        the use of funds and project progress via email or through the website.
        Annual financial reports and audited statements are available upon
        request or on our official website.
      </p>

      {/* Section 9 */}
      <h2 className="text-xl font-semibold mb-2">9. Platform Fees and Charges</h2>
      <p className="mb-6">
        Crowdfunding platforms or payment gateways may deduct transaction fees.
        The net amount received after such deductions will be used for the
        campaign. CML is not responsible for processing delays or technical
        issues arising from third-party payment providers.
      </p>

      {/* Section 10 */}
      <h2 className="text-xl font-semibold mb-2">10. Limitation of Liability</h2>
      <p className="mb-6">
        CML shall not be liable for any direct or indirect losses, delays, or
        damages arising from your use of the crowdfunding platform or from
        project changes. While we aim to achieve all campaign objectives, we do
        not guarantee specific outcomes or results from funded initiatives.
      </p>

      {/* Section 11 */}
      <h2 className="text-xl font-semibold mb-2">11. Changes to Terms</h2>
      <p className="mb-6">
        CML may revise these Terms at any time. Updated versions will be posted
        on our website with the revised effective date. Continued use of our
        crowdfunding mechanisms after changes constitutes acceptance of the
        revised Terms.
      </p>

      {/* Section 12 */}
      <h2 className="text-xl font-semibold mb-2">12. Governing Law and Jurisdiction</h2>
      <p className="mb-6">
        These Terms shall be governed by the laws of India. Any disputes arising
        out of or related to these Terms shall be subject to the exclusive
        jurisdiction of the courts in Guwahati, Assam, India.
      </p>

      {/* Section 13 */}
      <h2 className="text-xl font-semibold mb-2">13. Contact Us</h2>
      <p className="mb-2">
        For questions, refunds, or assistance, please contact:
      </p>
      <address className="not-italic mb-6">
        <strong>Centre for Microfinance and Livelihood (CML)</strong>
        <br />
        5th Floor, Divine Plaza, GS Rd, Super Market, Dispur, Sarumotoria,
        Guwahati, Assam 781005
        <br />
        {" "}
        <a
          href="mailto:contact@cmlnortheast.org"
          className="text-blue-600 underline"
        >
          contact@cmlnortheast.org
        </a>
        <br />
         +91 96781 45549
      </address>
    </div>
  );
};

export default TermsAndConditions;
