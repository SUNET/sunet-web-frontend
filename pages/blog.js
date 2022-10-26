import React, {Component} from 'react';
import Layout from "../components/Layout.js";
import PageWrapper from "../components/PageWrapper.js";
import AllNewsList from "../components/AllNewsList.js";
import fetch from 'isomorphic-unfetch';
import config from '../config.js'
import {getBlogPosts} from '../src/utils'


class Blog extends Component {
	static async getInitialProps(context) {
		const { lang, slug } = context.query;

		const res = await fetch(`${config.apiUrl}pages.json`);
        const pages = await res.json();
		const page = pages.find(page => page.slug === slug && (!lang || page.lang === lang));
		const news = await getBlogPosts(lang)

		return { 
			page,
			error: !page,
			news,
			title: lang === 'sv' && 'Blogg' || 'Blog',
		}
	}

	render () {
		const {page} = this.props;
		return (
			<Layout {...this.props}>
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 hero">
							<div dangerouslySetInnerHTML={ {__html: page.acf.segment_top} } />
						</div>
					</div>
				</div>
				<div className="bg-grey">
					<div className="container listing">
						<AllNewsList news={this.props.news} />
					</div>
				</div>
				
			</Layout>
		);
	}
	
}

export default PageWrapper(Blog);

