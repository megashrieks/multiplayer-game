import React, { useState,useEffect,useContext } from 'react';
import { Context } from '../context/PlayerContext';
import './index.css';
export default props => {
    let PlayerContext = useContext(Context);
    let play = (row, col) => {
        if (PlayerContext.turn != PlayerContext.sign) return;
        if (PlayerContext.board[row][col] != -1) return;
        let board = [...PlayerContext.board];
        board[row][col] = PlayerContext.turn;
        PlayerContext.changeBoard(board);
    }
    let BoardComponent = PlayerContext.board.map((element, index) => {
        return <div className = "row" key={index}>
            {element.map((cell,_) => {
                let character = "";
                let color = "black";
                if (cell == 0) { character = 'X';color="blue" }
                else if (cell == 1) character = 'O';
                return <div className={"cell "+color+((cell != -1 || PlayerContext.turn != PlayerContext.sign) ? " disabled":"")} key={_} onClick={()=>{play(index,_)}}>
                   {character}
               </div>
           })}
       </div> 
    });

    return <div className="centered">{BoardComponent}</div>
}