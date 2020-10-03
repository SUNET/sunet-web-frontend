import Layout from "../components/Layout.js";
import React, { Component } from "react";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import SideBarMenu from "../components/SideBarMenu.js";
import MetaPerson from "../components/TjanstMetaPerson";
import { buildSidebarMenu } from '../src/utils/menu-builder';
import {getPersoner} from '../src/utils';

class Person extends Component {
	
	static async getInitialProps(context) {
		let { slug, section, lang, subsection } = context.query;

		const personer = await getPersoner(lang)
		const person = personer.find(page => page.slug === slug && (!lang || page.lang === lang));
		const title = person.title.rendered

		return {
            error: !person, 
            person,
            subsection,
            section,
            slug,
			lang,
			title,
        };
	}

	render() {
		const { error, person, sidebar } = this.props;
		if (error) return <Error statusCode={404} />;

		return (
			<Layout {...this.props}>

				<div className="container-fluid">
					<div className="row single m-80">
						<aside className="sidebar col-lg-3">
							<div className="service">
                            <SideBarMenu menu={buildSidebarMenu(sidebar)} />
							</div>
						</aside>
						<main className="col-lg-7">
							<article>
								<MetaPerson person={person} />
								<div dangerouslySetInnerHTML={ {__html: person.content && person.content.rendered} } />
							</article>
						</main>
					</div>
				</div>

			</Layout>
		);
	}
}

export default PageWrapper(Person);
