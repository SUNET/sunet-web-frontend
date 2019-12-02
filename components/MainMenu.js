import Link from 'next/link';
import { getSlug } from '../src/utils';
import ExternalHref from '../components/ExternalHref.js';

const MainMenu = ({ menu }) => {
	const menuLinkWithAs = (slug, item) => (
		<Link
			as={`/${slug}`}
			href={`/${slug}`}
			key={item.ID}
		>
			<a className={item.class}>{item.title}</a>
		</Link>
	)

	const menuItems = menu.items.map(item => {

		if (item.object === 'custom') {
			return (
				<ExternalHref 
					key={ item.ID }
					href={ item.url } 
					text={ item.title } 
				/>
			);
		} 

		if (item.object === 'page') {
			return menuLinkWithAs(item.slug, item);
		}

		return menuLinkWithAs(`${item.object}/${getSlug(item.url)}`, item);
	});

	return <div>{menuItems}</div>
}

export default MainMenu;
