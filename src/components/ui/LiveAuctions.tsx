"use client"
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import NFTCard from './NftCard';

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
}

export default function LiveAuctions() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [sellers, setSellers] = useState<Record<number, Seller>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  
  // Référence à la div du carousel
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Déterminer le nombre d'éléments par page selon la taille d'écran
  const getItemsPerPage = () => {
    if (windowWidth < 768) return 1;  // Mobile
    if (windowWidth < 1024) return 2; // Tablette
    return 4;                         // Desktop
  };
  
  const itemsPerPage = getItemsPerPage();
  
  useEffect(() => {
    // Mesurer la largeur de la fenêtre
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        
        const hotNfts = data.nfts.filter((nft: NFT) => nft.isHot);
        setNfts(hotNfts);
        
        const sellersMap: Record<number, Seller> = {};
        data.bestSellers.forEach((seller: Seller) => {
          sellersMap[seller.id] = seller;
        });
        setSellers(sellersMap);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };
    
    fetchData();
  }, []);
  
  const totalPages = Math.max(1, Math.ceil(nfts.length / itemsPerPage));
  
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [windowWidth, totalPages, currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    } else {
      setDirection(1);
      setCurrentPage(0);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    } else {
      setDirection(-1);
      setCurrentPage(totalPages - 1);
    }
  };
  
  // Détecter le début du glissement
  const handleDragStart = () => {
    setDragging(true);
  };
  
  // Gestion du glissement
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dragDistance = Math.abs(info.offset.x);
    const isDragging = dragDistance > 10; // Seuil minimum pour considérer un drag
    
    setDragging(false);
    
    // Si c'est un petit mouvement, considérer comme un clic
    if (!isDragging) {
      return;
    }
    
    // Si c'est un glissement significatif, changer de page
    if (dragDistance > 50) {
      if (info.offset.x > 0) {
        prevPage();
      } else {
        nextPage();
      }
    }
  };
  
  // Extraire les NFTs visibles
  const visibleNfts = nfts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Classes de grille
  const getGridClasses = () => {
    if (windowWidth < 768) return "grid-cols-1";
    if (windowWidth < 1024) return "grid-cols-2";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  };

  return (
    <section className="mt-10" id="explore-anch">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">Live Auctions</h2>
            <span className="text-2xl">🔥</span>
          </div>
          <p className="text-gray-500">Enjoy! The latest hot auctions</p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={prevPage}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
          >
            &lt;
          </button>
          <button 
            onClick={nextPage}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
          >
            &gt;
          </button>
        </div>
      </div>
      
      <div 
        ref={carouselRef}
        className={`overflow-hidden relative touch-pan-x ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ minHeight: '400px' }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={currentPage}
            custom={direction}
            initial={{ 
              x: direction * 1000,
              opacity: 0
            }}
            animate={{ 
              x: 0,
              opacity: 1
            }}
            exit={{ 
              x: direction * -1000,
              opacity: 0
            }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={`grid ${getGridClasses()} gap-6 absolute w-full will-change-transform`}
          >
            {visibleNfts.map((nft) => (
              <div 
                key={nft.id}
                style={{ touchAction: 'pan-y' }}
                className={dragging ? 'select-none' : ''}
              >
                <NFTCard
                  {...nft}
                  sellerName={sellers[nft.sellerId]?.name}
                  sellerAvatar={sellers[nft.sellerId]?.avatar}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentPage ? 1 : -1);
                setCurrentPage(index);
              }}
              className={`w-2 h-2 rounded-full ${
                currentPage === index ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      <style jsx global>{`
        .select-none {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </section>
  );
}