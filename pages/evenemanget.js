import Layout from "../components/Layout.js";
import React, { Component } from "react";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import fetch from 'isomorphic-unfetch';
import config from '../config.js'
import { buildSidebarMenu } from '../src/utils/menu-builder';
import SideBarMenu from "../components/SideBarMenu.js";

class Evenemanget extends Component {
	
    static async getInitialProps(context) {
	
	const {slug, lang, section, subsection } = context.query
        const res = await fetch(`${config.apiUrl}evenemang.json`);
        const pages = await res.json();
	const evenemang = pages.find(page => page.slug === slug && (!lang || page.lang === lang));
	
	const title = evenemang ? evenemang.title.rendered : "";

        if (!evenemang) context.res.statusCode = 404;

		return { 
			evenemang,
			error: !evenemang,
			slug, 
			section, 
			subsection,
			lang,
			title,
		 };
	}

	render() {
		const { evenemang, error, section, subsection, lang } = this.props;
		if (error) return <Error statusCode={404} />;

		return (
			<Layout {...this.props}>

				<div className="container">
					<main aria-labelledby="main-title" className="row single m-52">
				
						<article className="col-lg-8 offset-lg-2">
							<div className="item-type-heading">{lang === 'en' && "EVENT" || "EVENEMANG"}</div>
							<h1 id="main-title">{evenemang.title.rendered}</h1>
							<div dangerouslySetInnerHTML={ {__html: evenemang.content.rendered} } />
							{ evenemang.acf 
							&& evenemang.acf.url_for_location 
							&& ( 
								<div>
									<a href={evenemang.acf.url_for_location} className="location-link">Hitta hit</a>
								</div>
							)}
						</article>
					</main>
				</div>
				
			</Layout>
		);
	}
}

export default PageWrapper(Evenemanget);
