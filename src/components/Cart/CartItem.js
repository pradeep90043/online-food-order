import React from "react";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `$${props.item.price}`;
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.item.name} </h2>
        <div className={classes.summary}>
          <p className={classes.price}>{price}</p>
          <span className={classes.amount}>x {props.item.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
