import React, {Component, Fragment} from 'react';
import Link from 'next/link';
import ExternalHref from './ExternalHref';
import Accordion from '../components/Accordion.js';
import withLocale from './withLocale'

class Footer extends Component {
	getFooter(lang) {
		const slug = lang === "en " ? "footer" : "sidfot";
		return this.props.pages.find(page => page.slug === slug)
	}
	render() {
		const footer = this.getFooter(this.props.lang);
		return footer && (
			<Fragment>
				<footer className="bg-grey bg-stripe">
					<div className="container">
						
						<div className="row justify-content-center">
							<div className="col-lg-9">
								{footer.acf.accordion && footer.acf.accordion.map((item, index) => (<Accordion title={item.title} text={item.content} key={`${index}-${item.title}`} />))}
								
							</div>
						</div>

						<div className="row justify-content-center">
							<div className="col-lg-9 footer-meta">
								<div className="box" dangerouslySetInnerHTML={ {__html: footer.acf.footer_info && footer.acf.footer_info.address} }></div>
								<div className="box" dangerouslySetInnerHTML={ {__html: footer.acf.footer_info && footer.acf.footer_info.address_meta} }></div>
								<div className="box">
									{ footer.acf.footer_info 
										&& footer.acf.footer_info.links 
										&& footer.acf.footer_info.links.map((link, index) => {
											
											const href = link.url.replace('//','').split('/');
											href[0] = '';
											return ( 
												<div key={`${index}-${link.url}`}>
													<Link href={href.join('/')} as={href.join('/')}><a>{link.text}</a></Link>
												</div>
												)
											}
										)
									}
								</div>
							</div>
						</div>
					</div>
				</footer>

				{
				<div className="container-fluid vr-footer">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-9">
								{this.props.locale.lang === "sv" && <ExternalHref 
									href='https://www.vr.se' 
									text='Sunet är en del av Vetenskapsrådet' 
								/> }
								{ this.props.locale.lang === "en" && <ExternalHref 
									href='https://www.vr.se/english.html' 
									text='Sunet is part of Swedish Research Council' 
								/> }
							</div>
						</div>
					</div>
				</div>
				}

			</Fragment>
		);
	}
}

export default withLocale(Footer);