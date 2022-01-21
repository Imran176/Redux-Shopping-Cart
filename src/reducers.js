import { INCREASE, DECREASE, CLEAR_CART, REMOVE, GET_TOTAL } from "./actions";

function reducer(state, action) {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === DECREASE) {
    let tempCart = [];
    if (action.payload.num_item === 1) {
      tempCart = state.cart.filter((cartItem) => cartItem.id !== action.payload.key)
    }
    else {
      tempCart = state.cart.map(cartItem => {
        if (cartItem.id === action.payload.key) {
          cartItem = { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      });
    }
    return { ...state, cart: tempCart };
  }
  if (action.type === INCREASE) {
    let tempCart = state.cart.map(cartItem => {
      if (cartItem.id === action.payload.key) {
        cartItem = { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === REMOVE) {
    return {
      ...state, cart: state.cart.filter(
        (cartItem) => cartItem.id !== action.payload.key
      )
    };
  }
  if (action.type === GET_TOTAL) {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;

        return cartTotal;
      },
      {
        total: 0,
        amount: 0
      }
    );
    total=parseFloat(total.toFixed(2))
    return { ...state, total, amount }
  }
  return state;
}

export default reducer;