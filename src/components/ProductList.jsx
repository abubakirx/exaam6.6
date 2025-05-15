import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button } from "./ui/button";

export default function ProductList({ lang }) {
  const [products, setProducts] = useState([]);
  const { dispatch } = useContext(CartContext);

  const langs = {
    uz: { title: "Mahsulotlar", btn: "Savatga qo‘shish" },
    ru: { title: "Товары", btn: "Добавить в корзину" },
    en: { title: "Products", btn: "Add to Cart" },
  };

  useEffect(() => {
    fetch("http://localhost:3000/uz")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Xatolik:", err);
        alert("Ma'lumotlarni yuklashda xatolik yuz berdi.");
      });
  }, []);

  const handleAdd = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
    alert(`✅ ${item.name} savatga qo‘shildi!`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{langs[lang].title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="border-2 rounded p-4 border-r-2 shadow-sm bg-white"
          >
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600 mb-2">{item.price} so‘m</p>
            <Button onClick={() => handleAdd(item)}>{langs[lang].btn}</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
