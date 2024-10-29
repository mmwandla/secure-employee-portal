const Payment = require('../models/Payment');

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();

    res.json(payments);
  } catch (error) {
    console.error('Get Payments Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    payment.status = 'Submitted';
    await payment.save();

    res.json({ message: 'Payment status updated successfully' });
  } catch (error) {
    console.error('Update Payment Status Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getPayments, updatePaymentStatus };
