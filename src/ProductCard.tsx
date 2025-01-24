import { useEffect, useState } from "react";

const ProductCard = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<any | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const response = await fetch("products.json");
      const data = await response.json();
      setProducts(data.products);
    };
    loadProducts();
  }, []);

  const runSearch = () => {
    if (search == "") {
      setResult(null);
      return;
    }

    const foundProduct = products.find((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setResult(foundProduct || null);
  };

  return (
    <div className="product-card">
      <div className="search-section">
        <label htmlFor="productName">Enter Product Name:</label>
        <input
          type="text"
          id="productName"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={runSearch}>Search</button>
      </div>

      <div className="results-section">
        {result ? (
          <div className="product-info">
            <img src={result.image} alt={result.name} className="product-image" />
            <div className="product-details">
              <p>ID: {result.id}</p>
              <p>Name: {result.name}</p>
              <p>Price: ${result.price}</p>
              <p>Category: {result.category}</p>
            </div>
          </div>
        ) : (
          search && <p className="error">No product found with the given name.</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
