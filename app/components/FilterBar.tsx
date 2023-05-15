"use client";

import { useState } from "react";
import { bicycleCategories } from "../../data/bicycleCategories";
import { bicycleBrands } from "../../data/bicycleBrands";

interface FilterBarProps {
  onChange: (category: string, brand: string) => void;
}

export default function FilterBar({ onChange }: FilterBarProps) {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
    onChange(event.target.value, brand);
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBrand(event.target.value);
    onChange(category, event.target.value);
  };

  return (
    <div>
      <h1 className="text-white text-5xl font-bold mb-2">Filter</h1>
      <select className="mr-2" value={category} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {bicycleCategories.map((category) => (
          <option key={category.value} value={category.label}>
            {category.label}
          </option>
        ))}
      </select>
      <select value={brand} onChange={handleBrandChange}>
        <option value="">All Brands</option>
        {bicycleBrands.map((brand) => (
          <option key={brand.value} value={brand.label}>
            {brand.label}
          </option>
        ))}
      </select>
    </div>
  );
}
