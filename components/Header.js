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
		                <title>{!!props.title ? `${props.title} | ` : ""}Sunet</title>
		                <link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3ElEQVQ4y83SMUoEQRCF4a+1AwMjI5nIQJjME6iJYOABBPECgoGBzCFkTDb1DJp5Bw0MTRpBTFyMFzERtk2GZRGn2THRgqapqv4LXvXjryPAuKn3cZFZHQA+VG06il1+jrWQ3S46IAdPECGzErLH6jKdDpUQfyq+NvV64LDAveO6atMk9ujbwKiswR6OY0/7HssF/EawOZMQmAqMm3r+0fQ7VbVJ92uz3lJ3v8gO8Fk4u6UlngnulH3w3DugatMEV79xYuw0naAewG3hbc5IeUcO2wvbOPiQtf5FfAEKjDf+u4objAAAAABJRU5ErkJggg=="/>
				<meta name="viewport" content="initial-scale=1, maximum-scale=1"/>
					
			</Head>
			<HiddenNav />
			<header className="banner">
				<div className="container">
					<div className="row header-content">
						<a className="brand" href="/"><Logo/></a>
						<div className="col-lg-10 offset-lg-2">
							<Navigation 
								displaySubNavigation={props.router.query.apiRoute === 'page' || props.router.query.apiRoute === 'subscribe' || props.router.query.apiRoute === 'evenemang' || props.router.query.apiRoute === 'personer' || props.router.query.apiRoute === 'aktuellt'} 
								nav={props.nav} 
								pages={props.pages} 
								toggleMenu={props.toggleMenu}/>
							</div>
					</div>
				</div>
			</header>
		</Fragment>
	);
}

export default withLocale(Header);
