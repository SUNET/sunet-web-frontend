import React, { Component } from 'react';
import { Config } from "../config.js";
import {Grid, List} from "./Icons.js";
import Link from "next/link";

class TjansterList extends Component {
	constructor() {
		super();
		this.state = {
			tjanster: []
		};
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
	}


	render() {

		let tjanster = this.state.tjanster.map((tjanster, index) => {
			if (tjanster._embedded) {
				for (var i = 0; i < tjanster._embedded['wp:term'][0].length; i++) {
					let cat = tjanster._embedded['wp:term'][0][i].name;
					let catSlug = tjanster._embedded['wp:term'][0][i].slug;
					if (tjanster.acf.sticky === 'Ja') {
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
			}
		});

		return (
		
			<div className="bg-grey">
				<div className="container listing">
  				<div className="row">
						<div className="col cards">
							{tjanster}
						</div>
  				</div>
  				<div className="row">
						<div className="col">
							<div className="btn-load-container">
								<a href="/tjanster" className="btn-load">Till alla tjänster</a>
							</div>
						</div>
  				</div>
				</div>
			</div>
		
		)
	}
}

export default TjansterList;