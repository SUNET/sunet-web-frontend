import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import AllEvenemangList from "../components/AllEvenemangList.js";
import { Config } from "../config.js";

class Evenemang extends Component {

	static async getInitialProps(context) {
		
		const pageRes = await fetch(
			`${Config.apiUrl}/wp-json/postlight/v1/page?slug=evenemang`
		);
		const page = await pageRes.json();

		const evenemangRes = await fetch(
			`${Config.apiUrl}/wp-json/wp/v2/evenemang?_embed`
		);
		const evenemang = await evenemangRes.json();
		
		return { page, evenemang };
		
	}

	render() {

		return (
			<Layout {...this.props}>

				<div className="container-fluid">
					<div className="row justify-content-center">
						<div className="col-lg-7 hero">
							<div dangerouslySetInnerHTML={ {__html: this.props.page.acf.segment_top} } />
						</div>
					</div>
				</div>

				<AllEvenemangList />

			</Layout>
		);
	}
}

export default PageWrapper(Evenemang);
