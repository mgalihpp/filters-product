import { PrismaClient } from "@prisma/client";

const PRICES = [9.99, 19.99, 29.99, 39.99, 49.99] as const;
const COLORS = ["white", "beige", "blue", "green", "purple"] as const;
const SIZES = ["S", "M", "L"] as const;
const prisma = new PrismaClient();

const getRandomPrice = () => {
  return PRICES[Math.floor(Math.random() * PRICES.length)];
};

async function main() {
  const products = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < COLORS.length; j++) {
      for (let k = 0; k < SIZES.length; k++) {
        const size = SIZES[k];
        const color = COLORS[j];
        products.push({
          id: `${color}-${size}-${i + 1}`,
          imageId: `/${color}_${i + 1}.png`,
          color,
          name: `${
            color.slice(0, 1).toUpperCase() + color.slice(1)
          } shirt ${i}`,
          size,
          price: getRandomPrice(),
        });
      }
    }
  }

  console.log(products.length);

  // Use Promise.all to await all async operations in parallel
  await Promise.all(
    products.map(async (product) => {
      await prisma.product.create({
        data: {
          id: product.id,
          imageId: product.imageId,
          name: product.name,
          color: product.color,
          size: product.size,
          price: product.price,
        },
      });
    })
  );

  console.log("success");
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
