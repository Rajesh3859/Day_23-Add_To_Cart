import { useEffect, useState } from "react";
import Billboard from "./components/Billboard";
import Header from "./components/Header/index";
import ProductsContainer from "./components/ProductsContainer/ProductsContainer";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("https://stellular-axolotl-2819e7.netlify.app/products.json")
      .then((response) => response.json())
      .then((result) => {
        if (result && result.data.length > 0) {
          setProducts(result.data);
        }
      });
  }, []);

  function handleAddToCart(data) {
    const cartCopy = [...cart];
    cartCopy.push(data);
    setCart(cartCopy);
  }

  function handleRemoveFromCart(data) {
    let cartCopy = [...cart];
    cartCopy = cartCopy.filter((item) => item.id != data.id);
    setCart(cartCopy);
  }

  return (
    <>
      <Header quantity={cart.length} />
      <Billboard />
      <ProductsContainer
        products={products}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        cart={cart}
      />
    </>
  );
}

export default App;
