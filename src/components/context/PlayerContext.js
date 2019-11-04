import React, { createContext,useState } from 'react';

let Context = createContext();

let Provider = ({ children }) => {
    let [name, changeName] = useState("");
    return <Context.Provider value={{
        name,changeName
    }}>
        {children}

    </Context.Provider>
}
export {Provider as PlayerProvider, Context}