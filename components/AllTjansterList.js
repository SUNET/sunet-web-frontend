import React, { Component } from 'react';
import { Config } from "../config.js";
import {Grid, List} from "./Icons.js";
import Link from "next/link";
import ListToggle from "./filter/ListToggle.js";
import FilterToggle from "./filter/FilterToggle.js";

class AllTjansterList extends Component {
	
	constructor() {
		super();
		this.state = {
			tjanster: [],
			categories: [],
			gridID: 1,
		};
	}

	changeGrid(gridID){
		this.setState({gridID});
	}

	componentDidMount() {
		let dataURL = `${Config.apiUrl}/wp-json/wp/v2/tjanster/?_embed`
		fetch(dataURL)
			.then(res => res.json())
			.then(res => {
				this.setState({
				tjanster: res
			})
		})
		let catURL = `${Config.apiUrl}/wp-json/wp/v2/categories/?_embed`
		fetch(catURL)
			.then(res => res.json())
			.then(res => {
				this.setState({
				categories: res
			})
		})
	}

	handleClick(e) {
		let gridID = e.target.value;
		this.props.changeGrid();
	}

	render() {

		let tjanster = this.state.tjanster.map((tjanster, index) => {
			if (tjanster._embedded) {
				for (var i = 0; i < tjanster._embedded['wp:term'][0].length; i++) {
					let cat = tjanster._embedded['wp:term'][0][i].name;
					let catSlug = tjanster._embedded['wp:term'][0][i].slug;
					return <Link
						href={`/tjanster/${tjanster.slug}`}
						key={index}
					>
						<div className={ `card ${catSlug}` }>
							<div className="card-tags">
								<span>{cat}</span>
							</div>
							<div className="card-content">
								<div className="header-container"><h2>{tjanster.title.rendered}</h2></div>
								<p className="card-intro">{tjanster.acf.intro}</p>
							</div>
						</div>
					</Link>
				}
			}
		});

		let categories = this.state.categories.map((categories, index) => {
			if (categories.count !== 0) {
				return <a key={index} href="" className={categories.slug}><li>{categories.name}</li></a>
			}
		});

		let catList = this.state.tjanster.map((tjanster, index) => {
			for (var i = 0; i < tjanster._embedded['wp:term'][0].length; i++) {
				let cat = tjanster._embedded['wp:term'][0][i].name;
				let catSlug = tjanster._embedded['wp:term'][0][i].slug;
				return catSlug;
			}
		});

		const catListFilter = catList.filter((val, id, array) => {
			return array.indexOf(val) == id;
		});

		console.log(catListFilter);


		return (
		
			<div className="bg-grey">
				<div className="container listing">
					<div className="row">
						<div className="col filter-container">
							<ul className="filter-toggle">
								<a href="" className="all active"><li>Show All</li></a>
								{categories}
							</ul>
							<ListToggle
								changeGrid={this.changeGrid.bind(this)}
								gridID={this.state.gridID}
							/>
  			  	</div>
					</div>
  				<div className="row">
						<div className={this.state.gridID === 1? "col cards" : "col cards list"}>
							{tjanster}
						</div>
  				</div>
				</div>
			</div>
		
		)
	}
}

export default AllTjansterList;