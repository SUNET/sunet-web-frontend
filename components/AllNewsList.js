import React, {Component} from 'react';
import { useState } from 'react';
import Link from 'next/link';
import withLocale from './withLocale'
import config from '../config.js';

const all_routes = {
	news: {
		"en": "/en/about-sunet/current/newsroom",
		"sv": "/om-sunet/aktuellt/nyheter",
	},
	events: {
		"en": "/en/about-sunet/current/events",
		"sv": "/om-sunet/aktuellt/evenemang",
	},
	blog: {
		"en": "/en/about-sunet/current/blog",
		"sv": "/om-sunet/aktuellt/blogg",
	},
}





class AllNewsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: config.scrollBatch,
			buttonMore: config.scrollBatch >= this.props.news.length && this.noButtonMoreNews.bind(this) || this.buttonMoreNews.bind(this),
		};
		this.toFocus = null;
	}

	componentDidUpdate() {
		if (this.toFocus !== null) {
			this.toFocus.focus()
		}
	}

	buttonMoreNews () {
		return (
			<button id="more-news-button"  onClick={this.renderMoreNews.bind(this)}>
			<span id="more-news-button-plus">+</span>{this.props.locale.lang === 'sv' && "Visa fler" || "Show more"}
			</button>
		);
	}

	noButtonMoreNews () {
		return (
			<div id="no-more-news">
			{this.props.locale.lang === 'sv' && "Inga fler inlägg" || "No more items"}
			</div>
		);
	}

	renderMoreNews() {
		if (this.state.current < this.props.news.length) {
			const newCurrent = this.state.current + config.scrollBatch;
			this.setState({current: newCurrent});
			if (newCurrent >= this.props.news.length) {
				this.setState({buttonMore: this.noButtonMoreNews.bind(this)});
			}
		} else {
			this.setState({buttonMore: this.noButtonMoreNews.bind(this)});
		}
	}

	
	renderNews() {


	return this.props.news.slice(0, this.state.current).map((item, idx) => {
    	const date = new Date(item.date);
		const months = this.props.locale.lang === 'en' && ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] || ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "Oktober", "november", "december"] ;
		let itemType = this.props.locale.lang === 'en' && "EVENT" || "EVENEMANG" 
		let routes = all_routes.events;
		let month = months[date.getMonth()];
	if (item.type === "post") {
		if (item.acf.is_news_item) {
			itemType = this.props.locale.lang === 'en' && "NEWS" || "NYHETER";
			routes = all_routes.news;
		} else {
			itemType = this.props.locale.lang === 'en' && "BLOG" || "BLOGG";
			routes = all_routes.blog;
		}
	}
			const entry = (
				<Link
				href={`${routes[this.props.locale.lang]}/${item.slug}`}
				as={`${routes[this.props.locale.lang]}/${item.slug}`}
				key={item.id}>
					<a
				ref={elem => {
					if (this.state.current > config.scrollBatch && idx === (this.state.current - config.scrollBatch)) {
						this.toFocus = elem;
					}
				}}>
            <div className="newscard">
              <div className="newscard-head">
                <div className="newscard-type">
		    {itemType}
                </div>
              </div>
              <div className="newscard-title">
                  <h2>
                    {item.title && item.title.rendered}
                  </h2>
              </div>
              <div
                  className="newscard-text"
                  dangerouslySetInnerHTML={{ __html: item.excerpt && item.excerpt.rendered }}
                />
            </div>
          </a>
	</Link>
	);
			return entry;
	});
	}


	render () {

		return (
			<>
			<div id="all-news-listing" className="row">
				<div className="col-12 newscards">{this.renderNews()}</div>
			</div>
			{ !this.props.nomore && this.state.buttonMore() }
			</>
		);
	}
}

export default withLocale(AllNewsList);


