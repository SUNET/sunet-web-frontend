import fetch from 'isomorphic-unfetch';
import config from '../../config.js'
import postTypes from '../../post-types.json'

const getPath = url => {
    url = new URL(url);
    return url.pathname.substring(1)
}

export async function buildCompleteMenu(currentSlug, lang) {
    const filename = lang === "en" ? "header-menu-en.json" : "header-menu-sv.json";
    const secondaryFilename = lang === "en" ? "header-secondary-menu-en.json" : "header-secondary-menu-sv.json";
    const mainResponse = await fetch(`${config.apiUrl}${filename}`);
    const secondaryResponse = await fetch(`${config.apiUrl}${secondaryFilename}`);
    const mainSource = await mainResponse.json();
    const secondarySource = await secondaryResponse.json();

    const items = mainSource.items 
        .filter(item => item.menu_item_parent === "0")
        .map(item => {
            const children = mainSource.items.filter(child => child.menu_item_parent === item.ID.toString())
            return {
                ...item,
                children
            }
        })
       
        return {
            items,
            secondaryItems: secondarySource.items,
        }
}


export async function buildMainMenu (currentSlug, lang) {
    const filename = lang === "en" ? "header-menu-en.json" : "header-menu-sv.json";
    const res = await fetch(`${config.apiUrl}${filename}`);
    const source = await res.json();
    
    const items = source.items
        .filter(item => item.menu_item_parent === "0")
        .map(item => {
            const path = getPath(item.url);
    
            const isCustomPostType = postTypes.some(type => type.routes[lang] === item.post_name);
//            const isCustomPostType = false;
            const isActive = (path.indexOf(currentSlug) !== -1
                || source.items.some(i => getPath(i.url).indexOf(currentSlug) !== -1  && item.ID.toString() === i.menu_item_parent))

                
            return {
                object: isCustomPostType ? item.post_name : 'page',
                title: item.title,
                ID: item.ID,
                slug: path,
                url: item.url,
                class: isActive ? "current-menu-item" : "",
                isActive,
                
            };
        });
    return {
        items
    };
}

export async function buildSidebarMenu  (parentName, currentSlug, lang) {
    if (!parentName || !currentSlug) return []
    const filename = lang === "en" ? "header-menu-en.json" : "header-menu-sv.json";
    const res = await fetch(`${config.apiUrl}${filename}`);
    const source = await res.json();
    const parent = source.items.find(item => {
        return getPath(item.url).indexOf(parentName) !== -1
    })
    
    if(!parent) return {items: []};

    const items = source.items
        .filter(item => item.menu_item_parent === parent.ID.toString())
        .map(item => {
            const path = getPath(item.url);
            const isActive = (parentName.indexOf(currentSlug) === -1 && (path.indexOf(currentSlug) !== -1
            || source.items.some(i => getPath(i.url).indexOf(currentSlug) !== -1  && item.ID.toString() === i.menu_item_parent)))
           
            return {
                object: 'page',
                title: item.title,
                ID: item.ID,
                slug: path,
                url: item.url,
                class: isActive ? "active": "",
                isActive,
            };
        });
    return {
        items
    };
}