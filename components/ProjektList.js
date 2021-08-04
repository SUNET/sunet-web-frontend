import React from 'react';
import withLocale from './withLocale'
import ProjektLink from './ProjektLink.js';


const ProjektList = ({locale, projekt, categories}) => {

	function renderProjekt() {
		return projekt.map(proj => {
			const category = categories.find(category => category.id === proj.categories[0]);
			if (proj.acf.sticky == "Ja") {
				return <ProjektLink
					projekt={proj}
					category={category}
					key={proj.slug}
				/>
			}
		})
	}

	return (
		<div className="bg-grey">
			<div className="container listing">
				<div className="row">
					<div className="col cards">
					{ renderProjekt() }
					</div>
				</div>
				<div className="row">
					<div className="col">
						<div className="btn-load-container">
							<a href={locale.lang === "en" ? "/en/projects" : "/projects"} className="btn-load" aria-label={locale.lang === "en" ? "All projects" : "Till alla projekt"}>
							{locale.lang === "en" ? "All projects" : "Till alla projekt"}</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default withLocale(ProjektList);
