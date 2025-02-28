import Image from 'next/image';
import Link from 'next/link';
import LikeButton from './LikeButton';

interface NFTCardProps {
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
  sellerName?: string;
  sellerAvatar?: string;
}

export default function NFTCard({
  id,
  name,
  image,
  totalMinted,
  price,
  like,
  forSale,
  timeLeft,
  isHot,
  sellerId,
  sellerName,
  sellerAvatar
}: NFTCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* img nft */}
      <Link href={`/nft/${id}`} className="block relative overflow-hidden">
        <Image
          src={image || '/images/nfts/default.jpg'}
          alt={name}
          width={300}
          height={300}
          className="w-full h-60 object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center text-sm">
          <span className="mr-1">{timeLeft}</span>
          {isHot && <span className="text-red-500">🔥</span>}
        </div>
        <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
          {forSale} for sale
        </div>
      </Link>
      
      <div className="p-4">
        {/* name nft */}
        <Link href={`/nft/${id}`} className="block">
          <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors">{name}</h3>
        </Link>
        
        <div className="flex items-center justify-between mt-2">
          {/* seller */}
          <Link href={`/seller/${sellerId}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Image
              src={sellerAvatar || '/images/avatars/default.jpg'}
              alt={sellerName || 'Seller'}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-sm text-gray-600">{sellerName || 'Seller'}</span>
          </Link>
          <div className="text-sm text-gray-500">{totalMinted} Editions Minted</div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="font-bold text-lg">{price} ETH</div>
          <LikeButton initialCount={like} />
        </div>
      </div>
    </div>
  );
}