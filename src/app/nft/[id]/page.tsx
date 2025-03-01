import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import LikeButton from '@/components/ui/LikeButton';

// Définition des interfaces pour typer correctement les données
interface NFT {
  id: string;
  name: string;
  image: string;
  totalMinted: number;
  price: string;
  like: number;
  forSale: number;
  timeLeft: string;
  isHot: boolean;
  sellerId: number;
}

interface Seller {
  id: number;
  name: string;
  avatar: string;
  isVerified: boolean;
}

interface NFTData {
  nft: NFT;
  seller: Seller;
}

// Type accepté par Next.js selon la nouvelle documentation
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getNftData(id: string): Promise<NFTData | null> {
  const res = await fetch('http://localhost:3000/data.json', { cache: 'no-store' });
  if (!res.ok) return null;
  
  const data = await res.json();
  
  const nft = data.nfts.find((n: NFT) => n.id === id);
  if (!nft) return null;
  
  const seller = data.bestSellers.find((s: Seller) => s.id === nft.sellerId);
  return { nft, seller };
}

export default async function NftDetailPage({ params }: Props) {
  // Résoudre la Promise pour obtenir l'ID
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const data = await getNftData(id);
  
  if (!data) {
    return <div>NFT non trouvé</div>;
  }
  
  const { nft, seller } = data;
  
  return (
    <main className="min-h-screen bg-pink-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Image
                src={nft.image || '/images/nfts/default.jpg'}
                alt={nft.name}
                width={600}
                height={600}
                className="w-full h-auto rounded-2xl transition-transform duration-500 hover:scale-102"
              />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-4">{nft.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <Link href={`/seller/${seller.id}`} className="flex items-center gap-2">
                  <Image
                    src={seller.avatar || '/images/avatars/default.jpg'}
                    alt={seller.name}
                    width={40}
                    height={40}
                    className="rounded-full transition-transform duration-500 hover:scale-90"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Creator</p>
                    <p className="font-medium">{seller.name}</p>
                  </div>
                </Link>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <p className="text-gray-500">Current price</p>
                  <p className="text-gray-500">Time left</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-2xl font-bold">{nft.price} ETH</p>
                  <p className="text-xl">{nft.timeLeft}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-sm">Editions</p>
                  <p className="font-bold">{nft.totalMinted}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-sm">Available</p>
                  <p className="font-bold">{nft.forSale}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-sm">Likes</p>
                  <p className="font-bold">{nft.like}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button className="flex-1 bg-black text-white py-3 rounded-xl font-medium cursor-pointer">Place Bid</button>
                <LikeButton initialCount={nft.like} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}