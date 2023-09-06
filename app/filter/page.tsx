import { debug } from "console";
import { BicycleCardType } from "../page";
import BicycleCard from "../components/BicycleCard";
import FilterBar from "../components/FilterBar";

interface FilterParams {
  category?: string;
  makerId?: string;
}
const fetchBicyclesByType = async (searchParams: FilterParams) => {
  // console.log(searchParams);

  const pageUrl = new URL("https://api.99spokes.com/v1/bikes");

  pageUrl.searchParams.set("limit", "12");
  pageUrl.searchParams.set("include", "*");

  if (searchParams.category) {
    pageUrl.searchParams.set("category", searchParams.category);
  }

  if (searchParams.makerId) {
    pageUrl.searchParams.set("makerId", searchParams.makerId);
  }

  const bicycles = await fetch(
    pageUrl.toString(),
    // `https://api.99spokes.com/v1/bikes?include=*&category=${searchParams?.category}&makerId=${searchParams.makerId}&limit=12`,

    {
      headers: {
        Authorization: "Bearer " + process.env.API_KEY,
      },
    }
  );
  const res = await bicycles.json();
  // console.log(res);
  return res.items;
};

export default async function Filter({
  searchParams,
}: {
  searchParams: FilterParams;
}) {
  const bicycles = await fetchBicyclesByType(searchParams);
  return (
    <>
      {/* <FilterBar /> */}
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {bicycles.map((bicycle: BicycleCardType) => (
          <BicycleCard key={bicycle.id} bicycle={bicycle} />
        ))}
      </div>
    </>
  );
}
