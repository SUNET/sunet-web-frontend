import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import AboutMenu from "../components/AboutMenu.js";
import { Config } from "../config.js";

class Om extends Component {

	static async getInitialProps(context) {
		
		const pageRes = await fetch(
			`${Config.apiUrl}/wp-json/postlight/v1/page?slug=om`
		);
		const page = await pageRes.json();
		
		return { page };
		
	}

	render() {

		return (
			<Layout {...this.props}>

				<div className="container-fluid">
					<div className="row single m-80">
						<aside className="sidebar col-lg-3">
							<div className="service">
								<AboutMenu menu={this.props.aboutNav} />
							</div>
						</aside>
						<article className="col-lg-7">
							<h1>{this.props.page.title.rendered}</h1>
							<div dangerouslySetInnerHTML={ {__html: this.props.page.content.rendered} } />
						</article>
					</div>
				</div>

			</Layout>
		);
	}
}

export default PageWrapper(Om);
