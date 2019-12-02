import React from 'react';
import withLocale from './withLocale'
import TjanstLink from './TjanstLink.js';


const TjansterList = ({locale, tjanster, categories}) => {

	function renderTjanster() {
		return tjanster.map(tjanst => {
			const category = categories.find(category => category.id === tjanst.categories[0]);
			if (tjanst.acf.sticky == "Ja") {
				return <TjanstLink
					tjanst={tjanst}
					category={category}
					key={tjanst.slug}
				/>
			}
		})
	}

	return (
		<div className="bg-grey">
			<div className="container listing">
				<div className="row">
					<div className="col cards">
					{ renderTjanster() }
					</div>
				</div>
				<div className="row">
					<div className="col">
						<div className="btn-load-container">
							<a href={locale.lang === "en" ? "/en/services" : "/tjanster"} className="btn-load" aria-label={locale.lang === "en" ? "All services" : "Till alla tjänster"}>
							{locale.lang === "en" ? "All services" : "Till alla tjänster"}</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default withLocale(TjansterList);