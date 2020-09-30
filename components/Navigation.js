import React, { Component } from 'react'
import Link from 'next/link';
import ExternalHref from './ExternalHref';
import withLocale from './withLocale'
import LanguageNavigation from './LanguageNavigation';
import NavigationItem from './NavigationItem';

class Navigation extends Component {
    state = {
        active: false,
    };

    getPath = url => {
        url = new URL(url);
        return url.pathname
    }

    isCurrent = (itemPath, path) => {
        return itemPath === path
    }

    toggleNavigation = () => {
        this.setState(
            {
                active: !this.state.active
            },
            () => {
                if(typeof document === "undefined") {
                    if(this.state.active) {
                        document.body.classList.add("menu-active")
                    } else {
                        document.body.classList.remove("menu-active")
                    }
                    
                }
            }
        )
    }
    render() {
        return(
            <>
                <button className={`menu-button ${this.state.active ? 'active': ''}`} onClick={this.toggleNavigation} 
                    title={ this.props.locale.lang === "en" ? "Menu" : "Meny" }>
                    { this.props.locale.lang === "en" ? "Menu" : "Meny" }
                </button>
                <div className={`nav-wrapper${this.state.active ? " active" : ""} `}>
                    <nav aria-label="Huvudmeny">
                <ul className="main-nav">
                { this.props.nav.items.map(topItem => <NavigationItem displaySubNavigation={this.props.displaySubNavigation} pathname={this.props.locale.pathname} current={this.props.locale.pathname.indexOf(this.getPath(topItem.url)) !== -1} key={topItem.ID} item={topItem}/>
                )}
                </ul>
                </nav>
                <nav aria-label="Global meny">
               <ul className="global-nav">
                    { this.props.nav.secondaryItems.map(item => {
                       return item.object === "page" ?
                       (<li key={item.ID} className="global-nav-item">
                           <Link href={this.getPath(item.url)} as={this.getPath(item.url)}>
                       <a>{item.title}</a>
                        </Link></li>)
                        : (
                            <li key={item.ID} className="global-nav-item">
                                <ExternalHref href={item.url} text={item.title} />
                            </li>
                        )
                    })}
                     <li className="global-nav-item">
                    <LanguageNavigation pages={this.props.pages}/></li>
               </ul>
               </nav>
               </div>
            
       </> );
    }
    
}

export default withLocale(Navigation);