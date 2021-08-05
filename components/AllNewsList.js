import React from 'react';
import Link from 'next/link';
import withLocale from './withLocale'

const routes = {
	"en": "/about-sunet/newsroom",
	"sv": "/om-sunet/nyhetstum",
}





const AllNewsList = ({ news, locale }) => {
	
	function renderNewsroom() {
		return news.map((item) => {
			return (
				<Link href={`${routes[locale.lang]}/${item.slug}`} as={`${routes[locale.lang]}/${item.slug}`} key={item.id}>
					<a>
            <div className="card">
              <div className="card-tags">
                <span>{item.date}</span>
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
			<div className="col-12 cards list events">{renderNewsroom()}</div>
		</div>
	);
};

export default withLocale(AllNewsList);


