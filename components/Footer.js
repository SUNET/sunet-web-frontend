import React, {Component, Fragment} from 'react';
import Link from 'next/link';
import {Config} from '../config.js';
import {Logo} from "./Icons.js";
import { Accordion, AccordionItem } from 'react-light-accordion';

class Footer extends Component {

	render() {

		return (
			<Fragment>
				<footer className="bg-grey bg-stripe">
					<div className="container">
						
						<div className="row justify-content-center">
							<div className="col-lg-9">
		    				<Accordion atomic={true}>
					    		<AccordionItem title="Lorem ipsum dolor sit amet">
					        	<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum.</p>
					      	</AccordionItem>
					      	<AccordionItem title="Lorem ipsum dolor sit amet">
					        	<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum.</p>
					      	</AccordionItem>
					      	<AccordionItem title="Lorem ipsum dolor sit amet">
					        	<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum.</p>
					      	</AccordionItem>
						    </Accordion>
							</div>
						</div>

						<div className="row justify-content-center">
							<div className="col-lg-9 footer-meta">
								<div className="box">
									<p>Tulegatan 11 3tr</p>
									<p>113 53 Stockholm</p>
									<p>090-20 59 100</p>
								</div>
								<div className="box">
									<p>Corp Reg.: 2021005208</p>
									<p>Invoice address:</p>
									<p>Vetenskapsrådet, FE 57</p>
									<p>SE-838 73 Frösön, Sweden</p>
								</div>
								<div className="box">
									<a href="">About cookies</a>
									<a href="">Public access to information</a>
								</div>
							</div>
						</div>
					</div>
				</footer>

				<div className="container-fluid vr-footer">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-9">
								<a href="">Sunet är en del av Vetenskapsrådet</a>
							</div>
						</div>
					</div>
				</div>

			</Fragment>
		);
	}
}

export default Footer;