import React,{useState, useContext,useEffect} from 'react';
import './index.css'
import { Context } from '../context/PlayerContext';

export default props => {
    let player = useInput("");
    let code = useInput("");
    let playerContext = useContext(Context);
    let channelCode = code.value;
    let join = () => {
        if (!code.value)
            channelCode = ~~(Math.random() * 1000);
    }
    useEffect(() => {
        if(player.value && channelCode)
            props.history.push("/ttt/" + channelCode);
    },[playerContext.name])
    return <div className="centered">
        <div className="input">
            <label>
                <div className="label">player name</div>
                <input {...player}/>
            </label>
        </div>
        <div className="input">
            <label>
                <div className="label">code</div>
                <input {...code} />
            </label>
        </div>
        <button className = "btn off" onClick={join}>Join Game</button>
    </div>
}

let useInput = default_val => {
    let [value, changeVal] = useState(default_val);
    let onChange = ({ target: { value } }) => changeVal(value);
    return {
        value,onChange
    }
}