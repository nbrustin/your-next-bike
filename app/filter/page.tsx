import { debug } from "console";

interface FilterParams {
  category?: string;
}
debugger;
const fetchBicyclesByType = async (filterParams: FilterParams) => {
  debugger;
  console.log(filterParams);
  const bicycles = await fetch(
    `https://api.99spokes.com/v1/bikes?category=${filterParams?.category}&limit=12`,
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
debugger;

export default async function Filter({
  filterParams,
}: {
  filterParams: FilterParams;
}) {
  const bicylces = await fetchBicyclesByType(filterParams);
  return <div>Filter Page</div>;
}
