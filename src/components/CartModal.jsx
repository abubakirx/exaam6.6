import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { X, Plus, Minus, Trash } from "lucide-react";

export default function CartModal({ closeModal }) {
  const { cart, dispatch } = useContext(CartContext);

  const total = cart.reduce((acc, cur) => acc + cur.count * cur.price, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4">Savatcha</h2>
        {cart.length === 0 ? (
          <p>Savatcha bo‘sh</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.price} so‘m</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      dispatch({ type: "DECREMENT", payload: item.id })
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span>{item.count}</span>
                  <button
                    onClick={() =>
                      dispatch({ type: "INCREMENT", payload: item.id })
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                    }
                  >
                    <Trash className="w-4 h-4  text-red-500" />
                  </button>
                </div>
              </div>
            ))}
            <div className="text-right font-bold mt-4">
              Jami: {total.toLocaleString()} so‘m
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
