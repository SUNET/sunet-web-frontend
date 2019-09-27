import Layout from "../components/Layout.js";
import React, { Component } from "react";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import TjanstMeta from "../components/TjanstMeta.js";
import TjanstRelatedLinks from "../components/TjanstRelatedLinks.js";
import tjanster from "../json/tjanster.json";
import persons from "../json/person.json";
import { getPageBySlug } from '../src/utils';

class Tjanst extends Component {
	
	static getInitialProps(context) {
		let { slug } = context.query;
		
		const tjanst = getPageBySlug(tjanster, slug);

		let personId = -1;
		if (typeof tjanst.acf.person[0] !== 'undefined'
			&& tjanst.hasOwnProperty('acf')
			&& tjanst.acf.hasOwnProperty('person')
			&& tjanst.acf.person.length > 0
			&& tjanst.acf.person[0].hasOwnProperty('ID')
			&& !isNaN(tjanst.acf.person[0].ID)){
				personId = tjanst.acf.person[0].ID;
		}
		
		let person = persons.find(person => person.id === personId);

		return { tjanst, person };
	}

	render() {
		const { tjanst, person } = this.props;
		if (!tjanst.title) return <Error statusCode={404} />;

		return (
			<Layout {...this.props}>
				<div className="container-fluid">
					<div className="row single m-80">

						<aside className="sidebar col-lg-3">
							<TjanstMeta
								tjanst={ tjanst }
								person={ person }
							/>
						</aside>
						
						<article className="col-lg-7">
							<h1>{tjanst.title.rendered}</h1>
							<p className="intro-1">{tjanst.acf.intro}</p>
							<div dangerouslySetInnerHTML={ {__html: tjanst.acf.content} } />
						</article>

					</div>
				</div>

				<TjanstRelatedLinks tjanst={tjanst} />
			</Layout>
		);
	}
}

export default PageWrapper(Tjanst);
