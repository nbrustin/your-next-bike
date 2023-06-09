import Link from "next/link";
import { BicycleCardType } from "../page";

interface Props {
  bicycle: BicycleCardType;
}

export default function BicycleCard({ bicycle }: Props) {
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href={bicycle.url} target="_blank" rel="noopener noreferrer">
        <img src={bicycle.thumbnailUrl} alt="bicycle" className="w-full h-36" />
        <div className="p-1">
          <h5 className="font-bold mt-3">{bicycle.maker}</h5>
          <h3 className="text-2xl">{bicycle.model}</h3>
          <h5 className="font-bold">{bicycle.year}</h5>
        </div>
      </Link>
    </div>
  );
}
