import React, { useReducer } from "react";
import CartContext from "./cart-context";
//this is the component that manages the state of all the elemetns via context api

const defaultCardState = {
  items: [],
  totalAmount: 0,
};

const CardReducer = (state, actions) => {
  if (actions.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + actions.item.price * actions.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === actions.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: actions.item.amount + existingCartItem.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(actions.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (actions.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === actions.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.amount;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== actions.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else {
    return defaultCardState;
  }
};
const CartProvider = (props) => {
  const [cardState, dispatchCardAction] = useReducer(
    CardReducer,
    defaultCardState
  );
  const addItemToCartHandler = (item) => {
    dispatchCardAction({
      type: "ADD",
      item: item,
    });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCardAction({
      type: "REMOVE",
      id: id,
    });
  };
  const cartContext = {
    items: cardState.items,
    totalAmount: cardState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
