import { PrismaClient } from './generated/prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Prisma からデータ取得テストするよ！")

  const all = await prisma.transaction.findMany()
  console.log(all)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })