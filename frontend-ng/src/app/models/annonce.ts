// Interface : décrit la forme d'une annonce (comme le schéma Mongoose)
export interface Annonce {
  _id?: string;               // généré par MongoDB (absent avant l'enregistrement)
  titre: string;
  description: string;
  prix: number;
  categorie: string;
  etat: 'Neuf' | 'Occasion';
  vendeur: string;
  telephone: string;
  image?: string;             // facultatif
  createdAt?: string;
  updatedAt?: string;
}

// Liste des catégories utilisée dans les filtres et le formulaire
export const CATEGORIES = ['Livres', 'Informatique', 'Vêtements', 'Accessoires'];