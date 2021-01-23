import React from "react";

class Input extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mangaID: [],
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.handleSubmit(this.state.mangaID);
	}
	handleChange(e) {
		this.setState({ mangaID: e.target.value });
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Manga ID:
					<input
						type="text"
						value={this.state.mangaID}
						onChange={this.handleChange}
						placeholder="31477"
					/>
				</label>
				<input type="submit" value="Go" />
			</form>
		);
	}
}
export default Input;
