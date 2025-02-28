"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white py-4 px-6 flex justify-between items-center shadow-sm relative z-10">
      <Link href="/" className="font-bold text-xl">NALO NFT</Link>
      
      <div className="hidden md:flex items-center gap-6">
        <Link href="/" className="text-gray-600 hover:text-black">Home</Link>
        <Link href="#explore-anch" className="text-gray-600 hover:text-black">Explore</Link>
        <Link href="#" className="text-gray-600 hover:text-black">Sellers</Link>
        <Link href="#" className="text-gray-600 hover:text-black">Collections</Link>
      </div>
      
      <div className="hidden md:flex items-center gap-4">
        <button className="bg-gray-100 rounded-full p-2 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <button className="bg-black text-white py-2 px-4 rounded-full cursor-pointer">Connect Wallet</button>
      </div>
      
      {/* Menu burger */}
      {isMobile && (
        <button 
          className="md:hidden z-20"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <></>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
      )}
      
      {/* Menu mobile */}
      {isMobile && (
        <div className={`
          fixed inset-0 bg-white z-10 transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="font-bold text-xl">NALO NFT</h2>
            <button onClick={toggleMenu} className="p-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-black text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="#explore-anch" 
                className="text-gray-600 hover:text-black text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              <Link 
                href="#" 
                className="text-gray-600 hover:text-black text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sellers
              </Link>
              <Link 
                href="#" 
                className="text-gray-600 hover:text-black text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
            </div>
            
            <div className="mt-10 flex flex-col gap-4">
              <button className="bg-gray-100 rounded-full p-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
              <button className="bg-black text-white py-3 px-4 rounded-full w-full">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}