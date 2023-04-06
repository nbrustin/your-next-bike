import Header from "./components/Header";
import BicycleCard from "./components/BicycleCard";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Footer from "./components/Footer";

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
  const bicycles = await fetch(
    `https://api.99spokes.com/v1/bikes?include=*&limit=12`,
    {
      headers: {
        Authorization: "Bearer " + process.env.API_KEY,
      },
    }
  );
  const res = await bicycles.json();
  console.log(res);
  return res.items;
};

export default async function Home() {
  const bicycles = await fetchBicycles();
  console.log("hello");
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {bicycles.map((bicycle: BicycleCardType) => (
          <BicycleCard key={bicycle.id} bicycle={bicycle} />
        ))}
      </div>
      <Footer />
    </main>
  );
}
