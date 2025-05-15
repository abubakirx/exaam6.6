import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import ProductsList from "../components/ProductsList";
import { useGlobalContext } from "../hooks/useGlobalContext";

function Home() {
  const { language, setLanguage } = useGlobalContext();
  const { data, error, isPending } = useFetch(
    `https://json-api.uz/api/project/fn37-exam/${language}`
  );

  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section>
      <div className="container mx-auto p-4 max-w-[720px]">
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            setVisibleCount(6);
          }}
          className="mb-4 border rounded px-3 py-2"
        >
          <option value="uz">Uz</option>
          <option value="ru">Ru</option>
          <option value="en">Eng</option>
        </select>

        {error && <h2 className="text-red-600">{error}</h2>}
        {isPending && <h3 className="text-gray-500">Loading...</h3>}
        {data && (
          <>
            <ProductsList products={data.data.slice(0, visibleCount)} />
            {visibleCount < data.data.length && (
              <button
                onClick={handleLoadMore}
                className="mt-4 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded"
              >
                {language === "uz"
                  ? "KOPROQ"
                  : language === "ru"
                  ? "БОЛЬШЕ"
                  : "LOAD MORE"}
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
