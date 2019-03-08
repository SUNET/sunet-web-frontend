	import React, { Component } from 'react';
	import { Config } from "../config.js";
	import {Grid, List} from "./Icons.js";
	import Link from "next/link";

	class AllEvenemangList extends Component {

		constructor() {
			super();
			this.state = {
				evenemang: []
			};
		}

		componentDidMount() {
			let evenemangURL = `${Config.apiUrl}/wp-json/wp/v2/evenemang/?_embed`
			fetch(evenemangURL)
				.then(res => res.json())
				.then(res => {
					this.setState({
					evenemang: res
				})
			})
		}

		render() {

			let evenemang = this.state.evenemang.map((evenemang, index) => {
				return <div key={index}>{evenemang.title.rendered}</div>
			});

			return (
			
				<div className="bg-grey">
					{evenemang}
				</div>
			
			)
		}	

	}

	export default AllEvenemangList;