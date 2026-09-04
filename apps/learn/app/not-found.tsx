import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="text-6xl font-black text-primary">404</p>
      <h1 className="text-2xl font-bold">Halaman tidak ditemukan</h1>
      <Link href="/" className="text-sm font-medium text-primary hover:underline">
        ← Kembali ke beranda
      </Link>
    </div>
  );
}
