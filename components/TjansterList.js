import React from 'react';
import TjanstLink from './TjanstLink.js';
import tjanster from '../json/tjanster.json';
import categories from '../json/categories.json';

const TjansterList = () => {

	function renderTjanster() {
		return tjanster.map(tjanst => {
			if (tjanst.acf.sticky !== 'Ja') return;

			// The tjanst will only have one category, even tho it currently is an array.
			const category = categories.find(category => category.id === tjanst.categories[0]);

			return <TjanstLink
				tjanst={tjanst}
				category={category}
				key={tjanst.slug}
			/>
		})
	}

	return (
		<div className="bg-grey">
			<div className="container listing">
				<div className="row">
					<div className="col cards">
						{renderTjanster()}
					</div>
				</div>
				<div className="row">
					<div className="col">
						<div className="btn-load-container">
							<a href="/tjanster" className="btn-load" aria-label="Till tjänster">Till alla tjänster</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TjansterList;