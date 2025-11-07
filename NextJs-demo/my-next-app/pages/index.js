import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Welcome to Next.js </h1>
      <p>This is the Home Page.</p>
      <Link href="/dashboard">Go to Dashboard</Link>
    </main>
  );
}