"use client"
import Navbar from '@/components/layout/Navbar';
import BestSellers from '@/components/ui/BestSellers';
import LiveAuctions from '@/components/ui/LiveAuctions';

export default function Home() {
  return (
    <main className="min-h-screen bg-pink-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <BestSellers />
        <LiveAuctions />
      </div>
    </main>
  );
}