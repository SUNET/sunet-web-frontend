import React, { Component } from 'react'
import Link from 'next/link';

class NavigationItem extends Component {
    state = {
        active: this.props.current,
    }
    getPath = url => {
        url = new URL(url);
        return url.pathname.replace(/\/$/g,'')
    }
    toggleItem = () => {
        this.setState({
            active: !this.state.active,
        })
    }
    render() {
        const {item, current, pathname, displaySubNavigation} = this.props;
        
        const tabIndex = this.state.active ? null : {'tabIndex' : -1}
        return (
            
            <li className={`main-nav-item ${this.state.active ? 'active' : ''} ${current ? 'current' : ''} ${displaySubNavigation ? 'show-sub':''}`} >
            <Link href={this.getPath(item.url)} as={this.getPath(item.url)}>
                <a aria-selected={current}>{item.title}</a>
                
            </Link>

            {item.children.length > 0 && <button className="sub-nav-toggle" onClick={this.toggleItem} aria-expanded={this.state.active} aria-label="Undermeny" >+</button>}

            <ul className="sub-nav">
		{ item.children.map(childItem => (
		    
                 <li key={childItem.ID} className={`sub-nav-item ${pathname === this.getPath(childItem.url) ? 'current' : ''}`} aria-hidden={!this.state.active}>
                 <Link href={this.getPath(childItem.url)} as={this.getPath(childItem.url)}>
                     <a aria-selected={pathname === this.getPath(childItem.url)} {...tabIndex}>{childItem.title}</a>
                 </Link>
                 </li>
                 ))}
                 </ul>
                 </li>
        );
    }
}

export default NavigationItem
