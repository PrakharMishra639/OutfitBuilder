"use client";
import { useState } from "react";

import { ClothingThumbnail } from "./ClothingThumbnail";
import { clothingCategories, clothingItems } from "@/app/utils/clothingData";
export function Toolbar({
  initialCategory = "all",
}: {
  initialCategory?: string;
}) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filteredItems =
    activeCategory === "all"
      ? clothingItems
      : clothingItems.filter((item) => item.category === activeCategory);

  return (
    <section
      aria-label="Toolbar"
      className="bg-gradient-to-r from-white via-blue-50 to-white rounded-lg p-4 sm:p-6 mb-8 max-w-full"
    >
      <nav
        aria-label="Clothing categories"
        className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50"
      >
        {clothingCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold whitespace-nowrap
              transition-colors duration-200
              ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-blue-700 hover:bg-blue-100 hover:text-blue-900"
              }`}
          >
            {category.name}
          </button>
        ))}
      </nav>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {filteredItems.map((item) => (
          <ClothingThumbnail
            key={item.id}
            id={item.id}
            type={item.type}
            src={item.src}
            category={item.category}
          />
        ))}
      </div>
    </section>
  );
}
