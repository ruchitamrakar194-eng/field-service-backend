const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDb() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  console.log('Recent Users:');
  users.forEach(u => console.log(`- ${u.email} (Role: ${u.role})`));

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  console.log('\nRecent Leads:');
  leads.forEach(l => console.log(`- ${l.email} (Status: ${l.status})`));
}

checkDb().catch(console.error).finally(() => prisma.$disconnect());
