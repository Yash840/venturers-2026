const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.admin.create({
    data: {
      username: 'clubadmin',
      password: hashedPassword,
    },
  });

  console.log('Admin created:', admin.username);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
