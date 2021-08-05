import Layout from "../components/Layout.js";
import React, { Component } from "react";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import fetch from 'isomorphic-unfetch';
import config from '../config.js'
import { buildSidebarMenu } from '../src/utils/menu-builder';
import SideBarMenu from "../components/SideBarMenu.js";

class NewsItem extends Component {
	
    static async getInitialProps(context) {
	
	const {slug, lang } = context.query
        const res = await fetch(`${config.apiUrl}posts.json`);
        const pages = await res.json();
	const newsitem = pages.find(page => page.slug === slug && (!lang || page.lang === lang));
	
	const title = newsitem ? newsitem.title.rendered : "";

        if (!newsitem) context.res.statusCode = 404;

		return { 
			newsitem,
			error: !newsitem,
			slug, 
			lang,
			title,
		 };
	}

	render() {
		const { newsitem, error, lang } = this.props;
		if (error) return <Error statusCode={404} />;

		return (
			<Layout {...this.props}>

				<div className="container">
					<main aria-labelledby="main-title" className="row single m-80">
				
						<article className="col-lg-8 offset-lg-2">
							<h1 id="main-title">{newsitem.title.rendered}</h1>
							<div dangerouslySetInnerHTML={ {__html: newsitem.content.rendered} } />
						</article>
					</main>
				</div>
				
			</Layout>
		);
	}
}

export default PageWrapper(NewsItem);

