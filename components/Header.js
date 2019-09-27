import React, { Component, Fragment } from "react";
import Head from "next/head";
import MainMenu from "./MainMenu.js";
import HiddenNav from "./HiddenNav";
import {Logo} from "./Icons.js";
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
			</Head>
			<HiddenNav />
			<header className="banner">
				<div className="container-fluid">
					<div className="row justify-content-center header-content">
						<a className="brand" href="/"><Logo/></a>
						<div className="col-lg-7">
							<nav className="nav-primary">
								<MainMenu menu={props.mainNav} />
							</nav>
						</div>
						<nav className="nav-secondary">
							<MainMenu menu={props.globalNav} />
						</nav>
					</div>
				</div>
			</header>
		</Fragment>
	);
}

export default Header;
