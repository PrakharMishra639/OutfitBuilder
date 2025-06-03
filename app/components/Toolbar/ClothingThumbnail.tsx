"use client";
import { ClothingThumbnailProps } from "@/app/Types/types";
import Image from "next/image";
import { useRef } from "react";
import { useDrag } from "react-dnd";

export function ClothingThumbnail({
  id,
  type,
  src,
  category,
}: ClothingThumbnailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag({
    type: "clothing",
    item: { id, type, src, category },
  });

  drag(ref);

  return (
    <div
      ref={ref}
      className="cursor-grab p-2 sm:p-3 border border-gray-200 rounded-lg bg-white
        hover:shadow-lg transition-shadow duration-200 flex flex-col items-center"
      title={type}
    >
      <img
        src={src}
        alt={type}
        className="w-10 h-10 sm:w-14 sm:h-14 object-contain select-none"
        draggable={false}
      />
      <p className="mt-1 text-xs sm:text-sm text-blue-800 font-medium text-center truncate max-w-[80px] sm:max-w-[100px]">
        {type}
      </p>
    </div>
  );
}
