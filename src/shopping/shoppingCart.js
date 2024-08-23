import React, { useReducer } from 'react';
import './shoppingCart.css';

const initialState = {
  cart: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.cart.find(item => item.id === action.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.id
              ? { ...item, quantity: item.quantity + action.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { id: action.id, name: action.name, price: action.price, quantity: action.quantity }],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.id),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.id
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };

    default:
      return state;
  }
}

function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItemToCart = (id, name, price, quantity) => {
    dispatch({ type: 'ADD_ITEM', id, name, price, quantity });
  };

  const removeItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {state.cart.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
            <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
            <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Add Items</h2>
        <button onClick={() => addItemToCart(1, 'Apple', 1, 1)}>Add Apple</button>
        <button onClick={() => addItemToCart(2, 'Banana', 0.5, 1)}>Add Banana</button>
        <button onClick={() => addItemToCart(3, 'Chocolate', 1000, 1)}>Add Chocolate</button>
      </div>
    </div>
  );
}

export default ShoppingCart;
