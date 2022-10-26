import React, {Component} from 'react';
import Layout from "../components/Layout.js";
import PageWrapper from "../components/PageWrapper.js";
import AllNewsList from "../components/AllNewsList.js";
import fetch from 'isomorphic-unfetch';
import config from '../config.js'
import {getAllNews} from '../src/utils'


class Current extends Component {

	static async getInitialProps(context) {
		const { lang, slug } = context.query;

		const res = await fetch(`${config.apiUrl}pages.json`);
        const pages = await res.json();
		const page = pages.find(page => page.slug === slug && (!lang || page.lang === lang));
		const news = await getAllNews(lang)

		return { 
			lang,
			page,
			error: !page,
			news,
			title: lang === 'sv' && 'Aktuellt' || 'Current',
		}
	}

	render () {
		const {page} = this.props;
		const newsName = this.props.lang === 'sv' && 'Nyheter' || 'News';
		const newsUrl = this.props.lang === 'sv' && '/om-sunet/aktuellt/nyheter' || '/en/about-sunet/current/news';
		const blogName = this.props.lang === 'sv' && 'Blogg' || 'Blog';
		const blogUrl = this.props.lang === 'sv' && '/om-sunet/aktuellt/blogg' || '/en/about-sunet/current/blog';
		const eventsName = this.props.lang === 'sv' && 'Evenemang' || 'Events';
		const eventsUrl = this.props.lang === 'sv' && '/om-sunet/aktuellt/evenemang' || '/en/about-sunet/current/events';
		return (
			<Layout {...this.props}>
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 hero">
							<div dangerouslySetInnerHTML={ {__html: page.acf.segment_top} } />
							<ul className="newslistings">
								<li className="newslisting news">
									<a href={newsUrl}>{newsName}</a>
								</li>
								<li className="newslisting events">
									<a href={blogUrl}>{blogName}</a>
								</li>
								<li className="newslisting pastevents">
									<a href={eventsUrl}>{eventsName}</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="bg-grey">
					<div className="container listing">
						<AllNewsList news={this.props.news} />
					</div>
				</div>
				
			</Layout>
		);
	}
	
}

export default PageWrapper(Current);

