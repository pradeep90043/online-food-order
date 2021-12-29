import React, { useReducer } from "react";
import cartContex from "./Cart-Contex";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  orderedmsg: "",
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems = [];
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "ORDERED") {
    return { ...state, orderedmsg: action.message };
  }

  if(action.type === "CLEAR"){
    return {
      ...state,
      items:[],
      totalAmount:0
    }
  }
  return defaultCartState;
};

const CartContexProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemsHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemshandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const orderSuccesfull = (message = "") => {
    dispatchCartAction({ type: "ORDERED", message });
  };

const clearCartHandler = () => {
  dispatchCartAction({type: "CLEAR"})
}

  const context = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemsHandler,
    removeItem: removeItemshandler,
    orderedmsg: cartState.orderedmsg,
    showMsg: orderSuccesfull,
    clearCart: clearCartHandler
  };

  return (
    <cartContex.Provider value={context}>{props.children}</cartContex.Provider>
  );
};

export default CartContexProvider;
