import { useState, useContext } from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import cartContex from "./store/Cart-Contex";

function App() {
  const [showCart, setShowCart] = useState(false);
  const cartCtx = useContext(cartContex);

  const showCartHandler = () => {
    cartCtx.showMsg("");
    setShowCart(true);
  };
  const hideCartHAndler = () => {
    setShowCart(false);
  };

  return (
    <>
      <Header onClick={showCartHandler} />
      {showCart && <Cart onClose={hideCartHAndler} />}
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
