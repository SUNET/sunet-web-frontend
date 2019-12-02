import Layout from "../components/Layout.js";
import React, {Component} from "react";
import Error from "next/error";
import fetch from 'isomorphic-unfetch';
import config from '../config.js'
import PageWrapper from "../components/PageWrapper.js";
import AllTjansterList from "../components/AllTjansterList.js";
import { getTjanster, getCategories } from "../src/utils/index.js";

class Tjanster extends Component {
	static async getInitialProps(context) {
		const { lang, category, slug } = context.query;

		const tjanster = await getTjanster(lang);
		const categories = await getCategories();

		return { 
			error: !tjanster && !categories,
			category,
			tjanster,
			categories,
			slug,
			lang,
		}
	}

	getPage = (slug, lang) => {
		return this.props.pages.find(page => page.slug === slug && (!lang || page.lang === lang));
	}

	render () {
		const {error, category, slug, lang} = this.props;
		const tjansterPage = this.getPage(slug, lang);
		if(error) return <Error code="404" />
		return (
			<Layout {...this.props}>
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 hero">
							<div dangerouslySetInnerHTML={ {__html: tjansterPage.acf.segment_top} } />
						</div>
					</div>
				</div>
				<AllTjansterList tjanster={this.props.tjanster} category={category} categories={this.props.categories} />
			</Layout>
		);
	}
}

export default PageWrapper(Tjanster);
