import React, { useState } from 'react';

const DonationPopup = ({ open, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    amount: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onClose();
    }, 1500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-cml-orange"
          onClick={onClose}
        >
          &times;
        </button>
       <div className="flex items-center p-4">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/cmlnorthest.firebasestorage.app/o/Logo.png?alt=media&token=40b4646f-7110-4351-b3a6-5cfaed79bf42" 
              alt="Centre for Microfinance & Livelihood" 
              className="md:h-[60px] w-auto"
            />
          </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone No"
            required
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Donation Amount"
            required
            min="1"
            className="w-full border rounded px-4 py-2"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-cml-green text-white font-semibold py-2 rounded hover:bg-cml-green/90 transition-colors"
          >
            {submitting ? 'Processing...' : 'Donate'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationPopup;
