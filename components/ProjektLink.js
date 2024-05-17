import Link from 'next/link';
import withLocale from './withLocale';
import postTypes from '../post-types.json';

const ProjektLink = ({ projekt, locale }) => {
	function getSlug() {
		const slug = postTypes.find((item) => item.name === 'projekt').routes[locale.lang];
		return `/${locale.slug}${slug}`;
	}

		let personId = -1;
		if (proj && proj.acf && typeof proj.acf.person[0] !== 'undefined'
			&& proj.hasOwnProperty('acf')
			&& proj.acf.hasOwnProperty('person')
			&& proj.acf.person.length > 0
			&& proj.acf.person[0].hasOwnProperty('ID')
			&& !isNaN(proj.acf.person[0].ID)){
				personId = proj.acf.person[0].ID;
		}
		let personName = "SUNET";
    if (personId !== -1) {
		  const person = persons.find(person => person.id === personId);
      personName = person.title.rendered;
    }


	return (
		<Link href={`${getSlug()}/${projekt.slug}`}>
			<a className={`card molnbaserade-tjanster`} tabIndex={0}>
				<div className="card-tags">
					<span>{personName}</span>
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
