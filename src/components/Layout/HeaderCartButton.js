import React, { useContext, useEffect, useState } from "react";
import cartContex from "../../store/Cart-Contex";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(cartContex);
 const {items} = cartCtx
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const numberOfCartIems = items.reduce((curNum, item) => {
    //reduce method
    return curNum + item.amount;
  }, 0);

  useEffect(() => {
    if(items.length === 0){
      return
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    },300)
    return () => clearTimeout(timer)

  }, [items]);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartIems} </span>
    </button>
  );
};

export default HeaderCartButton;
