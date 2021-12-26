import React, { useContext } from "react";
import cartContex from "../../store/Cart-Contex";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(cartContex);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;


  const totalprices = cartCtx.items.reduce((sum, curEl) => {
    console.log(sum + curEl);
    return sum + curEl.price * curEl.amount;
  }, 0);
  console.log(totalprices);

  const addHandler = (item) => cartCtx.addItem({ ...item, amount: 1 });

  const removehandler = (id) => cartCtx.removeItem(id);

  const cartitem = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            item={item}
            onAdd={addHandler.bind(null, item)}
            onRemove={removehandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartitem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount} </span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes["button-alt"]}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
