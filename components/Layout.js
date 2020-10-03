import Header from "./Header";
import Footer from "./Footer";

const Layout = props => {

	return (
	<div className="wrapper">
		<Header 
			nav={props.nav}
			pages={props.pages}
			title={props.title}
		/>
    	{props.children}
    	<Footer pages={props.pages} />
	</div>
)};

export default Layout;