import fs from 'fs';
import path from 'path';

// ce fichier permets de mettre à jour automatiquement les avatars des sellers et images des nfts, si les objets sont créés dans la data et que les images sont dans les dossiers appropriés (et nommé correctement, voir exemple des noms)
const updateDataJson = () => {
  const filePath = path.join(process.cwd(), 'public', 'data.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  data.nfts = data.nfts.map(nft => ({
    ...nft,
    image: `/images/nfts/nft-${nft.id}.jpg`
  }));
  
  data.bestSellers = data.bestSellers.map(seller => ({
    ...seller,
    avatar: `/images/avatars/avatar-${seller.id}.jpg`
  }));
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return data;
}

updateDataJson();