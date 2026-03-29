const prisma = require('../middleware/prismaClient');
const sendConfirmationEmail = require('../middleware/sendEmail');
const { validationResult } = require('express-validator');

const registerUser = async (req, res) => {
  // Check validation errors first
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, rollNumber } = req.body;

  try {
    const registration = await prisma.registration.create({
      data: { name, email, phone, rollNumber }
    });

    sendConfirmationEmail(email, name).catch(err =>
      console.error('Email failed:', err.message)
    );

    res.status(201).json({ message: 'Registered successfully!', data: registration });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'This email is already registered' });
    }
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { registerUser };