import Layout from "../components/Layout.js";
import React, { Component } from "react";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import ProjektMeta from "../components/ProjektMeta.js";
import ProjektRelatedLinks from "../components/ProjektRelatedLinks.js";
import { getProjekt, getPersoner } from "../src/utils/index.js";


class Projekt extends Component {
	
	static async getInitialProps(context) {
		let { slug, lang } = context.query;

        const projekt = await getProjekt(lang)
		const proj = projekt.find(page => page.slug === slug && page.lang === lang);
		
	    const title = proj ? proj.title.rendered : "";

            if (!proj) context.res.statusCode = 404;

	    const persons = await getPersoner(lang)
	        

		let personId = -1;
		if (proj && proj.acf && typeof proj.acf.person[0] !== 'undefined'
			&& proj.hasOwnProperty('acf')
			&& proj.acf.hasOwnProperty('person')
			&& proj.acf.person.length > 0
			&& proj.acf.person[0].hasOwnProperty('ID')
			&& !isNaN(proj.acf.person[0].ID)){
				personId = proj.acf.person[0].ID;
		}
		
		let person = persons.find(person => person.id === personId);

		return { proj, person, title };
	}

	render() {
		const { proj, person } = this.props;
		if (!proj) return <Error statusCode={404} />;

		return (
			<Layout {...this.props}>
				<div className="container">
					<div className="row single m-80">

						<aside className="sidebar col-lg-3">
							<ProjektMeta
								projekt={ proj }
								person={ person }
							/>
						</aside>
						
						<main className="col-lg-7"  aria-labelledby="main-title">
							<article>
								<h1 id="main-title">{proj.title.rendered}</h1>
								<div dangerouslySetInnerHTML={ {__html: proj.acf.content} } />
							</article>
						</main>

					</div>
				</div>

				<ProjektRelatedLinks projekt={proj} />
			</Layout>
		);
	}
}

export default PageWrapper(Projekt);
