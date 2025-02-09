"use client";

import * as React from "react";
import { Heart, ShoppingCart, Star, Search, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import { client } from "@/sanity/lib/client";

import { CartContext } from "@/components/ui/CartProvider";
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  priceWithoutDiscount: number;
  rating: number;
  ratingCount: number;
  tags: string[];
  sizes: string[];
  imageUrl: string;
  colors: string[];
  brand: string;
  category: string;
}

async function getProducts() {
  try {
    const products = await client.fetch(`
      *[_type == "product"]{
        _id,
        name,
        description,
        price,
        discountPercentage, 
        "priceWithoutDiscount": price * (1 - discountPercentage / 100),
        rating,
        ratingCount,
        tags,
        sizes,
        "imageUrl": image.asset->url,
        colors,
        brand,
        category,
      }
    `);
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default function ShopPage() {
  const [view, setView] = React.useState<"grid" | "list">("list");
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = React.useState<string[]>([]);
  const [selectedRating, setSelectedRating] = React.useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState("best-match");
  const [perPage, setPerPage] = React.useState("15");
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center text-[#151875]">Shop Left Sidebar</h1>
      <div className="flex gap-8 mt-6">
        {/* Sidebar */}
        <aside className="w-64 p-4 space-y-6 border-r">
          <h3 className="font-bold text-lg text-[#151875] underline">Product Brand</h3>
          <div className="space-y-2">
            {["Brand A", "Brand B"].map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) =>
                    setSelectedBrands(checked ? [...selectedBrands, brand] : selectedBrands.filter((b) => b !== brand))
                  }
                />
                <Label htmlFor={brand}>{brand}</Label>
              </div>
            ))}
          </div>
          <Separator />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
               key={product._id}>
                <CartContext value={undefined}>
                  <Link href={`/product/${product._id}`}>
                    <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                  </Link>
                  <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 line-through">${product.priceWithoutDiscount.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="icon"><ShoppingCart /></Button>
                    <Button variant="outline" size="icon"><Heart /></Button>
                    <Link href={`/product/${product._id}`}>
                      <Button variant="outline" size="icon"><Search /></Button>
                    </Link>
                  </div>
                </CartContext>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}