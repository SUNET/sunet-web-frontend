import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import { Config } from "../config.js";

class Tjanst extends Component {
	
	static async getInitialProps(context) {
		let { slug, apiRoute } = context.query;
		
		let tjansterRes = await fetch(
			`${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`
		);
		let tjanster = await tjansterRes.json();

		let personId = -1;
		if (typeof tjanster.acf.person[0] !== 'undefined'
			&& tjanster.hasOwnProperty('acf')
			&& tjanster.acf.hasOwnProperty('person')
			&& tjanster.acf.person.length > 0
			&& tjanster.acf.person[0].hasOwnProperty('ID')
			&& !isNaN(tjanster.acf.person[0].ID)){
				personId = tjanster.acf.person[0].ID;
		}
		
		let personRes = await fetch(
    	`${Config.apiUrl}/wp-json/wp/v2/person/${personId}`
		);
		let person = await personRes.json();

		return { tjanster, person };
	}

	render() {

		if (!this.props.tjanster.title) return <Error statusCode={404} />;

		let personSide;
		if (this.props.tjanster.acf.person[0]) {
			personSide = (
				<div className="meta-contact">
					<img src={this.props.person.acf.image} alt={'bild på' + this.props.person.acf.title.rendered} />
					<h2>{this.props.person.title.rendered}</h2>
					<span className="meta-contact--title">{this.props.person.acf.title}</span>
					<a className="meta-contact--mail" href={'mailto:' + this.props.person.acf.email}>{this.props.person.acf.email}</a>
					<span className="meta-contact--phone">{this.props.person.acf.phone}</span>
				</div>
			)
		}

		let relatedLink;
		if (this.props.tjanster.acf.links) {
			relatedLink = (
				<div className="container-fluid related-segment bg-orange">
					<div className="row justify-content-center">	
						<div className="col-lg-7">
							<h2>Relaterade länkar</h2>
							<ul>
								{this.props.tjanster.acf.links.map((item, index) => (
									<li key={index}>{item.name}: <a href={'http://' + item.url}>{item.url}</a></li>
								))}
							</ul>
		    		</div>
					</div>
				</div>
			)
		}

		let metaWiki;
		if (this.props.tjanster.acf.segment_support) {
			metaWiki = (
				<div className="meta-wiki">
					<h2>Support, teknisk dokumentation, wiki</h2>
					<div dangerouslySetInnerHTML={ {__html: this.props.tjanster.acf.segment_support} } />
				</div>
			)
		}

		let metaPrice;
		if (this.props.tjanster.acf.segment_price) {
			metaPrice = (
				<div className="meta-price">
					<h2>Pris</h2>
					<div dangerouslySetInnerHTML={ {__html: this.props.tjanster.acf.segment_price} } />
				</div>
			)
		}

		return (
			<Layout {...this.props}>

				<div className="container-fluid">
					<div className="row single m-80">

						<aside className="sidebar col-lg-3">
							<div className="service">
								{personSide}
								{metaWiki}
								{metaPrice}
							</div>
						</aside>
						
						<article className="col-lg-7">
							<h1>{this.props.tjanster.title.rendered}</h1>
							<p className="intro-1">{this.props.tjanster.acf.intro}</p>
							<div dangerouslySetInnerHTML={ {__html: this.props.tjanster.acf.content} } />
						</article>

					</div>
				</div>

				{relatedLink}

			</Layout>
		);
	}
}

export default PageWrapper(Tjanst);
