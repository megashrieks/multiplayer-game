import React, { createContext,useState,useEffect } from 'react';
import io from "socket.io-client";
let Context = createContext();
let socket = io.connect("http://localhost:8080");
let Provider = ({ children }) => {


    let endState = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    for (let i = 0; i < endState.length; ++i){
        for (let j = 0; j < endState[i].length; ++j) endState[i][j] -= 1;
    }
    let [name, changeName] = useState("");
    let [channelCode, changeChannelCode] = useState("");
    let [turn, changeTurn] = useState(0);
    let [sign, changeSign] = useState(0);
    let [gameEnded, changeGE] = useState({end:-1,captured:[-1,-1,-1]});
    let [board, changeBoard] = useState([[,,],[,,],[,,]]);



    useEffect(() => {
        if(channelCode != "")
            socket.emit("create", {
                channelCode, name
            });
    },[name,channelCode])


    socket.on("info", info => {
        changeBoard(info.board);
        changeSign(info.sign);
        changeTurn(info.turn);
    });
    socket.on("change", info => {
        let value = info.board;
        let flag = -1;
        let i;
        for (i = 0; i < endState.length; ++i) {
            let a = value[~~(endState[i][0] / 3)][endState[i][0] % 3];
            let b = value[~~(endState[i][1] / 3)][endState[i][1] % 3];
            let c = value[~~(endState[i][2] / 3)][endState[i][2] % 3];
            if (a != -1 && a == b && b == c) { flag = a; break; }
        }
        changeBoard(info.board);
        if(flag != -1)
            changeGE({end:flag,captured:endState[i]});
        changeTurn(info.turn);
    })




    let makeMove = value => {
        if (gameEnded.end != -1) return;
        let flag = -1;
        let i;
        for (i = 0; i < endState.length ; ++i) {
            let a = value[~~(endState[i][0] / 3)][endState[i][0] % 3];
            let b = value[~~(endState[i][1] / 3)][endState[i][1] % 3];
            let c = value[~~(endState[i][2] / 3)][endState[i][2] % 3];
            if (a != -1 && a == b && b == c) { flag = a; break; }
        }
        socket.emit("move", {
            board:value
        });
        if (flag != -1) {
            changeGE({ end: flag, captured: endState[i] });
        }
        changeTurn(turn==0?1:0);
        changeBoard(value);
    }
    return <Context.Provider value={{
        name, changeName,
        board, changeBoard:makeMove,
        turn, sign,
        channelCode, changeChannelCode,
        gameEnded
    }}>
        {children}
    </Context.Provider>
}
export {Provider as PlayerProvider, Context}