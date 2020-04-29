import React, { Component } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout.js';
import PageWrapper from '../components/PageWrapper.js';
import fetch from 'isomorphic-unfetch';
import config from '../config.js'
import { getPersoner } from '../src/utils/index.js';


function compareName(a, b) {
    
    var nameA = a.title.rendered;
    var nameB = b.title.rendered;
    
    if (nameA < nameB) {
	return -1;
    }
    if (nameA > nameB) {
	return 1;
    }
    
    return 0;
}


class Personer extends Component {
	static async getInitialProps(context) {
		const { lang, slug, section } = context.query;
		const res = await fetch(`${config.apiUrl}pages.json`);
                const pages = await res.json();
		const page = pages.find(page => page.slug === slug && (!lang || page.lang === lang));
	    const personer = await getPersoner(lang);
		
		return {
			slug,
			error: !page,
			section,
			page,
			path: context.asPath,
			personer,
		};
	}

	render() {
		const { page, error, path } = this.props;
		return (
			<Layout {...this.props}>
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 hero">
							<h1>{page.title && page.title.rendered}</h1>
							<div dangerouslySetInnerHTML={{ __html: page.acf.segment_top }} />
						</div>
					</div>
				</div>
				<div className="bg-grey">
					<div className="container listing">
						<div className="row">
							<div className="col-12 cards list persons">
			{this.props.personer.sort(compareName).filter((person) => person.acf).map((person) => {
									return (
											<div className="card">
												<div className="card-tags">
													<span>
														<a href={`tel:${person.acf.phone}`}>{person.acf.phone}</a>
													</span>
													<span>
														<a href={`mailto:${person.acf.email}`}>{person.acf.email}</a>
													</span>
												</div>
												<div className="card-content">
													<div className="header-container">
														<h3>{person.title && person.title.rendered}</h3>
													</div>
													<p className="card-intro">{person.acf.title}</p>
												</div>
											</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}

export default PageWrapper(Personer);
