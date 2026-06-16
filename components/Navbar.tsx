import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-bold">🏡 AI Homestay</h1>

      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}