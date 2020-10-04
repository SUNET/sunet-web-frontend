import Header from "./Header";
import Footer from "./Footer";



class Layout extends React.Component {
	state = {
		menuActive: false,
	}
	
	toggleMenu = () => {
		this.setState({menuActive: !this.state.menuActive})
	}

    render() {
        const {
            props,
		} = this;
		const tabIndex = this.state.menuActive ? {"aria-hidden": true, tabIndex: -1} : {"aria-hidden": false};

        return (
        <div className="wrapper">
            <a href="#primary-content" tabIndex="1" className="main-content-link">Till innehållet</a>
            <Header 
                nav={props.nav}
                pages={props.pages}
				title={props.title}
				toggleMenu= {this.toggleMenu}
            />
            <div id="primary-content" {...tabIndex}>
                {props.children}
            </div>
            <Footer pages={props.pages} />
        </div>
    )
    }
}

export default Layout;