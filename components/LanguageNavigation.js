import React, { Component } from 'react';
import withLocale from './withLocale';

const getPathToTranslation = (lang, path, pages) => {

    const parts = path.split("/");
    const otherLang = lang === "en" ? "sv" : "en";
    const homePath = lang === "en" ? "/" : "/en/";
    
    for (let i = parts.length -1; i > 0; i--) {
        const currentPage = pages.find(page => page.slug === parts[i] && page.lang === lang);
        

        if (currentPage) {
            if(currentPage.translations[otherLang]) {
                
                let otherPage = pages.find(page => page.id === currentPage.translations[otherLang]);
                
                return new URL(otherPage.link).pathname;
            }
        }
    }
    
    return homePath;
}

const getLabel = lang => {
    const obj = {
        "en" : "På svenska",
        "sv": "In english"
    }
    return obj[lang];
}

class LanguageNavigation extends Component {

    
    render() {
        return (<div>
            <a href={getPathToTranslation(this.props.locale.lang, this.props.locale.pathname, this.props.pages)}>{getLabel(this.props.locale.lang)}</a>
            <span>&shy;</span>
        </div>)
    } 
} 

export default withLocale(LanguageNavigation);