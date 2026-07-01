import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('[v0] Seeding database...')

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@secrum.local'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456'

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (existingAdmin) {
    console.log('[v0] Admin user already exists, skipping...')
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin User',
        isAdmin: true,
        isActive: true,
      },
    })

    console.log('[v0] Admin user created:', admin.email)
  }

  // Create some sample products
  const products = [
    {
      name: 'Botanical Essence Serum',
      slug: 'botanical-essence-serum',
      description: 'A luxurious serum infused with glacier-grown alpine flora',
      tagline: 'Pure botanical power',
      price: 5999,
      originalPrice: 6999,
      stock: 50,
      category: 'serums',
      featured: true,
      active: true,
    },
    {
      name: 'Marine Silts Moisturizer',
      slug: 'marine-silts-moisturizer',
      description: 'Rejuvenating moisturizer with fjord-drawn marine silts',
      tagline: 'Ocean-inspired hydration',
      price: 4999,
      originalPrice: 5999,
      stock: 40,
      category: 'moisturizers',
      featured: true,
      active: true,
    },
    {
      name: 'Alpine Cleanser',
      slug: 'alpine-cleanser',
      description: 'Gentle cleansing gel with alpine botanicals',
      tagline: 'Clean and pure',
      price: 2999,
      stock: 60,
      category: 'cleansers',
      featured: false,
      active: true,
    },
  ]

  for (const product of products) {
    const existingProduct = await prisma.product.findUnique({
      where: { slug: product.slug },
    })

    if (!existingProduct) {
      const createdProduct = await prisma.product.create({
        data: product,
      })

      console.log('[v0] Product created:', createdProduct.name)

      // Create a sample image for the product
      await prisma.productImage.create({
        data: {
          productId: createdProduct.id,
          imageUrl: `https://via.placeholder.com/500x500?text=${encodeURIComponent(createdProduct.name)}`,
          alt: createdProduct.name,
          order: 0,
        },
      })
    }
  }

  console.log('[v0] Seeding completed successfully')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('[v0] Seeding error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
