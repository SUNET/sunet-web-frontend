import React, { Fragment } from "react";
import Head from "next/head";
import HiddenNav from "./HiddenNav";
import Navigation from './Navigation';
import {Logo} from "./Icons.js";
import withLocale from "./withLocale";
import stylesheet from '../src/styles/style.scss'

const Header = props => {
	return (
		<Fragment>
			<Head>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta charSet="utf-8" />
				<title>Sunet</title>
				<meta name="viewport" content="initial-scale=1, maximum-scale=1"/>
					
			</Head>
			<HiddenNav />
			<header className="banner">
				<div className="container">
					<div className="row header-content">
						<a className="brand" href="/"><Logo/></a>
						<div className="col-lg-10 offset-lg-2">
							<Navigation displaySubNavigation={props.router.query.apiRoute === 'page'} nav={props.nav} pages={props.pages} />
							</div>
					</div>
				</div>
			</header>
		</Fragment>
	);
}

export default withLocale(Header);
