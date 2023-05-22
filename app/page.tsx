"use client";

import useSWR from "swr";

import { useEffect, useState } from "react";
import BicycleCard from "./components/BicycleCard";
import FilterBar from "./components/FilterBar";

type BicyclePrices = [
  currency: string,
  amount: number,
  discountedAmount: number,
  discount: number
];
export interface BicycleCardType {
  id: string;
  url: string;
  thumbnailUrl: string;
  maker: string;
  makerId: string;
  year: number;
  model: string;
  category: string;
  prices: BicyclePrices;
}

const fetchBicycles = async (): Promise<BicycleCardType[]> => {
  const bicycles = await fetch(
    `https://api.99spokes.com/v1/bikes?include=*&limit=12`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );
  debugger;
  const res = await bicycles.json();
  return res.items;
};

export default function Home() {
  const [bicycles, setBicycles] = useState<BicycleCardType[]>([]);

  useEffect(() => {
    fetchBicycles().then((data) => setBicycles(data));
  }, []);

  const handleFilterChange = (
    category: string,
    brand: string,
    price: string
  ) => {
    const pageUrl = new URL(
      "https://api.99spokes.com/v1/bikes?include=*&limit=12"
    );
    debugger;
    if (category) pageUrl.searchParams.set("category", category.toLowerCase());
    if (brand) pageUrl.searchParams.set("makerId", brand.toLowerCase());
    if (price) pageUrl.searchParams.set("price", price);

    fetch(pageUrl.href, {
      headers: {
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => setBicycles(data.items));
  };

  return (
    <main>
      <FilterBar onChange={handleFilterChange} />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {bicycles?.map((bicycle: BicycleCardType) => (
          <BicycleCard key={bicycle.id} bicycle={bicycle} />
        ))}
      </div>
    </main>
  );
}
