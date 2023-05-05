"use client";

import { bicycleCategories } from "../../data/bicycleCategories";
import { bicycleBrands } from "@/data/bicycleBrands";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
interface BicycleCategory {
  value: number;
  label: string;
}

interface BicycleBrand {
  value: number;
  label: string;
}

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("");

  useEffect(() => {
    const category = searchParams.get("category");
    console.log(category);
    if (category) {
      setCategory(category as string);
    }
  }, []);

  const handleBikeCategory = (category: string) => {
    debugger;
    router.push(`/filter?category=${category}`);
  };

  const handleBikeBrand = (brand: string) => {
    router.push(`/filter?makerId=${brand}`);
  };

  return (
    <div>
      <h1 className="text-white text-5xl font-bold mb-2">Filter</h1>
      <select
        className="mr-2"
        value={category}
        onChange={(e) => handleBikeCategory(e.target.value.toLowerCase())}
      >
        {bicycleCategories.map((bicycleType: BicycleCategory) => (
          <option
            key={bicycleType.value}
            value={bicycleType.label.toLowerCase()}
          >
            {bicycleType.label}
          </option>
        ))}
      </select>
      <select onChange={(e) => handleBikeBrand(e.target.value.toLowerCase())}>
        {bicycleBrands.map((bicycleBrand: BicycleBrand) => (
          <option key={bicycleBrand.value}>{bicycleBrand.label}</option>
        ))}
      </select>
    </div>
  );
}
