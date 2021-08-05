import React from 'react';
import Link from 'next/link';
import withLocale from './withLocale'

const routes = {
	"en": "/about-sunet/newsroom",
	"sv": "/om-sunet/nyhetsrum",
}





const AllNewsList = ({ news, locale }) => {
	
	function renderNewsroom() {


		return news.map((item) => {
      const date = new Date(item.date);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const localizedDate = date.toLocaleDateString(locale, options);
			return (
				<Link href={`${routes[locale.lang]}/${item.slug}`} as={`${routes[locale.lang]}/${item.slug}`} key={item.id}>
					<a>
            <div className="card">
              <div className="card-tags">
                <span>{localizedDate}</span>
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


