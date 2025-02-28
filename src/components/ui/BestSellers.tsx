"use client"
import { useState, useEffect } from 'react';
import SellerCard from './SellerCard';

interface Seller {
  id: number;
  name: string;
  avatar: string;
  isVerified: boolean;
}

export default function BestSellers() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data.json');
      const data = await response.json();
      setSellers(data.bestSellers);
    };
    
    fetchData();
  }, []);

  return (
    <section className="bg-white rounded-3xl p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-2xl font-bold">Best Sellers</h2>
        <span className="text-2xl">🏆</span>
      </div>
      <p className="text-gray-500 mb-6">Best sellers of this week&apos;s NFTs</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sellers.map((seller, index) => (
          <SellerCard
            key={seller.id}
            id={seller.id}
            name={seller.name}
            avatar={seller.avatar}
            isVerified={seller.isVerified}
            rank={index + 1}
            eth={10 + Math.random() * 5}
          />
        ))}
      </div>
    </section>
  );
}