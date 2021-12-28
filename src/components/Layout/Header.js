import React, { Fragment, useContext } from "react";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpeg";
import cartContex from "../../store/Cart-Contex";

const Header = (props) => {
  const cartCtx = useContext(cartContex);

  console.log(cartCtx);
  return (
    <Fragment>
      <p className={cartCtx.orderedmsg ? "ordered" : ""}>
        {cartCtx.orderedmsg}
      </p>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onClick} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;
