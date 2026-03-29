const prisma = require('../middleware/prismaClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Parser } = require('json2csv');

const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: 'Wrong password' });

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const exportCSV = async (req, res) => {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const fields = ['id', 'name', 'email', 'phone', 'rollNumber', 'createdAt'];
    const parser = new Parser({ fields });
    const csv = parser.parse(registrations);

    res.header('Content-Type', 'text/csv');
    res.attachment('registrations.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { adminLogin, getAllRegistrations, exportCSV };