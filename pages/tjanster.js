import Layout from "../components/Layout.js";
import React from "react";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import AllTjansterList from "../components/AllTjansterList.js";
import landingpage from '../json/landingpage';

const Tjanster = props => {
	return (
		<Layout {...props}>
			<div className="container-fluid">
				<div className="row justify-content-center">
					<div className="col-lg-7 hero">
						<div dangerouslySetInnerHTML={ {__html: landingpage.acf.segment_top} } />
					</div>
				</div>
			</div>

			<AllTjansterList />
		</Layout>
	);
}

export default PageWrapper(Tjanster);
