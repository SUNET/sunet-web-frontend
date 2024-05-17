import React from 'react';
import withLocale from './withLocale'
import ProjektLink from './ProjektLink.js';


const ProjektList = ({locale, projekt}) => {

	function renderProjekt() {
		return projekt.map(proj => {
			if (proj.acf.sticky == "Ja") {
				return <ProjektLink
					proj={proj}
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
							<a href={locale.lang === "en" ? "/en/projects" : "/projekt"} className="btn-load" aria-label={locale.lang === "en" ? "All projects" : "Till alla projekt"}>
							{locale.lang === "en" ? "All projects" : "Till alla projekt"}</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default withLocale(ProjektList);
