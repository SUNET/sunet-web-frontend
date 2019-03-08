import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import AllTjansterList from "../components/AllTjansterList.js";
import { Config } from "../config.js";

class Tjanster extends Component {

	static async getInitialProps(context) {
		
		const pageRes = await fetch(
			`${Config.apiUrl}/wp-json/postlight/v1/page?slug=tjanster`
		);
		const page = await pageRes.json();

		const tjansterRes = await fetch(
			`${Config.apiUrl}/wp-json/wp/v2/tjanster?_embed`
		);
		const tjanster = await tjansterRes.json();
		
		return { page, tjanster };
		
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

				<AllTjansterList />

			</Layout>
		);
	}
}

export default PageWrapper(Tjanster);
