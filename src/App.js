import { useEffect, useState } from "react";
import "./App.css";

// custom hook - aula 4
import { useFetch } from "./hooks/useFetch";
const url = "http://localhost:3000/products";

function App() {

  // custom hook - aula 4
  const { data: items, httpConfig } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Adição de produtos -  aula 2
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
          <input type="submit" value="adicionar" />
        </form>
      </div>
    </div>
  );
}

export default App;
