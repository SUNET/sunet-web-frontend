import Link from 'next/link';
import withLocale from './withLocale';
import postTypes from '../post-types.json';

const ProjektLink = ({ proj, locale }) => {

	function getSlug() {
		const slug = postTypes.find((item) => item.name === 'projekt').routes[locale.lang];
		return `/${locale.slug}${slug}`;
	}

	return (
		<Link href={`${getSlug()}/${proj.slug}`}>
			<a className={`card molnbaserade-tjanster`} tabIndex={0}>
				<div className="card-tags">
					<span>{proj.acf.segment_support}</span>
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
