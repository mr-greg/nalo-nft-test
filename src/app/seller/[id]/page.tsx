import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import NFTCard from '@/components/ui/NftCard';

// Définition des interfaces pour typer correctement les données
interface Seller {
  id: number;
  name: string;
  avatar: string;
  isVerified: boolean;
}

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

interface SellerData {
  seller: Seller;
  nfts: NFT[];
}

async function getSellerData(id: string): Promise<SellerData | null> {
  //! url absolue ? à voir fetch app router
  const res = await fetch('http://localhost:3000/data.json', { cache: 'no-store' });
  if (!res.ok) return null;
  
  const data = await res.json();
  
  const seller = data.bestSellers.find((s: Seller) => s.id === parseInt(id));
  if (!seller) return null;
  
  const sellerNfts = data.nfts.filter((n: NFT) => n.sellerId === parseInt(id));
  return { seller, nfts: sellerNfts };
}

export default async function SellerDetailPage({ params }: { params: { id: string } }) {
  //? destructuration d'abord ?
  //? await aprams useless, mais next error sans ?
  const { id } = params;
  const data = await getSellerData(id);
  
  if (!data) {
    return <div>Vendeur non trouvé</div>;
  }
  
  const { seller, nfts } = data;
  
  return (
    <main className="min-h-screen bg-pink-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Image
              src={seller.avatar || '/images/avatars/default.jpg'}
              alt={seller.name}
              width={120}
              height={120}
              className="rounded-full transition-transform duration-500 hover:scale-110"
            />
            
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{seller.name}</h1>
                {seller.isVerified && (
                  <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              
              <p className="text-gray-500 mt-2">NFT Artist & Creator</p>
              
              <div className="flex gap-4 mt-4">
                <button className="bg-black text-white py-2 px-6 rounded-xl font-medium">Follow</button>
                <button className="border border-gray-200 py-2 px-6 rounded-xl">Message</button>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">NFTs by {seller.name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nfts.map((nft: NFT) => (
            <NFTCard
              key={nft.id}
              {...nft}
              sellerName={seller.name}
              sellerAvatar={seller.avatar}
            />
          ))}
        </div>
      </div>
    </main>
  );
}