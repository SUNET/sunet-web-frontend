import React, { Component } from 'react';
import withLocale from './withLocale';
import ListToggle from "./filter/ListToggle.js";
import ProjektLink from './ProjektLink.js';
import postTypes from '../post-types.json';

class AllProjektList extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			gridID: 2,
		};
	}

	static async getInitialProps(context) {

	}

	getSlug = () => {
		const slug = postTypes.find(item => item.name === "projekt").routes[this.props.locale.lang]
		return `/${this.props.locale.slug}${slug}`;
	}

	changeGrid = gridID => {
		this.setState({ gridID })
	};

	renderProjekt() {
		return this.props.projekt
			.filter(proj => proj.lang === this.props.locale.lang)
			.map(proj => {

		let personId = -1;
		if (proj && proj.acf && typeof proj.acf.person[0] !== 'undefined'
			&& proj.hasOwnProperty('acf')
			&& proj.acf.hasOwnProperty('person')
			&& proj.acf.person.length > 0
			&& proj.acf.person[0].hasOwnProperty('ID')
			&& !isNaN(proj.acf.person[0].ID)){
				personId = proj.acf.person[0].ID;
		}
		
        let personName = "SUNET";
        if (personId !== -1) {
		let person = this.props.persons.find(person => person.id === personId);
          personName = person.title.rendered;
        }
				
				return <ProjektLink
					proj={proj}
					key={proj.slug}
          personName={personName}
				/>
			
		});
	}

	render() {
		return (
			<div className="bg-grey">
				<div className="container listing">
					<div className="row">
						<div className="col filter-container projekt-grid-toggle">
							<ListToggle
								changeGrid={this.changeGrid}
								gridID={this.state.gridID}
							/>
  			  	</div>
					</div>
					<div className="row">
						<div className={this.state.gridID === 1? "col cards" : "col cards list"}>
							{this.renderProjekt()}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withLocale(AllProjektList);
