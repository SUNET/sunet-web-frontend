import Link from 'next/link';
import withLocale from './withLocale';
import postTypes from '../post-types.json';

const ProjektLink = ({ projekt, category, locale }) => {
	function getSlug() {
		const slug = postTypes.find((item) => item.name === 'projekt').routes[locale.lang];
		return `/${locale.slug}${slug}/${category.slug}`;
	}

	function getCategoryName() {
		return category ? category.name : '';
	}

	function getCategorySlugWithSpace() {
		return category ? ` ${category.slug}` : '';
	}

	return (
		<Link href={`${getSlug()}/${projekt.slug}`}>
			<a className={`card${getCategorySlugWithSpace()}`} tabIndex={0}>
				<div className="card-tags">
					<span>{getCategoryName()}</span>
				</div>
				<div className="card-content">
					<div className="header-container">
						<h2>{projekt.title.rendered}</h2>
					</div>
					<p className="card-intro">{projekt.acf.intro}</p>
				</div>
			</a>
		</Link>
	);
};

export default withLocale(ProjektLink);
