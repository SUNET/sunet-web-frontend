import Layout from "../components/Layout.js";
import PageWrapper from "../components/PageWrapper.js";
import SideBarMenu from "../components/SideBarMenu.js";
import kontaktPage from '../json/kontakt-page.json';

const Kontakt = props => {
	return (
		<Layout {...props}>
			<div className="container-fluid">
				<div className="row single m-80">
					<aside className="sidebar col-lg-3">
						<div className="service">
							<SideBarMenu menu={props.contactNav} />
						</div>
					</aside>
					<article className="col-lg-7">
						<h1>{kontaktPage.title.rendered}</h1>
						<div dangerouslySetInnerHTML={ {__html: kontaktPage.content.rendered} } />
					</article>
				</div>
			</div>
		</Layout>
	);
}

export default PageWrapper(Kontakt);
