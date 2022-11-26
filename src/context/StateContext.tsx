import { createContext, useContext, useState, useEffect, MouseEventHandler } from 'react';
import { toast } from 'react-hot-toast';
import type { ReactNode } from 'react';
import type { ProductType } from '../utils/sanityTypes';
import { Product } from '../components';

interface ContextType {
  showCart: boolean;
  setShowCart: Function;
  cartItems: ProductType[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  incQty: MouseEventHandler<HTMLSpanElement>;
  decQty: MouseEventHandler<HTMLSpanElement>;
  onAdd: Function;
  toggleCartItemQuantity: Function;
  onRemove: Function;
  setCartItems: Function;
  setTotalPrice: Function;
  setTotalQuantities: Function;
}

const ContextDefault = {
  showCart: false,
  setShowCart: () => {},
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
  incQty: () => {},
  decQty: () => {},
  onAdd: () => {},
  toggleCartItemQuantity: (id: string, value: string) => {},
  onRemove: () => {},
  setCartItems: () => {},
  setTotalPrice: () => {},
  setTotalQuantities: () => {},
};

const Context = createContext<ContextType>(ContextDefault);

interface Props {
  children: ReactNode;
}
export const StateContext = ({ children }: Props) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  const onAdd = (product: any, quantity: number) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct: any) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart`);
  };

  const onRemove = (product) => {
    let foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id: string, value: string) => {
    let foundProduct = cartItems.find((item) => item._id === id);
    let index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === 'inc') {
      // setCartItems([
      //   ...newCartItems,
      //   { ...foundProduct, quantity: foundProduct.quantity + 1 },
      // ]);
      setCartItems((prevCartItems)=>{
        const newCart = prevCartItems.map((item)=>{
            if(item._id===id){
                return {...item, quantity: item.quantity + 1};
            }
            return item;
        });
        return newCart;
      }) 
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        // setCartItems([
        //   ...newCartItems,
        //   { ...foundProduct, quantity: foundProduct.quantity - 1 },
        // ]);
        setCartItems((prevCartItems)=>{
          const newCart = prevCartItems.map((item)=>{
              if(item._id===id){
                  return {...item, quantity: item.quantity - 1};
              }
              return item;
          });
          return newCart;
        })  
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
