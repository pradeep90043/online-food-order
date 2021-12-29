import { createContext } from "react";

const cartContex = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  showMsg: (message) => {},
  orderedmsg: "",
  clearCart : () => {}
});
export default cartContex;
