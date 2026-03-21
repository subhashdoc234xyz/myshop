import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Lavender Mist Perfume",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80",
        description: "A soothing floral scent with notes of lavender and vanilla."
      },
      {
        name: "Purple Silk Scarf",
        price: 32.50,
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80",
        description: "Handcrafted silk scarf with a delicate light purple gradient."
      },
      {
        name: "Amethyst Crystal Lamp",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
        description: "Natural amethyst stone lamp that emits a calming glow."
      },
      {
        name: "Minimalist Watch",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80",
        description: "Clean design with a white face and purple leather strap."
      },
      {
        name: "Ceramic Vase Set",
        price: 55.00,
        image: "https://images.unsplash.com/photo-1581783342308-f792ca11df53?auto=format&fit=crop&w=600&q=80",
        description: "Set of 3 matte white ceramic vases for modern decor."
      },
      {
        name: "Soft Knit Sweater",
        price: 65.00,
        image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&w=600&q=80",
        description: "Ultra-soft knit sweater in a pastel lilac shade."
      }
    ],
  })
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })