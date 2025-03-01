import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NFTCard from '../ui/NftCard';

// Mock des composants Next.js
jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image({ src, alt, width, height, className }) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        data-testid={`image-${alt.toLowerCase().replace(/\s+/g, '-')}`}
      />
    );
  },
}));

// mock composant Image de next -> remplace par une version simplifiée pour les tests
jest.mock('next/link', () => ({
  __esModule: true,
  default: function Link({ href, className, children }) {
    return (
      <a href={href} className={className} data-testid={`link-${href}`}>
        {children}
      </a>
    );
  },
}));

describe('NFTCard Component', () => {
  const defaultProps = {
    id: 'nft-123',
    name: 'Cosmic Perspective #42',
    image: '/images/nfts/cosmic.jpg',
    totalMinted: 100,
    price: '0.45',
    like: 24,
    forSale: 5,
    timeLeft: '2h 45m',
    isHot: true,
    sellerId: 789,
    sellerName: 'ArtistOne',
    sellerAvatar: '/images/avatars/artist1.jpg'
  };

  it('affiche correctement les informations de base du NFT', () => {
    render(<NFTCard {...defaultProps} />);
    
    // Vérifier le nom du NFT
    expect(screen.getByText('Cosmic Perspective #42')).toBeInTheDocument();
    
    // Vérifier le prix
    expect(screen.getByText('0.45 ETH')).toBeInTheDocument();
    
    // Vérifier les éditions mintées
    expect(screen.getByText('100 Editions Minted')).toBeInTheDocument();
    
    // Vérifier le temps restant
    expect(screen.getByText('2h 45m')).toBeInTheDocument();
    
    // Vérifier le nombre en vente
    expect(screen.getByText('5 for sale')).toBeInTheDocument();
    
    // Vérifier le nom du vendeur
    expect(screen.getByText('ArtistOne')).toBeInTheDocument();
  });

  it('affiche l\'indicateur "Hot" lorsque isHot est true', () => {
    render(<NFTCard {...defaultProps} isHot={true} />);
    expect(screen.getByText('🔥')).toBeInTheDocument();
  });

  it('n\'affiche pas l\'indicateur "Hot" lorsque isHot est false', () => {
    render(<NFTCard {...defaultProps} isHot={false} />);
    expect(screen.queryByText('🔥')).not.toBeInTheDocument();
  });

  it('utilise l\'image par défaut si aucune image n\'est fournie', () => {
    render(<NFTCard {...defaultProps} image="" />);
    
    const nftImage = screen.getByTestId('image-cosmic-perspective-#42');
    expect(nftImage).toHaveAttribute('src', '/images/nfts/default.jpg');
  });

  it('utilise l\'avatar par défaut si aucun avatar de vendeur n\'est fourni', () => {
    render(<NFTCard {...defaultProps} sellerAvatar="" />);
    
    const sellerAvatar = screen.getByTestId('image-artistone');
    expect(sellerAvatar).toHaveAttribute('src', '/images/avatars/default.jpg');
  });

  it('utilise "Seller" comme nom par défaut si aucun nom de vendeur n\'est fourni', () => {
    render(<NFTCard {...defaultProps} sellerName={undefined} />);
    
    expect(screen.getByText('Seller')).toBeInTheDocument();
  });

  it('crée les liens corrects vers le NFT et le vendeur', () => {
    render(<NFTCard {...defaultProps} />);
    
    // Vérifier le lien vers la page du NFT
    const nftLinks = screen.getAllByTestId('link-/nft/nft-123');
    expect(nftLinks.length).toBeGreaterThan(0);
    
    // Vérifier le lien vers la page du vendeur
    const sellerLink = screen.getByTestId('link-/seller/789');
    expect(sellerLink).toBeInTheDocument();
  });
});