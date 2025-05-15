import { FaShoppingCart } from "react-icons/fa";
import { useGlobalContext } from "../hooks/useGlobalContext";

const texts = {
  uz: {
    add: "Qo‘shish",
  },
  ru: {
    add: "Добавить",
  },
  en: {
    add: "Add",
  },
};

function Product({ product }) {
  const { dispatch, cart, language } = useGlobalContext();
  const itemInCart = cart.find((item) => item.id === product.id);
  const t = texts[language];

  return (
    <div
      className="bg-white rounded-md shadow-md p-3 flex flex-col justify-between"
      style={{ width: "200px", height: "200px" }}
    >
      <div>
        <h3 className="text-md font-semibold mb-1 truncate">{product.name}</h3>
        <p className="text-xs text-gray-600 mb-2 line-clamp-3">
          {product.description}
        </p>
        <small className="text-blue-700 font-semibold">
          Price: ${product.price.toFixed(2)}
        </small>
      </div>

      {!itemInCart && (
        <button
          onClick={() =>
            dispatch({
              type: "ADD_TO_CART",
              payload: { ...product, amount: 1 },
            })
          }
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded text-sm flex items-center justify-center gap-1"
        >
          <FaShoppingCart /> {t.add}
        </button>
      )}

      {itemInCart && (
        <div className="mt-2 flex items-center justify-center space-x-2">
          <button
            onClick={() => {
              if (itemInCart.amount === 1)
                dispatch({ type: "DELETE", payload: product.id });
              else dispatch({ type: "DECREASE", payload: product.id });
            }}
            className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-0.5 text-lg font-bold select-none"
          >
            &#8722;
          </button>
          <span className="text-base font-semibold">{itemInCart.amount}</span>
          <button
            onClick={() => dispatch({ type: "INCREASE", payload: product.id })}
            className="bg-green-500 hover:bg-green-600 text-white rounded px-2 py-0.5 text-lg font-bold select-none"
          >
            &#43;
          </button>
        </div>
      )}
    </div>
  );
}

export default Product;
