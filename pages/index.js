import React, { Component } from 'react';
import Layout from '../components/Layout.js';
import fetch from 'isomorphic-unfetch';
import config from '../config.js'
import {getEvenemang, getTjanster, getCategories} from '../src/utils'
import PageWrapper from '../components/PageWrapper.js';
import TjansterList from '../components/TjansterList.js';
import EvenemangList from '../components/AllEvenemangList';



class Index extends Component {
	static async getInitialProps(context) {
		const {lang, slug} = context.query

        const res = await fetch(`${config.apiUrl}pages.json`);
        const pages = await res.json();
		const page = pages.find(page => page.slug === slug && (!lang || page.lang === lang));

		const { acf: { segment_top, segment_bottom } } = page;
		
		const evenemang = await getEvenemang(lang);
		const tjanster = await getTjanster(lang);
		const categories = await getCategories();

		return {
			page,
			error: !page,
			segment_top,
			segment_bottom,
			slug,
			lang,
			categories,
			tjanster: tjanster,
			evenemang: evenemang,
			eventLinkText: lang === "en" ? "All events" : "Till alla evenemang",
		}
	}

	render() {
		return (
			<Layout {...this.props}>
				{this.props.segment_top && (<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 hero">
							<div dangerouslySetInnerHTML={{ __html: this.props.segment_top }} />
						</div>
					</div>
				</div>)}
	
				<TjansterList tjanster={this.props.tjanster} categories={this.props.categories} />
	
				{ false && this.props.segment_bottom && (<div className="container">
					<div className="row info flex-wrap-reverse">				
						<div className="col-lg-4 col-md-12">
							<h1>{this.props.segment_bottom.header}</h1>
							<p dangerouslySetInnerHTML={{ __html: this.props.segment_bottom.text}} />
							<a href={this.props.segment_bottom.url} className="btn-more">
								{this.props.segment_bottom.link.name}
							</a>
						</div>
						<div className="col-lg-8 col-md-12">
							<a href={this.props.segment_bottom.url}>
								<img src={this.props.segment_bottom.img} alt="sunet" />
							</a>
						</div>
					</div>
				</div>) }
	
				<div >
					<div className="container listing">
					<h2 className="vinjett">Evenemang</h2>
						<EvenemangList evenemang={this.props.evenemang} count={3} />
						<div className="row">
							<div className="col">
							
								<div className="btn-load-container">
									<a href="/om-sunet/evenemang" className="btn-more" aria-label={this.props.eventLinkText}>
										{this.props.eventLinkText}
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
	
}

export default PageWrapper(Index);
