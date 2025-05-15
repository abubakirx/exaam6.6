import React, { useState } from "react";

import Header from "./components/Header";
import ProductList from "./components/ProductList";
import CartModal from "./components/CartModal";
import { CartProvider } from "./context/CartContext";

export default function App() {
  const [lang, setLang] = useState("uz");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header
          lang={lang}
          setLang={setLang}
          openCart={() => setIsModalOpen(true)}
        />
        <ProductList lang={lang} />
        {isModalOpen && <CartModal closeModal={() => setIsModalOpen(false)} />}
      </div>
    </CartProvider>
  );
}
