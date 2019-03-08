import React, {Component, Fragment} from 'react';
import Link from 'next/link';
import {Config} from '../config.js';

class ContactMenu extends Component {
	constructor(props) {
    super(props);
  }

	getSlug(url) {
    const parts = url.split('/');
    return parts.length > 2 ? parts[parts.length - 2] : '';
  }

	render() {

		const menuItems = this.props.menu.items.map((item, index) => {

			const slug = this.getSlug(item.url);

			if (item.object === 'custom') {
        return (
          <Link href={item.url} key={item.ID}>
						<li><a>{item.title}</a></li>
					</Link>
        );
      } else if (item.object === 'page') {
				return (
					<Link
						as={`/${slug}`}
						href={`/${slug}`}
						key={item.ID}
					>
						<li><a>{item.title}</a></li>
					</Link>
				);
      } else {
        return (
            <Link
                as={`/${item.object}/${slug}`}
                href={`/${item.object}/${slug}`}
                key={item.ID}
            >
                <li><a>{item.title}</a></li>
            </Link>
        );
      }
		});

		return(
			<ul className="aboutNav">
				{menuItems}
			</ul>
		)
	}


}

export default ContactMenu;
