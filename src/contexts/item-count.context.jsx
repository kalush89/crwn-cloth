import { createContext, useState } from 'react';

export const ItemCountContext = createContext({
    count : 0,
    setCount : () => {}
});

export const  ItemCountProvider = ({children}) => {
   const [count, setCount] = useState(0);
    const value = {count, setCount};

    return <ItemCountContext.Provider value={value}>{children}</ItemCountContext.Provider>
}