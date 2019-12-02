import Layout from "../components/Layout.js";
import React, { Component } from "react";
import Error from "next/error";
import fetch from 'isomorphic-unfetch';
import config from '../config.js'
import PageWrapper from "../components/PageWrapper.js";

class Page extends Component {
    static async getInitialProps(context) {
        const { section, slug, lang } = context.query;
        const res = await fetch(`${config.apiUrl}pages.json`);
        const pages = await res.json();
        const page = pages.find(page => page.slug === slug && (!lang || page.lang === lang));

        return {
            error: !page,
            page, 
            slug, 
            section,
            lang,
        };
    }

    render() {
        const { error, page } = this.props;
        if (error) return <Error statusCode={404} />;

        return (
            <Layout {...this.props}>
				<div className="container">
					<div className="row single m-80">
						<article className="col-lg-8 offset-lg-2">
							<h1>{ page.title && page.title.rendered }</h1>
							<div dangerouslySetInnerHTML={{  __html: page.content && page.content.rendered }} />
						</article>
					</div>
				</div>
			</Layout>
        );
    }
}

export default PageWrapper(Page);
