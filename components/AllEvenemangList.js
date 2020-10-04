import React from 'react';
import Link from 'next/link';
import withLocale from './withLocale'

const routes = {
	"en": "about-sunet/events",
	"sv": "/om-sunet/evenemang",
}





const AllEvenemangList = ({ evenemang, locale }) => {
	
	function renderEvenemang() {
		return evenemang.map((item) => {
			return (
				<Link href={`${routes[locale.lang]}/${item.slug}`} as={`${routes[locale.lang]}/${item.slug}`} key={item.id}>
					<a>
				<div className="card">
					<div className="card-tags">
						<span>{item.acf && item.acf.text_date}</span>
					</div>
					<div className="card-content">
						<div className="header-container">
							<h3>
								{item.title && item.title.rendered}
							</h3>
						</div>
						<div
							className="card-intro"
							dangerouslySetInnerHTML={{ __html: item.excerpt && item.excerpt.rendered }}
						/>
					</div>
				</div>
				</a>
				</Link>
			);
		});
	}


	return (
		<div className="row">
			<div className="col-12 cards list events">{renderEvenemang()}</div>
		</div>
	);
};

export default withLocale(AllEvenemangList);

