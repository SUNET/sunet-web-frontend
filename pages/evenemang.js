import Layout from "../components/Layout.js";
import PageWrapper from "../components/PageWrapper.js";
import AllEvenemangList from "../components/AllEvenemangList.js";
import landingpage from '../json/landingpage.json';
import evenemangList from '../json/evenemang.json';

const Evenemang = props => {
	return (
		<Layout {...props}>
			<div className="container-fluid">
				<div className="row justify-content-center">
					<div className="col-lg-7 hero">
						<div dangerouslySetInnerHTML={ {__html: landingpage.acf.segment_top} } />
					</div>
				</div>
			</div>
			<div className="bg-grey">
				<div className="container listing">
					<AllEvenemangList evenemang={evenemangList} />
				</div>
			</div>
			
		</Layout>
	);
}

export default PageWrapper(Evenemang);
