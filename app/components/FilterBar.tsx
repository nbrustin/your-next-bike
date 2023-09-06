"use client";

import { useState } from "react";
import { bicycleCategories } from "../../data/bicycleCategories";
import { bicycleBrands } from "../../data/bicycleBrands";
import bicyclePrices from "@/data/bicyclePrices";
import bicycleSubCategories from "@/data/bicycleSubCategories";
import bicycleYears from "@/data/bicycleYear";

interface FilterBarProps {
  handleFilterChange: (
    category: string,
    subCategory: string,
    brand: string,
    price: string,
    year: string
  ) => void;
}

const currentYear = new Date().getFullYear().toString();

export default function FilterBar({ handleFilterChange }: FilterBarProps) {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState(currentYear);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setValue(name, value);
    setFilterChange(name, value);
  };

  const setValue = (name: string, value: string) => {
    switch (name) {
      case "category":
        setCategory(value);
        break;
      case "brand":
        setBrand(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "subCategory":
        setSubCategory(value);
        break;
      case "year":
        setYear(value);
        break;
      default:
        break;
    }
  };

  const setFilterChange = (name: string, value: string) => {
    handleFilterChange(
      name === "category" ? value : category,
      name === "subCategory" ? value : subCategory,
      name === "brand" ? value : brand,
      name === "price" ? value : price,
      name === "year" ? value : year
    );
  };

  return (
    <div className="h-20 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-6 text-center ">
      <select value={category} name="category" onChange={handleChange}>
        <option value="">All Categories</option>
        {bicycleCategories.map((categoryItem) => (
          <option key={categoryItem.value} value={categoryItem.value}>
            {categoryItem.label}
          </option>
        ))}
      </select>
      <select
        value={subCategory}
        className="mx-2"
        name="subCategory"
        onChange={handleChange}
      >
        <option value="">All Sub Categories</option>
        {bicycleSubCategories.map((subCategoryItem) => (
          <option key={subCategoryItem.value} value={subCategoryItem.value}>
            {subCategoryItem.label}
          </option>
        ))}
      </select>
      <select
        className="mr-2"
        name="brand"
        value={brand}
        onChange={handleChange}
      >
        <option value="">All Brands</option>
        {bicycleBrands.map((brandItem) => (
          <option key={brandItem.value} value={brandItem.value}>
            {brandItem.label}
          </option>
        ))}
      </select>
      <select
        className="hidden"
        value={price}
        name="price"
        onChange={handleChange}
      >
        <option value="">All Prices</option>
        {bicyclePrices.map((bicyclePriceItem) => (
          <option
            key={crypto.randomUUID()}
            value={bicyclePriceItem.value.join("-")}
          >
            {bicyclePriceItem.label}
          </option>
        ))}
      </select>
      <select value={year} name="year" onChange={handleChange}>
        <option value="">All Years</option>
        {bicycleYears.map((bicycleYearItem) => (
          <option key={bicycleYearItem} value={bicycleYearItem}>
            {bicycleYearItem}
          </option>
        ))}
      </select>
    </div>
  );
}
