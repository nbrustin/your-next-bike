import Header from "./components/Header";

import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

export interface BicycleCardType {
  id: string;
  url: string;
  thumbnailUrl: string;
  makerId: string;
  year: number;
  model: string;
  category: string;
  // prices: Prices[]; //TODO
}

// const fetchBicycles = async (): Promise<BicycleCardType[]> => {
const fetchBicycles = async () => {
  debugger;
  const bicycles = await fetch(
    `https://api.99spokes.com/v1/bikes?include=*&limit=9`,
    {
      headers: {
        Authorization: "Bearer " + process.env.API_KEY,
      },
    }
  );
  const res = await bicycles.json();
  console.log(res);
  return res;
};

export default async function Home() {
  const bicycles = await fetchBicycles();
  console.log("hello");
  return (
    <main>
      <Header />
      {bicycles.items.map((bicycle: BicycleCardType) => (
        <div key={bicycle.id}>
          <h2>{bicycle.model}</h2>
        </div>
      ))}
    </main>
  );
}
