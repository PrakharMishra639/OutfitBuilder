"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { OutfitContextType, OutfitItem } from "../Types/types";

const OutfitContext = createContext<OutfitContextType>({
  savedOutfits: [],
  addOutfit: () => {},
  deleteOutfit: () => {},
});

export const OutfitProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedOutfits, setSavedOutfits] = useState<OutfitItem[][]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("savedOutfits");
    if (stored) {
      setSavedOutfits(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedOutfits", JSON.stringify(savedOutfits));
  }, [savedOutfits]);

  const addOutfit = (items: OutfitItem[]) => {
    setSavedOutfits((prev) => [...prev, items]);
  };

  const deleteOutfit = (index: number) => {
    setSavedOutfits((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <OutfitContext.Provider value={{ savedOutfits, addOutfit, deleteOutfit }}>
      {children}
    </OutfitContext.Provider>
  );
};

export const useOutfits = () => useContext(OutfitContext);
