import React, { Component, Fragment } from "react";
import Link from "next/link";
import Head from "next/head";
import Menu from "./Menu.js";
import {Logo} from "./Icons.js";
import { Config } from "../config.js";
import stylesheet from '../src/styles/style.scss'

class Header extends Component {
	constructor() {
		super();
	}

	render() {

		return (
			<Fragment>
				<Head>
					<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1"
					/>
					<meta charSet="utf-8" />
					<title>
						Sunet
					</title>
				</Head>
        <header className="banner">
					<div className="container-fluid">
						<div className="row justify-content-center header-content">
							<a className="brand" href="/"><Logo/></a>
							<div className="col-lg-7">
								<nav className="nav-primary">
									<Menu menu={this.props.mainNav} />
								</nav>
							</div>
							<nav className="nav-secondary">
								<Menu menu={this.props.globalNav} />
							</nav>
						</div>
					</div>
				</header>
			</Fragment>
		);
	}
}

export default Header;
