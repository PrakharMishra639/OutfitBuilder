"use client";
import { useDrag } from "react-dnd";
import { useRef } from "react";
import { ClothingItemProps } from "../Types/types";
import Image from "next/image";

export default function ClothingItem({
  id,
  type,
  src,
  category,
  left,
  top,
  removeItem,
}: ClothingItemProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: "clothing",
    item: { id, type, src, category },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drag(divRef);

  const handleClick = (e: React.MouseEvent) => {
    if (e.detail === 2) {
      removeItem(id);
    }
  };

  return (
    <div
      ref={divRef}
      onClick={handleClick}
      className={`absolute z-20 cursor-grab transition-transform duration-150 ease-in-out ${
        isDragging ? "opacity-40 scale-95" : "opacity-100"
      }`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative group w-[72px] sm:w-[80px] md:w-[100px] lg:w-[120px] xl:w-[140px]">
        <img
          src={src}
          alt={type}
          className="w-full h-auto rounded-xl shadow-md pointer-events-none select-none transition-transform group-hover:scale-105"
          draggable={false}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-1 bg-white/30 backdrop-blur-sm text-xs text-white px-2 py-0.5 rounded-full shadow-sm font-medium">
          {type}
        </div>
      </div>
    </div>
  );
}
