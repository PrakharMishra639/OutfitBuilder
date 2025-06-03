"use client";

import { SavedOutfitsProps } from "../Types/types";
import { useOutfits } from "./SavedContext";

export default function SavedOutfits({ onLoadOutfit }: SavedOutfitsProps) {
  const { savedOutfits, deleteOutfit } = useOutfits();

  if (savedOutfits.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">No saved outfits found.</p>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Saved Outfits
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {savedOutfits.map((outfit, i) => (
          <div
            key={i}
            className="border rounded p-3 relative cursor-pointer hover:shadow-lg transition bg-white"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteOutfit(i);
              }}
              className="absolute top-2 right-1 bg-gray-300 bg-opacity-50 hover:bg-opacity-80 text-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-sm transition"
              aria-label={`Delete outfit #${i + 1}`}
              title="Delete Outfit"
            >
              &times;
            </button>

            <div onClick={() => onLoadOutfit(outfit)}>
              <p className="mb-2 font-medium text-center text-gray-800">
                Outfit #{i + 1}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {outfit.map((item, idx) => (
                  <img
                    key={idx}
                    src={item.src}
                    alt={item.type}
                    className="w-12 h-12 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
