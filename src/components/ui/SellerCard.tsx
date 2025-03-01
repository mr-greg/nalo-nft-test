import Image from 'next/image';
import Link from 'next/link';

interface SellerProps {
  id: number;
  name: string;
  avatar: string;
  isVerified: boolean;
  rank: number;
  eth: number;
}

export default function SellerCard({ id, name, avatar, isVerified, rank, eth }: SellerProps) {
  return (
    <Link href={`/seller/${id}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors transition-transform duration-500 hover:scale-110">
      <div className="text-gray-400 text-sm w-5">{rank}</div>
      <div className="relative">
        <Image
          src={avatar || 'public/images/avatars/default.jpg'}
          alt={name}
          width={40}
          height={40}
          className="rounded-full transition-transform duration-500 hover:scale-90"
        />
        {isVerified && (
          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-sm">{name}</h3>
        <p className="text-sm text-gray-500">{eth.toFixed(2)} ETH</p>
      </div>
    </Link>
  );
}