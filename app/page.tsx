"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BicycleCard from "./components/BicycleCard";
import FilterBar from "./components/FilterBar";
import LoadingWheel from "./components/LoadingWheel";
import ReactPaginate from "react-paginate";

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

const RESULTS_PER_PAGE = 12;
// const handlePageClick = ({event<HTMLButtonElement>}) => {
//   const newOffset = event.selected * itemsPerPage)
// }

export default function Home() {
  const [bicycles, setBicycles] = useState<BicycleCardType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);

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
        ) : bicycles.length === 0 ? (
          <p>No Bicycles Match Your Search</p>
        ) : (
          bicycles.map((bicycle: BicycleCardType) => (
            <BicycleCard key={bicycle.id} bicycle={bicycle} />
          ))
        )}
      </div>
      <div id="container"></div>
      <ReactPaginate
        // className="flex justify-center items-center"
        breakLabel="..."
        nextLabel="next >"
        // onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={24}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="flex justify-center items-center mt-4 lg:mt-8"
        pageClassName="mx-1"
        pageLinkClassName="block w-8 h-8 leading-tight text-center border border-gray-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
        previousClassName="mx-1"
        previousLinkClassName="block w-8 h-8 leading-tight text-center border border-gray-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
        nextClassName="mx-1"
        nextLinkClassName="block w-8 h-8 leading-tight text-center border border-gray-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
        breakClassName="mx-1"
        breakLinkClassName="block w-8 h-8 leading-tight text-center border border-gray-300 hover:border-blue-500"
        activeClassName="border-blue-500 bg-blue-500 text-white"
      />
    </main>
  );
}
