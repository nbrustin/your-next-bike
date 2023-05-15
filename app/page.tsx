"use client";

import useSWR from "swr";

import { useEffect, useState } from "react";
import BicycleCard from "./components/BicycleCard";
import FilterBar from "./components/FilterBar";

export interface BicycleCardType {
  id: string;
  url: string;
  thumbnailUrl: string;
  maker: string;
  makerId: string;
  year: number;
  model: string;
  category: string;
}

const fetchBicycles = async (): Promise<BicycleCardType[]> => {
  debugger;
  const bicycles = await fetch(
    `https://api.99spokes.com/v1/bikes?include=*&limit=12`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }
  );
  const res = await bicycles.json();
  return res.items;
};

export default function Home() {
  const [bicycles, setBicycles] = useState<BicycleCardType[]>([]);

  useEffect(() => {
    fetchBicycles().then((data) => setBicycles(data));
  }, []);

  const handleFilterChange = (category: string, brand: string) => {
    const query = new URLSearchParams({ category, brand }).toString();
    fetch(`https://api.99spokes.com/v1/bikes?include=*&limit=12&${query}`, {
      headers: {
        Authorization: "Bearer " + process.env.API_KEY,
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
