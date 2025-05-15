import Product from "./Product";
import { useGlobalContext } from "../hooks/useGlobalContext";

const texts = {
  uz: {
    productListTitle: "Mahsulotlar ro‘yxati",
    totalPriceText: "Jami narx",
    clearBtn: "Tozalash",
  },
  ru: {
    productListTitle: "Список продуктов",
    totalPriceText: "Общая цена",
    clearBtn: "Очистить",
  },
  en: {
    productListTitle: "Product List",
    totalPriceText: "Total Price",
    clearBtn: "Clear",
  },
};

function ProductsList({ products }) {
  const { totalPrice, dispatch, language } = useGlobalContext();
  const t = texts[language];

  return (
    <div className="max-w-[700px] mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-bold">{t.productListTitle}:</p>
        <div className="flex items-center space-x-3">
          <span className="font-semibold">
            {t.totalPriceText}: ${totalPrice.toFixed(2)}
          </span>
          <button
            onClick={() => dispatch({ type: "CLEAR" })}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            {t.clearBtn}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4" style={{ maxWidth: "660px" }}>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
