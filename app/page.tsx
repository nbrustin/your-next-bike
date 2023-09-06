"use client";

import useSWR from "swr";

import { useEffect, useState } from "react";
import BicycleCard from "./components/BicycleCard";
import FilterBar from "./components/FilterBar";
import LoadingWheel from "./components/LoadingWheel";

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
  const res = await bicycles.json();
  return res.items;
};

export default function Home() {
  const [bicycles, setBicycles] = useState<BicycleCardType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBicycles().then((data) => setBicycles(data));
    setIsLoading(false);
  }, []);

  const handleFilterChange = (
    category: string,
    subCategory: string,
    brand: string,
    price: string,
    year: string
  ) => {
    setIsLoading(true);
    const pageUrl = new URL(
      "https://api.99spokes.com/v1/bikes?include=*&limit=12"
    );
    if (category) pageUrl.searchParams.set("category", category.toLowerCase());
    if (subCategory)
      pageUrl.searchParams.set("subcategory", subCategory.toLowerCase());
    if (brand) pageUrl.searchParams.set("makerId", brand.toLowerCase());
    if (price) pageUrl.searchParams.set("price", price);
    if (year) pageUrl.searchParams.set("year", year);

    fetch(pageUrl.href, {
      headers: {
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBicycles(data.items);
        setIsLoading(false);
      });
  };

  return (
    <main>
      <FilterBar handleFilterChange={handleFilterChange} />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {isLoading ? (
          <LoadingWheel />
        ) : // <p>Loading...</p>
        bicycles.length === 0 ? (
          <p>No Bicycles Match Your Search</p>
        ) : (
          bicycles.map((bicycle: BicycleCardType) => (
            <BicycleCard key={bicycle.id} bicycle={bicycle} />
          ))
        )}
      </div>
    </main>
  );
}
