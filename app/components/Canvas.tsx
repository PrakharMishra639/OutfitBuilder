"use client";

import { useDrop } from "react-dnd";
import { useState, useRef, useEffect } from "react";
import ClothingItem from "./ClothingItem";
import { useCart } from "./CartContext";
import { BsPersonStanding } from "react-icons/bs";
import { toast } from "react-toastify";
import { useOutfits } from "./SavedContext";
import { ClothingItemType, OutfitItem } from "../Types/types";
const SINGLE_ITEM_CATEGORIES = ["upper", "bottom", "footwear","accessories"];
// const MULTIPLE_ITEMS_CATEGORIES = ["accessories"];

export default function Canvas({
  loadedOutfit,
}: {
  loadedOutfit?: OutfitItem[];
}) {
  const [items, setItems] = useState<ClothingItemType[]>([]);
  const [nextId, setNextId] = useState(1);
  const { addToCart } = useCart();
  const { addOutfit } = useOutfits();
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadedOutfit && loadedOutfit.length > 0) {
      const defaultX = 150;
      const defaultY = 150;

      const newItems = loadedOutfit.map((item, index) => ({
        ...item,
        id: nextId + index,
        position: { x: defaultX, y: defaultY },
      }));

      setItems(newItems);
      setNextId((prev) => prev + loadedOutfit.length);
    }
  }, [loadedOutfit]);

  const [, drop] = useDrop({
    accept: "clothing",
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      const canvas = canvasRef.current;

      if (!offset || !canvas) return;

      const canvasRect = canvas.getBoundingClientRect();
      const x = offset.x - canvasRect.left;
      const y = offset.y - canvasRect.top;

      const shouldReplace = SINGLE_ITEM_CATEGORIES.includes(item.category);

      const filteredItems = shouldReplace
        ? items.filter((i) => i.category !== item.category)
        : items;

      const newItem: ClothingItemType = {
        ...item,
        id: nextId,
        position: { x, y },
      };

      setItems([...filteredItems, newItem]);
      setNextId(nextId + 1);
    },
  });

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const resetCanvas = () => {
    setItems([]);
  };

  const handleAddToCart = () => {
    if (items.length === 0) {
      toast.error("Please add items to the outfit before adding to cart.");
      return;
    }

    const outfitItems = items.map((item) => ({
      type: item.type,
      src: item.src,
      category: item.category,
    }));
    addToCart(outfitItems);
    toast.success(
      "Items have been successfully added to your cart. Click the cart icon to view them."
    );
    resetCanvas();
  };

  const handleSaveOutfit = () => {
    if (items.length === 0) {
      toast.error("No items to save in the outfit.");
      return;
    }

    const outfitToSave = items.map(({ type, src, category }) => ({
      type,
      src,
      category,
    }));

    addOutfit(outfitToSave);
    toast.success("Outfit saved successfully!");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[700px] mx-auto p-4">
      <div
        ref={(node) => {
          canvasRef.current = node;
          drop(node);
        }}
        className="relative w-full aspect-[3/4] max-w-[600px] border-2 border-dashed border-gray-300 rounded-lg 
                   bg-gradient-to-b from-purple-100 via-pink-50 to-white overflow-hidden flex justify-center items-center"
        style={{ minHeight: 320 }}
      >
        {items.length === 0 && (
          <BsPersonStanding
            className="text-gray-400"
            style={{ fontSize: "16rem", userSelect: "none" }}
            aria-label="Virtual model placeholder"
          />
        )}

        {items.map((item) => (
          <ClothingItem
            key={item.id}
            id={item.id}
            type={item.type}
            src={item.src}
            category={item.category}
            left={item.position.x}
            top={item.position.y}
            removeItem={removeItem}
          />
        ))}
      </div>

      <div className="mt-4 space-x-4 flex flex-wrap justify-center gap-4 w-full max-w-[600px]">
        <button
          onClick={resetCanvas}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Reset
        </button>
        <button
          onClick={handleAddToCart}
          disabled={items.length === 0}
          className={`px-4 py-2 text-white rounded transition w-full sm:w-auto ${
            items.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          Add to Cart ▼
        </button>
        <button
          onClick={handleSaveOutfit}
          disabled={items.length === 0}
          className={`px-4 py-2 text-white rounded transition w-full sm:w-auto ${
            items.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Save Outfit
        </button>
      </div>
    </div>
  );
}
