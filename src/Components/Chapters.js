import axios from "axios";
import React from "react";
import "./Chapters.css";
import Input from "./Input";
import Pages from "./Pages";

class Chapters extends React.Component {
	constructor(props) {
		super(props);
		// Bind
		this.handleSubmit = this.handleSubmit.bind(this);
		// States
		this.state = {
			// From Input
			mangaID: [],
			// From Chapters
			chapterList: [],
			// From Pages
			chapterID: [],
			title: [],
			chapterNum: [],
			images: [],
		};
	}
	handleSubmit = async (mangaID) => {
		const data = await this.getChapterList(mangaID);
		this.setState({
			mangaID: mangaID,
			chapterList: data,
			chapterID: data.id,
		});
	};
	getChapterList = async (mangaID) => {
		// Get list of chapter
		const response = await axios.get(
			"https://cors-anywhere.herokuapp.com/" +
				`https://mangadex.org/api/v2/manga/${mangaID}/chapters`
		);
		// Store list of chapters and filter for english
		const chapterData = response.data.data.chapters;
		const chapterList = chapterData.filter(
			(chapter) => chapter.language === "gb"
		);
		return chapterList;
	};

	render() {
		return (
			<div>
				<Input handleSubmit={this.handleSubmit} />

				<Pages chapterList={this.state.chapterList} />
			</div>
		);
	}
}
export default Chapters;
