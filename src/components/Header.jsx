import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function Header({ lang, setLang, openCart }) {
  const { cart } = useContext(CartContext);

  return (
    <header className="flex justify-between items-center p-4 shadow bg-white ">
      <h1 className="text-xl font-bold ">FN37 Shop</h1>
      <div className="flex items-center gap-4">
        <Select  value={lang} onValueChange={setLang}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Til" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uz">UZ</SelectItem>
            <SelectItem value="ru">RU</SelectItem>
            <SelectItem value="en">EN</SelectItem>
          </SelectContent>
        </Select>
        <button onClick={openCart} className="relative">
          <ShoppingCart className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cart.reduce((acc, cur) => acc + cur.count, 0)}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
