"use client";

import { bicycleTypes } from "../../data/bicycleTypes";

interface BicycleTypes {
  value: number;
  label: string;
}

const handleBikeType = (type: string) => {
  console.log(type);
  //need to adjust filter to use whatever type we're passing in...
};

export default function Filter() {
  return (
    <div>
      <h1 className="text-white text-5xl font-bold mb-2">Filter</h1>
      <select onChange={(e) => handleBikeType(e.target.value)}>
        {bicycleTypes.map((bicycleType: BicycleTypes) => (
          <option key={bicycleType.value}>{bicycleType.label}</option>
        ))}
      </select>
    </div>
  );
}
