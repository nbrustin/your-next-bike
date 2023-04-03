import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        My Next Bike{" "}
      </Link>
      <div>{/* TODO: add sign in/out */}</div>
    </nav>
  );
}
