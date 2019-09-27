import Link from 'next/link';
import { getSlug } from '../src/utils';

const SideBarMenu = ({ menu, appendToUrl }) => {

    const append = appendToUrl ? `-${appendToUrl}` : '';

	const menuLinkWithAs = (slug, item) => (
		<Link
			as={`/${slug}`}
			href={`/${slug}`}
			key={item.ID}
		>
			<li>{item.title}</li>
		</Link>
	)

	const menuItems = menu.items.map(item => {
		const slug = getSlug(item.url);

		if (item.object === 'custom') {
			return (
				<Link href={item.url} key={item.ID}>
					<li>{item.title}</li>
				</Link>
			);
		} 

		if (item.object === 'page') {
			return menuLinkWithAs(slug + append, item);
		}

		return menuLinkWithAs(`${item.object}${append}/${slug}`, item);
	});

	return <ul className="side-bar-nav">{menuItems}</ul>
}

export default SideBarMenu;
