import React from 'react'
import fetch from 'isomorphic-unfetch';
import config from '../config.js'

const withContent = (WrappedComponent, args) => {
    class Content extends React.Component {
        static async getInitialProps(context) {
            const { section, slug, lang } = context.query;
            const res = await fetch(`${config.apiUrl}pages.json`);
            const pages = await res.json();


            return {
                content: pages.filter(args.filter ? args.filter : true)
            }
        }
        
        render() {
            return (<WrappedComponent {...(Comp.getInitialProps ? await Comp.getInitialProps(context) : null)} {...this.props} />);
        }
    }
    return Content;
};

export default withContent;