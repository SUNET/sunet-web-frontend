import React, { Component } from 'react';
import { withRouter } from 'next/router'
import ListToggle from "./filter/ListToggle.js";
import TjanstLink from './TjanstLink.js';
import tjanster from '../json/tjanster.json';
import categories from '../json/categories.json';

class AllTjansterList extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			gridID: 1,
			categoryId: parseInt(props.router.query.category)
		};
	}

	changeGrid = gridID => {
		this.setState({ gridID })
	};

	changeCategory = (event, categoryId) => {
		event.preventDefault()
		if (categoryId && categoryId !== this.state.categoryId) 
			history.pushState(null, '', `?kategori=${categoryId}`)
		else history.pushState(null, '', '/tjanster/')
		
		this.setState({categoryId})
	}

	

	renderTjanster() {
		return tjanster.map(tjanst => {
			
			const category = categories.find(category => category.id === tjanst.categories[0]);
			if (!this.state.categoryId 
				|| tjanst.categories.indexOf(this.state.categoryId) !== -1
				|| tjanst.categories === this.state.categoryId) {
				return <TjanstLink
					tjanst={tjanst}
					category={category}
					key={tjanst.slug}
				/>
			} return null;
		});
	}

	renderCategories() {
		return categories.map(category => {
			if (category.count === 0) return;

			return (
				<a 
					className={`${category.slug} ${category.id === this.state.categoryId ? 'active' : null}`} 
					key={category.id} href={`?kategori=${category.id}`} 
					onClick={event => this.changeCategory(event, category.id)}>
					<li>{category.name}</li>
				</a>
			)
		});
	}

	render() {
		return (
			<div className="bg-grey">
				<div className="container listing">
					<div className="row">
						<div className="col filter-container">
							<div className="filter-toggle">
								<a href="/tjanster/" 
									className={`all ${!this.state.categoryId ? 'active': ''}`} 
									onClick={event => this.changeCategory(event, null)}>
										<li>Visa alla</li></a>
								{this.renderCategories()}
							</div>
							<ListToggle
								changeGrid={this.changeGrid}
								gridID={this.state.gridID}
							/>
  			  			</div>
					</div>
					<div className="row">
						<div className={this.state.gridID === 1? "col cards" : "col cards list"}>
							{this.renderTjanster()}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(AllTjansterList);