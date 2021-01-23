import React from "react";
import axios from "axios";
import "./Pages.css";

class Pages extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);

		this.state = {
			chapterID: [],
			title: [],
			chapterNum: [],
			imageUrls: [],
		};
	}
	getImages = async (chapterID) => {
		// Get chapters
		const response = await axios.get(
			"https://cors-anywhere.herokuapp.com/" +
				`https://mangadex.org/api/v2/chapter/${chapterID}`
		);
		// Store data
		const title = response.data.data.title;
		const chapterNum = response.data.data.chapter;
		const hash = response.data.data.hash;
		const imageUrlArray = response.data.data.pages;
		// Create src url
		const imageUrls = imageUrlArray.map(
			(url) => `https://mangadex.org/data/${hash}/${url}`
		);
		// Return
		return {
			title,
			chapterNum,
			imageUrls,
		};
	};
	handleChange(e) {
		this.setState({ chapterID: e.target.value });
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		const data = await this.getImages(this.state.chapterID);
		this.setState({
			title: data.title,
			chapterNum: data.chapterNum,
			imageUrls: data.imageUrls,
		});
	};
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<select value={this.state.chapterID} onChange={this.handleChange}>
						<option></option>
						{this.props.chapterList.map((el, i) => (
							<option key={i} value={el.id}>
								{el.chapter}
							</option>
						))}
					</select>
					<input type="submit" value="Go"></input>
				</form>
				<h1>
					{this.state.title} {this.state.chapterNum}
				</h1>
				{this.state.imageUrls.map((el, i) => {
					return <img key={i} src={el} alt=""></img>;
				})}
			</div>
		);
	}
}

export default Pages;
