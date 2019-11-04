import React, { createContext,useState } from 'react';

let Context = createContext();

let Provider = ({ children }) => {
    let endState = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    for (let i = 0; i < endState.length; ++i){
        for (let j = 0; j < endState[i].length; ++j) endState[i][j] -= 1;
    }
    let [name, changeName] = useState("");
    let [turn, changeTurn] = useState(0);
    let [sign, changeSign] = useState(0);
    let [gameEnded, changeGE] = useState(false);
    let [board, changeBoard] = useState([[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]);
    let makeMove = value => {
        if (gameEnded) return;
        let flag = false;
        for (let i = 0; i < endState.length; ++i) {
            console.log(value,value[~~(endState[i][0]/3)][endState[i][0]%3])
            let a = value[~~(endState[i][0] / 3)][endState[i][0] % 3];
            let b = value[~~(endState[i][1] / 3)][endState[i][1] % 3];
            let c = value[~~(endState[i][2] / 3)][endState[i][2] % 3];
            if (a != -1 && a == b && b == c)
            { flag = true; break; }
        }
        changeGE(flag);
        changeTurn(turn==0?1:0);
        changeBoard(value);
    }
    return <Context.Provider value={{
        name, changeName,
        board, changeBoard:makeMove,
        turn,sign
    }}>
        {children}
    </Context.Provider>
}
export {Provider as PlayerProvider, Context}