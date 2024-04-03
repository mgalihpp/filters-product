import { type Product as TProduct } from "@prisma/client";
import Image from "next/image";
import React from "react";
import NextImage from "../NextImage";

export const Product = ({ product }: { product: TProduct }) => {
  return (
    <div className="group relative">
      <div
        className="aspect-h-1 aspect-w-1 w-full overflow-hidden 
      rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 
      lg:h-80 aspect-square
      "
      >
        <div className="relative w-full h-full lg:h-80">
          <NextImage src={product.imageId} alt="product image" />
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">
            Size {product.size.toUpperCase()}, {product.color}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
    </div>
  );
};

Product.Skeleton = function ProductSkeleton() {
  return (
    <div className="relative animate-pulse">
      <div
        className="aspect-square w-full 
      overflow-hidden rounded-md bg-gray-200 lg:aspect-none 
      lg:h-80"
      >
        <div className="h-full w-full bg-gray-200" />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="bg-gray-200 h-4 w-full" />
        <div className="bg-gray-200 h-4 w-full" />
      </div>
    </div>
  );
};
