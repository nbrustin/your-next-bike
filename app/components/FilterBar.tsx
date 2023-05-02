"use client";

import { bicycleCategories } from "../../data/bicycleCategories";
import { bicycleBrands } from "@/data/bicycleBrands";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        onChange={(e) => handleBikeCategory(e.target.value.toLowerCase())}
      >
        {bicycleCategories.map((bicycleType: BicycleCategory) => (
          <option key={bicycleType.value}>{bicycleType.label}</option>
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
