import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const url = "http://localhost:3000/products";

  // Resgatando os dados - aula 1
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchData();
  }, []);

  // Adição de produtos -  aula 2
  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name,
      price,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const addedProduct = await res.json();

    // Carregamento dinâmico - aula 3
    setProducts((prevProducts) => [...prevProducts, addedProduct]);

    setName("");
    setPrice("");
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      {products.map((product) => (
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
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <input type="submit" value="adicionar" />
        </form>
      </div>
    </div>
  );
}

export default App;
