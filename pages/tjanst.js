import Layout from "../components/Layout.js";
import React, { Component } from "react";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import TjanstMeta from "../components/TjanstMeta.js";
import TjanstRelatedLinks from "../components/TjanstRelatedLinks.js";
import { getTjanster, getPersoner } from "../src/utils/index.js";


class Tjanst extends Component {
	
	static async getInitialProps(context) {
		let { slug, lang } = context.query;

        const tjanster = await getTjanster(lang)
		const tjanst = tjanster.find(page => page.slug === slug && page.lang === lang);
		
        const persons = await getPersoner(lang)
        

		let personId = -1;
		if (tjanst && tjanst.acf && typeof tjanst.acf.person[0] !== 'undefined'
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
				<div className="container">
					<div className="row single m-80">

						<aside className="sidebar col-lg-3">
							<TjanstMeta
								tjanst={ tjanst }
								person={ person }
							/>
						</aside>
						
						<main className="col-lg-7"  aria-labelledby="main-title">
							<article>
								<h1 id="main-title">{tjanst.title.rendered}</h1>
								<div dangerouslySetInnerHTML={ {__html: tjanst.acf.content} } />
							</article>
						</main>

					</div>
				</div>

				<TjanstRelatedLinks tjanst={tjanst} />
			</Layout>
		);
	}
}

export default PageWrapper(Tjanst);
