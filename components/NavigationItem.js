import React, { Component } from 'react'
import Link from 'next/link';

class NavigationItem extends Component {
    state = {
        active: this.props.current,
    }
    getPath = url => {
        url = new URL(url);
        return url.pathname
    }
    toggleItem = () => {
        this.setState({
            active: !this.state.active,
        })
    }
    render() {
        const {item, current, pathname, displaySubNavigation} = this.props;

        return (
            
            <li className={`main-nav-item ${this.state.active ? 'active' : ''} ${current ? 'current' : ''} ${displaySubNavigation ? 'show-sub':''}`} >
            <Link href={this.getPath(item.url)} as={this.getPath(item.url)}>
                <a>{item.title}</a>
                
            </Link>
            {item.children.length > 0 && <button className="sub-nav-toggle" onClick={this.toggleItem}>+</button>}
            <ul className="sub-nav">
            { item.children.map(childItem => (
                 <li key={childItem.ID} className={`sub-nav-item ${pathname === this.getPath(childItem.url) ? 'current' : ''}`}>
                 <Link href={this.getPath(childItem.url)} as={this.getPath(childItem.url)}>
                     <a>{childItem.title}</a>
                 </Link>
                 </li>
                 ))}
                 </ul>
                 </li>
        );
    }
}

export default NavigationItem