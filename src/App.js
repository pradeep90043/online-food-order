import { useState } from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartContexProvider from "./store/CartContexProvider";

function App() {
const [ showCart, setShowCart ] = useState(false)

const showCartHandler = ( ) => {
  setShowCart(true)
}
const hideCartHAndler = () => {
  setShowCart(false)
}

  return (
    <CartContexProvider>
      <Header onClick= {showCartHandler}  />
      {showCart && <Cart onClose = {hideCartHAndler} />}
      <main>
        <Meals />
      </main>
    </CartContexProvider>
  );
}

export default App;
