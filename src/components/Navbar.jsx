import { useState } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

function Navbar() {
  const { totalAmount, cart, dispatch, language = "uz" } = useGlobalContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const texts = {
    uz: {
      cartEmpty: "Savatcha bo‘sh",
      clearCart: "Savatchani tozalash",
      home: "Bosh sahifa",
      contact: "Aloqa",
      cartTitle: "Savatchangiz",
    },
    ru: {
      cartEmpty: "Корзина пуста",
      clearCart: "Очистить корзину",
      home: "Главная",
      contact: "Контакты",
      cartTitle: "Ваша корзина",
    },
    en: {
      cartEmpty: "Cart is empty",
      clearCart: "Clear Cart",
      home: "Home",
      contact: "Contact",
      cartTitle: "Your Cart",
    },
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h2 className="text-2xl font-bold text-yellow-600">
          <Link to="/">MyStore</Link>
        </h2>
        <nav className="flex items-center gap-6">
          <NavLink to="/" className="hover:text-yellow-700">
            {texts[language].home}
          </NavLink>
          <NavLink to="/contact" className="hover:text-yellow-700">
            {texts[language].contact}
          </NavLink>

          <div
            className="relative cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <FaShoppingCart className="text-xl text-gray-800" />
            {totalAmount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalAmount}
              </span>
            )}
          </div>
        </nav>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-yellow-50 border-4 border-yellow-300 rounded-2xl shadow-2xl w-[500px] h-[500px] p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-3xl text-gray-700 hover:text-red-500 transition"
                aria-label="Close modal"
              >
                &times;
              </button>

              {/* Title */}
              <h2 className="text-2xl font-bold text-center mb-6 text-yellow-700">
                {texts[language].cartTitle}
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 overflow-y-auto max-h-[340px] pr-2">
                {cart.length > 0 ? (
                  cart.map(({ id, title, price, amount, image }) => (
                    <div
                      key={id}
                      className="flex items-center gap-4 border border-yellow-200 p-3 rounded-xl shadow"
                    >
                      <img
                        src={image}
                        alt={title}
                        className="w-14 h-14 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{title}</p>
                        <p className="text-sm text-gray-600">
                          {amount} × ${price} = ${(price * amount).toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          dispatch({ type: "DELETE", payload: id })
                        }
                        className="text-red-600 hover:text-red-800 text-lg"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 mt-16 text-lg">
                    {texts[language].cartEmpty}
                  </p>
                )}
              </div>

              {/* Clear Cart */}
              {cart.length > 0 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => dispatch({ type: "CLEAR" })}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full shadow-md transition-transform hover:scale-105"
                  >
                    {texts[language].clearCart}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
