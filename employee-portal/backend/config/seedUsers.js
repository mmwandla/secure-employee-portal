const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');

async function seedUsers() {
  const users = [
    {
      fullName: 'John Doe',
      idNumber: '1234567890123',
      accountNumber: '123456',
      password: 'password'
    },
    {
      fullName: 'Test User',
      idNumber: '2345678901234',
      accountNumber: '234567',
      password: 'password'
    },
    {
      fullName: 'Another Employee',
      idNumber: '3456789012345',
      accountNumber: '345678',
      password: 'password'
    }
  ];

  try {
    for (const user of users) {
      const [existingUser] = await sequelize.query(
        `SELECT id FROM Users WHERE idNumber = :idNumber LIMIT 1`,
        { replacements: { idNumber: user.idNumber } }
      );

      if (!existingUser.length) {
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);

        await sequelize.query(
          `INSERT INTO Users (fullName, idNumber, accountNumber, password, createdAt, updatedAt) 
           VALUES (:fullName, :idNumber, :accountNumber, :password, NOW(), NOW())`, 
          {
            replacements: {
              fullName: user.fullName,
              idNumber: user.idNumber,
              accountNumber: user.accountNumber,
              password: user.password,
              createdAt: new Date(), 
              updatedAt: new Date() 
            }
          }
        );
        console.log(`User ${user.fullName} inserted successfully.`);
      } else {
        console.log(`User with idNumber ${user.idNumber} already exists.`);
      }
    }
  } catch (error) {
    console.error('Error inserting users:', error);
  }
}

module.exports = seedUsers;
