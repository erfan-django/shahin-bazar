"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, Tag, ImageOff } from "lucide-react";

export default function ItemCard({ item }) {
  const [imgError, setImgError] = useState(false);
  const discount = item.oldPrice ? Math.round((1 - item.price / item.oldPrice) * 100) : 0;

  return (
    <Link href={`/items/${item.id}`} className="group bg-[var(--bg-card)] rounded-xl shadow-sm border border-[var(--border-color)] overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col">
      <div className="aspect-[4/3] relative overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
        {!imgError ? (
          <Image
            src={item.image}
            alt={item.name}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-30">
            <ImageOff size={48} style={{ color: "var(--accent-color)" }} />
          </div>
        )}
        {item.isPreOrder && (
          <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <ShoppingBag size={12} />
            پیش‌فروش
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Tag size={12} />
            {discount}%-
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-medium line-clamp-2" style={{ color: "var(--text-primary)" }}>
          {item.name}
        </h3>
        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-lg font-bold" style={{ color: "var(--accent-color)" }}>
              {item.price.toLocaleString()}
            </span>
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>تومان</span>
            {item.oldPrice && (
              <span className="text-xs line-through w-full" style={{ color: "var(--text-secondary)" }}>
                {item.oldPrice.toLocaleString()} تومان
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
