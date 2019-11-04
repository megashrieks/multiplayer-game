import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import DashBoard from "./components/DashBoard";
import TicTacToe from "./components/TicTacToe"
import Bingo from "./components/Bingo"
import { PlayerProvider } from './components/context/PlayerContext';
function App() {
  	return (
			<div className="App">
				<PlayerProvider>
					<Router>
						<Switch>
							<Route path="/ttt/:id" component={TicTacToe}></Route>	
							<Route path="/bingo/:id" component={Bingo}></Route>
							<Route path="/" component={DashBoard}></Route>
						</Switch>
					</Router>
				</PlayerProvider>
		</div>
	);
}

export default App;
