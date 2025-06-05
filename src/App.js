import { useState } from "react";
import "./App.css";

import { useFetch } from "./hooks/useFetch";
const url = "http://localhost:3000/products";

function App() {
  const { data: items, httpConfig, loading } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name,
      price,
    };

    httpConfig(product, "POST");

    setName("");
    setPrice("");
  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      {loading && <p>Carregando dados...</p>}
      {items &&
        items.map((product) => (
          <p key={product.id}>
            {product.name} - R${product.price}
          </p>
        ))}
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          {loading && <input type="submit" disabled value="aguarde" />}
          {!loading && <input type="submit" value="adicionar" />}
        </form>
      </div>
    </div>
  );
}

export default App;
