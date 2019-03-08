import React, { Component } from "react";
import Layout from "../components/Layout.js";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper.js";
import { Config } from "../config.js";
import TjansterList from "../components/TjansterList.js";

class Index extends Component {
	static async getInitialProps(context) {
		
		const pageRes = await fetch(
			`${Config.apiUrl}/wp-json/postlight/v1/page?slug=landingpage`
		);
		const page = await pageRes.json();
				
		const postsRes = await fetch(
			`${Config.apiUrl}/wp-json/wp/v2/posts?_embed`
		);
		const posts = await postsRes.json();
				
		const moviesRes = await fetch(
			`${Config.apiUrl}/wp-json/wp/v2/movies?_embed`
		);
		const movies = await moviesRes.json();

		const tjansterRes = await fetch(
			`${Config.apiUrl}/wp-json/wp/v2/tjanster?_embed`
		);
		const tjanster = await tjansterRes.json();
				
		const pagesRes = await fetch(
			`${Config.apiUrl}/wp-json/wp/v2/pages?_embed`
		);
		const pages = await pagesRes.json();
		
		return { page, posts, movies, pages, tjanster };
		
	}

	getSlug(url) {
		const parts = url.split('/');
		return parts.length > 2 ? parts[parts.length - 2] : '';
  }

	render() {
		const { tjanster, movies } = this.props;

		const slug = this.getSlug(this.props.page.acf.segment_bottom.link.url);

		return (
			<Layout {...this.props}>

				<div className="container-fluid">
					<div className="row justify-content-center">
						<div className="col-lg-7 hero">
							<div dangerouslySetInnerHTML={ {__html: this.props.page.acf.segment_top} } />
						</div>
					</div>
				</div>
				<TjansterList />

				<div className="container">
					<div className="row info">
    				<div className="col-4">
      				<h1>{this.props.page.acf.segment_bottom.header}</h1>
      				<p>{this.props.page.acf.segment_bottom.text}</p>
      				<a href={slug} className="btn-more">{this.props.page.acf.segment_bottom.link.name}</a>
    				</div>
    				<div className="col-8">
      				<img src={this.props.page.acf.segment_bottom.img} />
   					</div>
  				</div>
				</div>

			</Layout>
		);
	}
}

export default PageWrapper(Index);
