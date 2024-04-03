import prisma from "@/db";
import { ProductFilterValidator } from "@/lib/validators/product-validator";
import { NextRequest, NextResponse } from "next/server";

// class Filter {
//   private filters: Map<string, string[]> = new Map()

//   hasFilter() {
//     return this.filters.size > 0
//   }

//   add(key: string, operator: string, value: string | number) {
//     const filter = this.filters.get(key) || []
//     filter.push(
//       `${key} ${operator} ${typeof value === 'number' ? value : `"${value}"`}`
//     )
//     this.filters.set(key, filter)
//   }

//   addRaw(key: string, rawFilter: string) {
//     this.filters.set(key, [rawFilter])
//   }

//   get() {
//     const parts: string[] = []
//     this.filters.forEach((filter) => {
//       const groupedValues = filter.join(` OR `)
//       parts.push(`(${groupedValues})`)
//     })
//     return parts.join(' AND ')
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    console.log(data);

    const { sort, color, size, price } = ProductFilterValidator.parse(
      data.filter
    );

    const products = await prisma.product.findMany({
      where: {
        color: {
          in: color,
        },
        size: {
          in: size,
        },
        price: {
          gte: price[0],
          lte: price[1],
        },
      },
      orderBy: {
        price: sort === "price-asc" ? "asc" : "desc",
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    // i.e. log error to sentry
    console.error(error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
