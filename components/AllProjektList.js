import React, { Component } from 'react';
import withLocale from './withLocale';
import ListToggle from "./filter/ListToggle.js";
import ProjektLink from './ProjektLink.js';
import postTypes from '../post-types.json';

class AllProjektList extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			gridID: 1,
		};
	}

	static async getInitialProps(context) {

	}

	getSlug = () => {
		const slug = postTypes.find(item => item.name === "projekt").routes[this.props.locale.lang]
		return `/${this.props.locale.slug}${slug}`;
	}

	

	renderProjekt() {
		return this.props.projekt
			.filter(proj => proj.lang === this.props.locale.lang)
			.map(proj => {
				
				return <ProjektLink
					projekt={proj}
					key={proj.slug}
				/>
			
		});
	}

	render() {
		return (
			<div className="bg-grey">
				<div className="container listing">
					<div className="row">
						<div className="col cards list">
							{this.renderProjekt()}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withLocale(AllProjektList);