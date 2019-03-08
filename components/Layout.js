import Header from "./Header";
import Footer from "./Footer";

const Layout = props => (
  <div className="wrapper">
    <Header mainNav={props.mainNav} globalNav={props.globalNav} />
    {props.children}
    <Footer />
  </div>
);

export default Layout;