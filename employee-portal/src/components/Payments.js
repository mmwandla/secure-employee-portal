import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../styles/Payments.css';

const Payments = () => {
  const [token] = useState(localStorage.getItem('token'));
  const isAuthenticated = !!token;

  const [payments, setPayments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      if (isAuthenticated) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
          const res = await axios.get('/api/payments/list', config);
          setPayments(res.data);
        } catch (err) {
          console.error('Error fetching payments:', err);
        }
      }
    };
    fetchPayments();
  }, [isAuthenticated]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const openModal = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  const submitToSwift = async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.put(`/api/payments/update-status/${selectedPayment.id}`, {}, config);
      setSubmissionStatus('Submitted to SWIFT');
      closeModal();
      setIsSubmissionModalOpen(true);

      setTimeout(() => {
        setIsSubmissionModalOpen(false);
        setSubmissionStatus('');
      }, 4000);

      const res = await axios.get('/api/payments/list', config);
      setPayments(res.data);
    } catch (error) {
      console.error('Error submitting payment:', error);
      setSubmissionStatus('Error submitting payment. Please try again.');
      setIsSubmissionModalOpen(true);
      
      setTimeout(() => {
        setIsSubmissionModalOpen(false);
        setSubmissionStatus('');
      }, 4000);
    }
  };

  return (
    <div className="payments-container">
      <h1 className="payments-title">Payments</h1>
      <div className="signout-button-container">
        <button className="form-button" onClick={handleSignOut}>Sign Out</button>
      </div>
      {isAuthenticated ? (
        <>
          <h2 className="payments-subtitle">Verify and Submit Payments to SWIFT</h2>
          <table className="payments-table">
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Provider</th>
                <th>Recipient Account Number</th>
                <th>Status</th>
                <th>SWIFT Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="payments-list-item">
                  <td>{payment.accountNumber}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.currency}</td>
                  <td>{payment.provider}</td>
                  <td>{payment.recipientAccountNumber}</td>
                  <td>{payment.status}</td>
                  <td>{payment.swiftCode}</td>
                  <td>
                    <button className="verify-button" onClick={() => openModal(payment)}>Payment Verified</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h2>Submit Payment to SWIFT</h2>
                <p>Are you sure you want to submit this payment to SWIFT?</p>
                <div className="modal-buttons">
                  <button className="modal-button" onClick={closeModal}>Cancel</button>
                  <button className="modal-button" onClick={submitToSwift}>Submit to SWIFT</button>
                </div>
              </div>
            </div>
          )}
          {isSubmissionModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h2>{submissionStatus}</h2>
              </div>
            </div>
          )}
        </>
      ) : (
        <Navigate to="/unauthorized" />
      )}
    </div>
  );
};

export default Payments;
