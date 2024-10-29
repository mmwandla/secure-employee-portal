const { sequelize } = require('../config/db');

async function seedPayments() {
  try {
    const [result] = await sequelize.query(`SELECT COUNT(*) AS count FROM Payments`);
    if (result[0].count > 0) {
      console.log('Payments have already been seeded.');
      return;
    }

    const randomAccountNumbers = Array.from({ length: 10 }, () => {
      let accountNumber;
      do {
        accountNumber = String(Math.floor(100000 + Math.random() * 900000));
      } while (['123456', '234567', '345678'].includes(accountNumber));
      return accountNumber;
    });

    const payments = randomAccountNumbers.map(accountNumber => ({
      accountNumber,
      amount: (Math.random() * 10000).toFixed(2),
      currency: 'ZAR',
      provider: 'Standard Bank',
      recipientAccountNumber: String(Math.floor(100000 + Math.random() * 900000)),
      swiftCode: 'SBZAZAJJ',
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    for (const payment of payments) {
      await sequelize.query(
        `INSERT INTO Payments (accountNumber, amount, currency, provider, recipientAccountNumber, swiftCode, status, createdAt, updatedAt) 
         VALUES (:accountNumber, :amount, :currency, :provider, :recipientAccountNumber, :swiftCode, :status, :createdAt, :updatedAt)`,
        { replacements: payment }
      );
    }

    console.log('Payments seeded successfully.');
  } catch (error) {
    console.error('Error seeding payments:', error);
  }
}

module.exports = seedPayments;
