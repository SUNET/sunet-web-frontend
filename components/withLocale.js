import React from 'react'
import { withRouter } from 'next/router'

const withLocale = WrappedComponent => {
    class Locale extends React.Component {
        
        buildLocale = () => {
            const defaultLang = 'sv';
            let lang = defaultLang;
            let slug = '';
        
            if(this.props.router.query) {
                lang = this.props.router.query.lang;
                slug = lang === defaultLang ? '' : `${this.props.router.query.lang}/`; 
            };

            return {
                locale: {
                    lang,
                    slug,
                    pathname: this.props.router.asPath,
                }
            }
        }
        render() {
        
            return (<WrappedComponent { ... this.buildLocale() } {...this.props} />);
        }
    }
    return withRouter(Locale);
};

export default withLocale;