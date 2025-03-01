import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SellerCard from '../ui/SellerCard';

// mock composant Image de next -> remplace par une version simplifiée pour les tests
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
        data-testid="seller-avatar"
      />
    );
  },
}));

// même principe que pour Image, mais avec Link
jest.mock('next/link', () => ({
  __esModule: true,
  default: function Link({ href, className, children }) {
    return (
      <a href={href} className={className} data-testid="seller-link">
        {children}
      </a>
    );
  },
}));

describe('SellerCard Component', () => {
  const defaultProps = {
    id: 123,
    name: 'John Doe',
    avatar: '/images/avatar.jpg',
    isVerified: true,
    rank: 2,
    eth: 15.789
  };

  it('affiche correctement les informations du vendeur', () => {
    render(<SellerCard {...defaultProps} />);
    
    // Vérifier le rang
    expect(screen.getByText('2')).toBeInTheDocument();
    
    // Vérifier le nom
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    //? Vérifier la valeur ETH (2 décimales)
    expect(screen.getByText('15.79 ETH')).toBeInTheDocument();
    
    // Vérifier l'avatar
    const avatar = screen.getByTestId('seller-avatar');
    expect(avatar).toHaveAttribute('src', '/images/avatar.jpg');
    expect(avatar).toHaveAttribute('alt', 'John Doe');
    
    // Vérifier le lien
    const link = screen.getByTestId('seller-link');
    expect(link).toHaveAttribute('href', '/seller/123');
  });

  it('affiche le badge de vérification si le vendeur est vérifié', () => {
    render(<SellerCard {...defaultProps} isVerified={true} />);
    
    // Rechercher le symbole de vérification
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('n\'affiche pas le badge de vérification si le vendeur n\'est pas vérifié', () => {
    render(<SellerCard {...defaultProps} isVerified={false} />);
    
    // Vérifier l'absence du symbole de vérification
    expect(screen.queryByText('✓')).not.toBeInTheDocument();
  });

  it('utilise l\'avatar par défaut si aucun avatar n\'est fourni', () => {
    render(<SellerCard {...defaultProps} avatar="" />);
    
    const avatar = screen.getByTestId('seller-avatar');
    expect(avatar).toHaveAttribute('src', 'public/images/avatars/default.jpg');
  });
});