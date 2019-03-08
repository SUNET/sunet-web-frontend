import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import ContactMenu from "../components/ContactMenu.js";
import { Config } from "../config.js";

class Kontakten extends Component {
	
	static async getInitialProps(context) {
		let { slug, apiRoute } = context.query;
		
		let kontaktRes = await fetch(
			`${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`
		);
		let kontakt = await kontaktRes.json();

		return { kontakt };
	}

	render() {

		if (!this.props.kontakt.title) return <Error statusCode={404} />;

		return (
			<Layout {...this.props}>

				<div className="container-fluid">
					<div className="row single m-80">
						<aside className="sidebar col-lg-3">
							<div className="service">
								<ContactMenu menu={this.props.contactNav} />
							</div>
						</aside>
						<article className="col-lg-7">
							<h1>{this.props.kontakt.title.rendered}</h1>
							<div dangerouslySetInnerHTML={ {__html: this.props.kontakt.content.rendered} } />
						</article>
					</div>
				</div>

			</Layout>
		);
	}
}

export default PageWrapper(Kontakten);
