export type ClothingItem = {
  id: number;
  type: string;
  src: string;
  category: string;
};

export type ClothingItemType = ClothingItem & {
  position: {
    x: number;
    y: number;
  };
};

export type CartItem = {
  id: number;
  items: Array<{
    type: string;
    src: string;
  }>;
};

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (items: Array<{ type: string; src: string }>) => void;
  removeFromCart: (id: number) => void;
};

export type OutfitItem = {
  type: string;
  src: string;
  category: string;
};

export type OutfitContextType = {
  savedOutfits: OutfitItem[][];
  addOutfit: (items: OutfitItem[]) => void;
  deleteOutfit: (index: number) => void;
};

export type ClothingItemProps = {
  id: number;
  type: string;
  src: string;
  category: string;
  left: number;
  top: number;
  removeItem: (id: number) => void;
};

export type SavedOutfitsProps = {
  onLoadOutfit: (items: OutfitItem[]) => void;
};

export type CanvasProps = {
  loadedOutfit?: OutfitItem[];
};

export interface ClothingThumbnailProps {
  id: number;
  type: string;
  src: string;
  category: string;
}
