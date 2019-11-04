import React, { useContext,useEffect } from 'react';
import { Context } from '../context/PlayerContext';
import './index.css';
export default props => {
    let PlayerContext = useContext(Context);
    useEffect(() => {
        PlayerContext.changeChannelCode(props.match.params.id);
        //PlayerContext.changeName("anonymous-"+(~~(Math.random()*10000)));
    },[PlayerContext.channelCode])
    let play = (row, col) => {
        if (PlayerContext.turn != PlayerContext.sign) return;
        if (PlayerContext.board[row][col] != -1) return;
        let board = [...PlayerContext.board];
        board[row][col] = PlayerContext.turn;
        PlayerContext.changeBoard(board);
    }
    let won = false;
    if (PlayerContext.gameEnded.end != -1)
    won = PlayerContext.gameEnded.end == PlayerContext.sign;
    let cellIndex = 0;
    let BoardComponent = PlayerContext.board.map((element, index) => {
        return <div className = {"row"+(won?" won":"")} key={index}>
            {element.map((cell,_) => {
                let character = "";
                let color = "black";
                if (cell == 0) { character = 'X';color="blue" }
                else if (cell == 1) character = 'O';
                return <div className={"cell " + color +
                    ((cell != -1 || PlayerContext.turn != PlayerContext.sign) ? " disabled" : "") +
                    (PlayerContext.gameEnded.captured.indexOf(cellIndex++) != -1 &&
                        PlayerContext.gameEnded.end != -1 ? " captured" : "")}
                    key={_} onClick={() => { play(index, _) }}>
                   {character}
               </div>
           })}
       </div> 
    });

    return <div className="centered">{BoardComponent}</div>
}