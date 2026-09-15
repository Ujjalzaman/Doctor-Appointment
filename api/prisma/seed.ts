import { PrismaClient, UserRole, Gender } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'doctor@gmail.com';
  const password = '123456';

  const hashedPassword = await bcrypt.hash(password, 12);

  const doctor = await prisma.doctor.upsert({
    where: { email },
    update: {
      verified: true,
    },
    create: {
      firstName: 'Demo',
      lastName: 'Doctor',
      email,
      gender: Gender.male,
      verified: true,
      specialization: 'General Physician',
      designation: 'Doctor',
    },
  });

  await prisma.auth.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: UserRole.doctor,
      userId: doctor.id,
    },
    create: {
      email,
      password: hashedPassword,
      role: UserRole.doctor,
      userId: doctor.id,
    },
  });

  console.log(`Demo doctor ready: ${email} / ${password}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });