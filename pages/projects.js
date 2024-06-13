import Layout from "../components/Layout.js";
import React, {Component} from "react";
import Error from "next/error";
import fetch from 'isomorphic-unfetch';
import config from '../config.js'
import PageWrapper from "../components/PageWrapper.js";
import AllProjektList from "../components/AllProjektList.js";
import { getProjekt, getCategories } from "../src/utils/index.js";

class Projekt extends Component {
	static async getInitialProps(context) {
		const { lang, slug } = context.query;

		const projekt = await getProjekt(lang);

            if (!projekt) context.res.statusCode = 404;

		return { 
			error: !projekt,
			projekt,
			slug,
			lang,
			title: "Projekt",
		}
	}

	getPage = (slug, lang) => {
		return this.props.pages.find(page => page.slug === slug && (!lang || page.lang === lang));
	}

	render () {
		const {error, slug, lang} = this.props;
		const projektPage = this.getPage(slug, lang);
	        if(error || !projektPage) return <Error statusCode={404} />;

		return (
			<Layout {...this.props}>
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 hero">
							<div dangerouslySetInnerHTML={ {__html: projektPage.content.rendered} } />
						</div>
					</div>
				</div>
				<AllProjektList projekt={this.props.projekt} />
			</Layout>
		);
	}
}

export default PageWrapper(Projekt);
