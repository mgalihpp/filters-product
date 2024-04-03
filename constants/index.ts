export const SORT_OPTIONS = [
  {
    name: "None",
    value: "none",
  },
  {
    name: "Price: Low to High",
    value: "price-asc",
  },
  {
    name: "Price: High to Low",
    value: "price-desc",
  },
] as const;

export const SUB_CATEGORIES = [
  {
    name: "T-Shirts",
    selected: true,
    href: "#",
  },
  {
    name: "Hoodies",
    selected: false,
    href: "#",
  },
  {
    name: "Sweatshirts",
    selected: false,
    href: "#",
  },
  {
    name: "Accessories",
    selected: false,
    href: "#",
  },
] as const;

export const COLOR_FILTERS = {
  id: "color",
  name: "Color",
  option: [
    {
      value: "white",
      label: "White",
    },
    {
      value: "beige",
      label: "Beige",
    },
    {
      value: "blue",
      label: "Blue",
    },
    {
      value: "green",
      label: "Green",
    },
    {
      value: "purple",
      label: "Purple",
    },
  ],
} as const;

export const SIZE_FILTERS = {
  id: "size",
  name: "Size",
  option: [
    {
      value: "L",
      label: "L",
    },
    {
      value: "M",
      label: "M",
    },
    {
      value: "S",
      label: "S",
    },
  ],
} as const;

export const PRICE_FILTERS = {
  id: "price",
  name: "Price",
  option: [
    {
      value: [0, 100],
      label: "Any price",
    },
    {
      value: [0, 20],
      label: "Under 20$",
    },
    {
      value: [0, 40],
      label: "Under 40$",
    },
    // custom option defined in jsx
  ],
} as const;

export const DEFAULT_CUSTOM_PRICE = [0, 100] as [number, number];
