import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import config from '../config.js'
import { buildCompleteMenu } from '../src/utils/menu-builder'

const PageWrapper = Comp => {
	 return class extends Component {
		static async getInitialProps(args) {
			const { lang, subsection, section, slug } = args.query;
			const pagesRes = await fetch(`${config.apiUrl}pages.json`);
			const pages = await pagesRes.json();			
			const nav = subsection ? 
				await buildCompleteMenu(subsection, lang)
				: await buildCompleteMenu(slug, lang);

			return {
				pages,
				nav, 
				...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null)
			};
		}

		render() {
			return <Comp { ...this.props } />
		}
	}
	
}

export default PageWrapper;