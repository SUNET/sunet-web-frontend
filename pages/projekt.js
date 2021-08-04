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
		const { lang, category, slug } = context.query;

		const projekt = await getProjekt(lang);
		const categories = await getCategories();

	    var hascaterror = false;
	    
	    if (category) {
		var curCategory = categories.find(item => item.slug === category);
		if (!curCategory) hascaterror = true;
	    }

            if (!projekt || !categories || hascaterror ) context.res.statusCode = 404;

		return { 
			error: !projekt || !categories || hascaterror,
			category,
			projekt,
			categories,
			slug,
			lang,
			title: "Projekt",
		}
	}

	getPage = (slug, lang) => {
		return this.props.pages.find(page => page.slug === slug && (!lang || page.lang === lang));
	}

	render () {
		const {error, category, slug, lang} = this.props;
		const projektPage = this.getPage(slug, lang);
	        if(error || !projektPage) return <Error statusCode={404} />;

		return (
			<Layout {...this.props}>
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 hero">
							<div dangerouslySetInnerHTML={ {__html: projektPage.acf.segment_top} } />
						</div>
					</div>
				</div>
				<AllProjektList projekt={this.props.projekt} category={category} categories={this.props.categories} />
			</Layout>
		);
	}
}

export default PageWrapper(Projekt);
