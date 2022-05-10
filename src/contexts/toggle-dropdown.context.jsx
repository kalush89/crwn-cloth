import { createContext, useState } from 'react';

export const ToggleDropdownContext = createContext({
    dropdown : false,
    setDropdown : () => {}
});

export const  ToggleDropdownProvider = ({children}) => {
   const [dropdown, setDropdown] = useState(false);
    const value = {dropdown, setDropdown};

    return <ToggleDropdownContext.Provider value={value}>{children}</ToggleDropdownContext.Provider>
}