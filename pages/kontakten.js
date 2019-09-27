import Layout from "../components/Layout.js";
import React, { Component } from "react";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import SideBarMenu from "../components/SideBarMenu.js";
import kontaktList from '../json/kontakt.json';
import { getPageBySlug } from '../src/utils';

class Kontakten extends Component {
	
	static getInitialProps(context) {
		let { slug } = context.query;
		let kontakt = getPageBySlug(kontaktList, slug);
		return { kontakt };
	}

	render() {
		const { kontakt } = this.props;
		if (!kontakt.title) return <Error statusCode={404} />;

		return (
			<Layout {...this.props}>

				<div className="container-fluid">
					<div className="row single m-80">
						<aside className="sidebar col-lg-3">
							<div className="service">
								<SideBarMenu menu={this.props.contactNav} />
							</div>
						</aside>
						<article className="col-lg-7">
							<h1>{kontakt.title.rendered}</h1>
							<div dangerouslySetInnerHTML={ {__html: kontakt.content.rendered} } />
						</article>
					</div>
				</div>

			</Layout>
		);
	}
}

export default PageWrapper(Kontakten);
