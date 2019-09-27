import React, {Component, Fragment} from 'react';
import Accordion from '../components/Accordion.js';
import ExternalHref from '../components/ExternalHref.js';
import Link from 'next/link';
import footer from '../json/footer-page.json';

class Footer extends Component {

	render() {
		return (
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
										&& footer.acf.footer_info.links.map(link => {
											
											const href = link.url.replace('//','').split('/');
											href[0] = '';
											return ( 
												<div key={link.url}>
													<a href={href.join('/')}>{link.text}</a>
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
				// <div className="container-fluid vr-footer">
				//	<div className="container">
				//		<div className="row justify-content-center">
				//			<div className="col-lg-9">
				//				<ExternalHref 
				// 					href='/' 
				// 					text='Sunet är en del av Vetenskapsrådet' 
				// 				/>
				// 			</div>
				// 		</div>
				// 	</div>
				// </div>
				}

			</Fragment>
		);
	}
}

export default Footer;