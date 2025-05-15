import React, { createContext, useReducer } from "react";

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) {
        return state.map((i) =>
          i.id === item.id ? { ...i, count: i.count + 1 } : i
        );
      }
      return [...state, { ...action.payload, count: 1 }];
    }
    case "REMOVE_FROM_CART": {
      return state.filter((i) => i.id !== action.payload);
    }
    case "INCREMENT": {
      return state.map((i) =>
        i.id === action.payload ? { ...i, count: i.count + 1 } : i
      );
    }
    case "DECREMENT": {
      return state.map((i) =>
        i.id === action.payload && i.count > 1
          ? { ...i, count: i.count - 1 }
          : i
      );
    }
    default:
      return state;
  }
}

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
