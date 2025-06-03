"use client";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Canvas from "./components/Canvas";
import Cart from "./components/Cart";
import SavedOutfits from "./components/SavedOutfits";
import { OutfitItem } from "./Types/types";
import { Toolbar } from "./components/Toolbar/ToolbarClient";

export default function Home() {
  const [loadedOutfit, setLoadedOutfit] = useState<OutfitItem[] | undefined>(
    undefined
  );

  const handleLoadOutfit = (items: OutfitItem[]) => {
    setLoadedOutfit(items);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-purple-100 pb-90 to-pink-100 flex flex-col items-center justify-start p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-7xl flex flex-col gap-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 drop-shadow-md">
            Outfit Builder
          </h1>

          <div className="bg-white bg-opacity-80 rounded-2xl shadow-xl p-4 backdrop-blur-sm w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Clothing Palette
            </h2>
            <Toolbar />
          </div>

          <div className="w-full grid grid-cols-1 gap-6 lg:flex lg:gap-6">
            <div className="lg:flex-[2] bg-white bg-opacity-90 rounded-2xl shadow-xl p-6 backdrop-blur-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                CANVAS AREA
              </h2>
              <Canvas loadedOutfit={loadedOutfit} />
            </div>

            <div className="lg:flex-[1] bg-white bg-opacity-80 rounded-2xl shadow-xl p-4 backdrop-blur-sm self-start flex flex-col">
              <SavedOutfits onLoadOutfit={handleLoadOutfit} />
              <br />
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Cart</h2>
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
