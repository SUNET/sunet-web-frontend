import Layout from "../components/Layout.js";
import React, { Component } from "react";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import evenemangList from '../json/evenemang.json';
import { getPageBySlug } from '../src/utils';

class Evenemanget extends Component {
	
	static getInitialProps(context) {
		let { slug } = context.query;
		const evenemang = getPageBySlug(evenemangList, slug);
		return { evenemang };
	}

	render() {
		const { evenemang } = this.props;
		if (!evenemang.title) return <Error statusCode={404} />;

		return (
			<Layout {...this.props}>

				<div className="container-fluid">
					<div className="row single m-80">
						<article className="col-lg-7 offset-lg-3">
							<h1>{evenemang.title.rendered}</h1>
							<div dangerouslySetInnerHTML={ {__html: evenemang.content.rendered} } />
						</article>
					</div>
				</div>

			</Layout>
		);
	}
}

export default PageWrapper(Evenemanget);
