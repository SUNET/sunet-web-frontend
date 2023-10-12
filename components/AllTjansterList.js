import React, { Component } from 'react';
import withLocale from './withLocale';
import ListToggle from "./filter/ListToggle.js";
import TjanstLink from './TjanstLink.js';
import postTypes from '../post-types.json';

class AllTjansterList extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			gridID: 1,
			category: props.category,
		};
	}

	static async getInitialProps(context) {

	}

	getSlug = () => {
		const slug = postTypes.find(item => item.name === "tjanster").routes[this.props.locale.lang]
		return `/${this.props.locale.slug}${slug}`;
	}

	changeGrid = gridID => {
		this.setState({ gridID })
	};

	changeCategory = (event, category) => {
		event.preventDefault()
		if (category && category !== this.state.category) 
			history.pushState(null, '', `${this.getSlug()}/${category}`)
		else history.pushState(null, '', this.getSlug())
		
		this.setState({category})
	}

	

	renderTjanster() {
		const currentCategory = this.props.categories.find(item => item.slug === this.state.category);
		return this.props.tjanster
			.filter(tjanst => tjanst.lang === this.props.locale.lang && (!this.state.category || tjanst.categories.indexOf(currentCategory.id) !== -1))
			.map(tjanst => {
				
				return <TjanstLink
					tjanst={tjanst}
					category={this.props.categories.find(item => item.id === tjanst.categories[0])}
					key={tjanst.slug}
				/>
			
		});
	}

	renderCategories() {
		return this.props.categories.filter(category => category.lang === this.props.locale.lang).map(category => {
		    if (category.count === 0) return;
		    if (category.id === 1) return;

			return (
				<a 
					className={`${category.slug} ${category.slug === this.state.category ? 'active' : null}`} 
					key={category.id} href={`${this.getSlug()}/${category.slug}`} 
					onClick={event => this.changeCategory(event, category.slug)}>
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
								<a href={this.getSlug()} 
									className={`all ${!this.state.category ? 'active': ''}`} 
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

export default withLocale(AllTjansterList);
