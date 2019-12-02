import Link from 'next/link';
import { getSlug } from '../src/utils';

const SideBarMenu = ({ menu }) => {
	const menuLinkWithAs = (slug, item) => (
		<Link as={`/${slug}`} href={`/${slug}`} key={item.ID}>
			<li>
				<a className={item.class}>{item.title}</a>
			</li>
		</Link>
	);
	const menuItems = menu.items && menu.items.map((item) => {
		const slug = getSlug(item.url);

		if (item.object === 'custom') {
			return (
				<Link href={slug} key={item.ID}>
					<li>{item.title}</li>
				</Link>
			);
		}

		return menuLinkWithAs(item.slug, item);
	});

	return <ul className="side-bar-nav">{menuItems}</ul>;
};

export default SideBarMenu;
