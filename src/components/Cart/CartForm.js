import React, { useContext, useState } from "react";
import cartContex from "../../store/Cart-Contex";
import classes from "./CartForm.module.css";

const CartForm = (props) => {
  const cartCtx = useContext(cartContex);

  const [inputData, setInputData] = useState({
    name: "",
    street: "",
    postal_code: "",
    city: "",
  });

  const inputEvent = (event) => {
    const { name, value } = event.target;
    setInputData((prevalue) => {
      return { ...prevalue, [name]: value };
    });
  };
  console.log(inputData);

  const submitHAndler = async (e) => {
    props.onClose()
    e.preventDefault();
    const response = await fetch(
      "https://food-form-default-rtdb.firebaseio.com/foodform.json",
      {
        method: "POST",
        body: JSON.stringify(inputData),
        Headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    cartCtx.showMsg();
  };

  return (
    <form className={classes.form} onSubmit={submitHAndler}>
      <div className={classes.labelInput}>
        <label htmlFor="">Your Name</label>
        <input
          type="text"
          name="name"
          value={inputData.name}
          onChange={inputEvent}
        />
      </div>
      <div className={classes.labelInput}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          name="street"
          value={inputData.street}
          onChange={inputEvent}
        />
      </div>
      <div className={classes.labelInput}>
        <label htmlFor="postal_code">Postal Code</label>
        <input
          type="number"
          name="postal_code"
          value={inputData.postal_code}
          onChange={inputEvent}
        />
      </div>
      <div className={classes.labelInput}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          value={inputData.city}
          onChange={inputEvent}
        />
      </div>
      <div className={classes.actions}>
        <button type="button">
          Cancel
        </button>
        <button type="submit" >Confirm</button>
      </div>
    </form>
  );
};

export default CartForm;
