import React from 'react';
import Link from 'next/link';

const AllEvenemangList = ({ evenemang, count }) => {
	function renderEvenemang() {
		return evenemang.map((item, index) => {
			return (
				<Link href={`/evenemang/${item.slug}`} as={`/evenemang/${item.slug}`} key={item.id}>
				<div className="card">
					<div className="card-tags">
						<span>{item.date.split('T')[0]}</span>
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
				</Link>
			);
		});
	}

	return (
		<div className="row">
			<div className="col-12 cards list events">{renderEvenemang()}</div>
		</div>
	);
};

export default AllEvenemangList;
