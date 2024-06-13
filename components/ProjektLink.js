import { createElement } from 'react';
import Link from 'next/link';
import withLocale from './withLocale';
import postTypes from '../post-types.json';

const ProjektLink = ({ proj, locale }) => {

	function getSlug() {
		const slug = postTypes.find((item) => item.name === 'projekt').routes[locale.lang];
		return `/${locale.slug}${slug}`;
	}
  const div = createElement("div", {}, proj.acf.segment_support);
  const support = div.textContent || div.innerText || "";

	return (
		<Link href={`${getSlug()}/${proj.slug}`}>
			<a className={`card`} tabIndex={0}>
				<div className="card-tags">
					<span>{support}</span>
				</div>
				<div className="card-content">
					<div className="header-container">
						<h2>{proj.title.rendered}</h2>
					</div>
					<p className="card-intro">{proj.acf.intro}</p>
				</div>
			</a>
		</Link>
	);
};

export default withLocale(ProjektLink);
