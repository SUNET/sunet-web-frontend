import React from 'react';
import Layout from '../components/Layout.js';
import { getSlug } from '../src/utils';
import PageWrapper from '../components/PageWrapper.js';
import TjansterList from '../components/TjansterList.js';
import landingpage from '../json/landingpage.json';
import evenemang from '../json/evenemang.json';
import EvenemangList from '../components/AllEvenemangList';

const Index = (props) => {
	const { acf: { segment_top, segment_bottom } } = landingpage;
	const slug = getSlug(segment_bottom.link.url);

	return (
		<Layout {...props}>
			<div className="container-fluid">
				<div className="row justify-content-center">
					<div className="col-lg-7 hero">
						<div dangerouslySetInnerHTML={{ __html: segment_top }} />
					</div>
				</div>
			</div>

			<TjansterList />

			<div className="container" data-hidden-nav-name="Vad är Sunet?">
				<div className="row info flex-wrap-reverse">
					<div className="col-lg-4 col-md-12">
						<h1>{segment_bottom.header}</h1>
						<p>{segment_bottom.text}</p>
						<a href={slug} className="btn-more">
							{segment_bottom.link.name}
						</a>
					</div>
					<div className="col-lg-8 col-md-12">
						<img src={segment_bottom.img} alt="video om sunet" />
					</div>
				</div>
			</div>

			<div className="bg-grey">
				<div className="container listing" data-hidden-nav-name="Evenemang">
					<EvenemangList evenemang={evenemang.slice(0, 5)} />
					<div className="row">
						<div className="col">
							<div className="btn-load-container">
								<a href="/evenemang" className="btn-load" aria-label="Till evenemang">
									Till alla evenemang
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default PageWrapper(Index);
