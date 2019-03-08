import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import { Config } from "../config.js";

class Evenemanget extends Component {
	
	static async getInitialProps(context) {
		let { slug, apiRoute } = context.query;
		
		let evenemangRes = await fetch(
			`${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`
		);
		let evenemang = await evenemangRes.json();

		return { evenemang };
	}

	render() {

		if (!this.props.evenemang.title) return <Error statusCode={404} />;

		return (
			<Layout {...this.props}>

				<div className="container-fluid">
					<div className="row single m-80">
						
						<article className="col-lg-7">
							<h1>{this.props.evenemang.title.rendered}</h1>
						</article>

					</div>
				</div>

			</Layout>
		);
	}
}

export default PageWrapper(Evenemanget);
