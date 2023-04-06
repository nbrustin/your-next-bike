import Link from "next/link";

export default function Footer() {
  return (
    <div className="h-20 text-center mt-10 text-2xl">
      <Link
        href="https://99spokes.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>Powered by 99 Spokes API</div>
      </Link>
    </div>
  );
}
