import React, { Component } from 'react';
import headerMenu from '../json/header-menu.json';
import headerSecondary from '../json/header-secondary-menu.json';
import aboutMenu from '../json/about-menu.json';
import contactMenu from '../json/contakt-menu.json';

const PageWrapper = Comp => {
	return class extends Component {
		static async getInitialProps(args) {
			const navs = {
				mainNav: headerMenu,
				globalNav: headerSecondary,
				aboutNav: aboutMenu,
				contactNav: contactMenu
			}

			return { 
				...navs, 
				...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null)
			};
		}

		render() {
			return <Comp { ...this.props } />
		}
	}
}

export default PageWrapper;