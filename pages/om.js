import Layout from "../components/Layout.js";
import React, { Component } from "react";
import PageWrapper from "../components/PageWrapper.js";
import SideBarMenu from "../components/SideBarMenu.js";
import pages from '../json/pages.json';
import omList from '../json/om.json';
import { getPageBySlug } from '../src/utils';

class Om extends Component {
	
	static async getInitialProps(context) {
		let { slug } = context.query;

		// If no slug is specified, return the default om-sunet page
		if (!slug) return { omPage: getPageBySlug(pages, 'om') };

		return { omPage: getPageBySlug(omList, slug) };
	}

	render() {
		const { omPage } = this.props;

		return (
			<Layout {...this.props}>

				<div className="container-fluid">
					<div className="row single m-80">
						<aside className="sidebar col-lg-3">
							<div className="service">
								<SideBarMenu menu={this.props.aboutNav} appendToUrl="sunet" />
							</div>
						</aside>
						<article className="col-lg-7">
							<h1>{omPage.title.rendered}</h1>
							<div dangerouslySetInnerHTML={ {__html: omPage.content.rendered} } />
						</article>
					</div>
				</div>

			</Layout>
		);
	}
}

export default PageWrapper(Om);
