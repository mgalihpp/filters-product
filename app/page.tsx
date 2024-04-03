"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  COLOR_FILTERS,
  DEFAULT_CUSTOM_PRICE,
  PRICE_FILTERS,
  SIZE_FILTERS,
  SORT_OPTIONS,
  SUB_CATEGORIES,
} from "@/constants";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";
import { type Product as TProduct } from "@prisma/client";
import axiosInstance from "@/lib/axios";
import { Product } from "@/components/Products/product";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductState } from "@/lib/validators/product-validator";
import { Slider } from "@/components/ui/slider";
import EmptyState from "@/components/Products/empty-state";

export default function Home() {
  const [filter, setFilter] = useState<ProductState>({
    sort: "none",
    color: ["beige", "blue", "green", "white", "purple"],
    size: ["S", "M", "L"],
    price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
  });

  const { data: products } = useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      const { data } = await axiosInstance.post<TProduct[]>("/api/products", {
        filter: {
          sort: filter.sort,
          color: filter.color,
          size: filter.size,
          price: filter.price.range,
        },
      });

      return data;
    },
  });

  const applyArrayFilter = ({
    category,
    value,
  }: {
    category: keyof Omit<typeof filter, "price" | "sort">;
    value: string;
  }) => {
    const isFiltereApplied = filter[category].includes(value as never);

    if (isFiltereApplied) {
      setFilter((prev) => ({
        ...prev,
        [category]: prev[category].filter((v) => v !== value),
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }));
    }
  };

  const minPrice = Math.min(filter.price.range[0], filter.price.range[1]);
  const maxPrice = Math.max(filter.price.range[0], filter.price.range[1]);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        className="flex items-baseline 
      justify-between border-b 
      border-gray-200 pb-6 pt-24"
      >
        <h1
          className="text-4xl font-bold tracking-tigh 
        text-gray-900"
        >
          High quality cotton selection
        </h1>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="grup inline-flex 
            justify-center text-sm font-medium text-gray-700 
            hover:text-gray-700"
            >
              Sort
              <ChevronDown
                className="-mr-1 ml-1 size-5 
              flex-shrink-0 text-gray-400 
              group-hover:text-gray-500"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.name}
                  className={cn("text-left w-full block px-4 py-2 text-sm", {
                    "text-gray-900 bg-gray-100": option.value === filter.sort,
                    "text-gray-500": option.value !== filter.sort,
                  })}
                  onClick={() => {
                    setFilter((prev) => ({
                      ...prev,
                      sort: option.value,
                    }));
                  }}
                >
                  {option.name}
                </button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 
          sm:ml-6 lg:hidden
          "
          >
            <Filter className="size-5" />
          </button>
        </div>
      </div>

      <section className="pb-24 pt-6">
        <div
          className="grid grid-cols-1 gap-x-8 gap-y-10 
        lg:grid-cols-4"
        >
          {/* Filters */}
          <div className="hidden lg:block">
            <ul
              className="space-y-4 border-b border-gray-200 
            pb-6 text-sm font-medium text-gray-900"
            >
              {SUB_CATEGORIES.map((category) => (
                <li key={category.name}>
                  <button
                    disabled={!category.selected}
                    className="disabled:cursor-not-allowed 
                  disabled:opacity-60"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
            <Accordion type="multiple" className="animate-none">
              {/* Color filter */}
              <AccordionItem value="color">
                <AccordionTrigger
                  className="py-3 text-sm 
                text-gray-400 hover:text-gray-500"
                >
                  <span className="font-medium text-gray-900">
                    {COLOR_FILTERS.name}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-6 animate-none">
                  <ul className="space-y-4">
                    {COLOR_FILTERS.option.map((option, index) => (
                      <li key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`color-${index}`}
                          className="size-4 rounded border-gray-300 text-indigo-600 
                        focus:ring-indigo-500"
                          onChange={() => {
                            applyArrayFilter({
                              category: "color",
                              value: option.value,
                            });
                          }}
                          checked={filter.color.includes(option.value)}
                        />
                        <label
                          htmlFor={`color-${index}`}
                          className="text-sm ml-3 text-gray-600"
                        >
                          {option.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Size filters */}
              <AccordionItem value="size">
                <AccordionTrigger
                  className="py-3 text-sm 
                text-gray-400 hover:text-gray-500"
                >
                  <span className="font-medium text-gray-900">
                    {SIZE_FILTERS.name}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-6 animate-none">
                  <ul className="space-y-4">
                    {SIZE_FILTERS.option.map((option, index) => (
                      <li key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`size-${index}`}
                          className="size-4 rounded border-gray-300 text-indigo-600 
                        focus:ring-indigo-500"
                          onChange={() => {
                            applyArrayFilter({
                              category: "size",
                              value: option.value,
                            });
                          }}
                          checked={filter.size.includes(option.value)}
                        />
                        <label
                          htmlFor={`size-${index}`}
                          className="text-sm ml-3 text-gray-600"
                        >
                          {option.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Price filters */}
              <AccordionItem value="price">
                <AccordionTrigger
                  className="py-3 text-sm 
                text-gray-400 hover:text-gray-500"
                >
                  <span className="font-medium text-gray-900">
                    {PRICE_FILTERS.name}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-6 animate-none">
                  <ul className="space-y-4">
                    {PRICE_FILTERS.option.map((option, index) => (
                      <li key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`price-${index}`}
                          className="size-4 rounded border-gray-300 text-indigo-600 
                        focus:ring-indigo-500"
                          onChange={() => {
                            setFilter((prev) => ({
                              ...prev,
                              price: {
                                isCustom: false,
                                range: [...option.value],
                              },
                            }));
                          }}
                          checked={
                            !filter.price.isCustom &&
                            filter.price.range[0] === option.value[0] &&
                            filter.price.range[1] === option.value[1]
                          }
                        />
                        <label
                          htmlFor={`price-${index}`}
                          className="text-sm ml-3 text-gray-600"
                        >
                          {option.label}
                        </label>
                      </li>
                    ))}
                    <li className="flex justify-center flex-col gap-1">
                      <div>
                        <input
                          type="radio"
                          id={`price-${PRICE_FILTERS.option.length}`}
                          className="size-4 rounded border-gray-300 text-indigo-600 
                        focus:ring-indigo-500"
                          onChange={() => {
                            setFilter((prev) => ({
                              ...prev,
                              price: {
                                isCustom: true,
                                range: [0, 100],
                              },
                            }));
                          }}
                          checked={filter.price.isCustom}
                        />
                        <label
                          htmlFor={`price-${PRICE_FILTERS.option.length}`}
                          className="text-sm ml-3 text-gray-600"
                        >
                          Custom
                        </label>
                      </div>

                      <div className="flex justify-between">
                        <p className="font-medium">Price</p>
                        <div>
                          {filter.price.isCustom
                            ? minPrice.toFixed(0)
                            : filter.price.range[0].toFixed()}{" "}
                          $ -{" "}
                          {filter.price.isCustom
                            ? maxPrice.toFixed(0)
                            : filter.price.range[1].toFixed(0)}{" "}
                          ${" "}
                        </div>
                      </div>
                      <Slider
                        className={cn("", {
                          "opacity-50": !filter.price.isCustom,
                        })}
                        disabled={!filter.price.isCustom}
                        onValueChange={(value) => {
                          setFilter((prev) => ({
                            ...prev,
                            price: {
                              isCustom: true,
                              range: value as never,
                            },
                          }));
                        }}
                        value={
                          filter.price.isCustom
                            ? filter.price.range
                            : DEFAULT_CUSTOM_PRICE
                        }
                        min={DEFAULT_CUSTOM_PRICE[0]}
                        defaultValue={DEFAULT_CUSTOM_PRICE}
                        max={DEFAULT_CUSTOM_PRICE[1]}
                        step={5}
                      />
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Products grid */}
          <ul
            className="lg:col-span-3 grid grid-cols-1 
            sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {products && products.length === 0 ? (
              <EmptyState />
            ) : products ? (
              products.map((product) => (
                <Product product={product} key={product.id} />
              ))
            ) : (
              new Array(12)
                .fill(null)
                .map((_, i) => <Product.Skeleton key={i} />)
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}
