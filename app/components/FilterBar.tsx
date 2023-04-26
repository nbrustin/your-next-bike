"use client";

import { bicycleCategories } from "../../data/bicycleCategories";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BicycleCategory {
  value: number;
  label: string;
}

export default function FilterBar() {
  const router = useRouter();

  const handleBikeCategory = (category: string) => {
    debugger;
    router.push(`/filter?category=${category}`);
  };

  return (
    <div>
      <h1 className="text-white text-5xl font-bold mb-2">Filter</h1>
      <select
        onChange={(e) => handleBikeCategory(e.target.value.toLowerCase())}
      >
        {bicycleCategories.map((bicycleType: BicycleCategory) => (
          <option key={bicycleType.value}>{bicycleType.label}</option>
        ))}
      </select>
    </div>
  );
}
