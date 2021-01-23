import "./App.css";
import React from "react";
import Chapters from "./Chapters";

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Chapters />
				</header>
			</div>
		);
	}
}

export default App;
