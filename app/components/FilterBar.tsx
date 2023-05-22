"use client";

import { useState } from "react";
import { bicycleCategories } from "../../data/bicycleCategories";
import { bicycleBrands } from "../../data/bicycleBrands";
import bicyclePrices from "@/data/bicyclePrices";

interface FilterBarProps {
  onChange: (category: string, brand: string, price: string) => void;
}

export default function FilterBar({ onChange }: FilterBarProps) {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
    onChange(category, brand, price);
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBrand(event.target.value);
    onChange(category, brand, price);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    debugger;
    setPrice(event.target.value);
    onChange(category, brand, price);
  };

  return (
    <div className="h-20 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-6 text-center ">
      <select value={category} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {bicycleCategories.map((category) => (
          <option key={category.value} value={category.label}>
            {category.label}
          </option>
        ))}
      </select>
      <select className="mx-2" value={brand} onChange={handleBrandChange}>
        <option value="">All Brands</option>
        {bicycleBrands.map((brand) => (
          <option key={brand.value} value={brand.label}>
            {brand.label}
          </option>
        ))}
      </select>
      <select value={price} onChange={handlePriceChange}>
        <option value="">All Prices</option>
        {bicyclePrices.map((bicyclePrice) => (
          <option
            key={crypto.randomUUID()}
            value={bicyclePrice.value.join("-")}
          >
            {bicyclePrice.label}
          </option>
        ))}
      </select>
    </div>
  );
}
