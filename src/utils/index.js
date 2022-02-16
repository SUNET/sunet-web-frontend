import config from '../../config.js'
import fetch from 'isomorphic-unfetch';

export const getSlug = url => {
    const parts = url.split('/');
    return parts.length > 2 ? parts[parts.length - 2] : parts[parts.length - 1];
}

 export const getPageBySlug = (pages, slug, lang) => {

    fetch(`${config.apiUrl}${pages}.json`)
        .then(response => response.json() )
        .then(pages => {
            return pages.find(page => page.slug === slug && (!lang || page.lang === lang));
        })

    const page = pages.find(page => page.slug === slug && (!lang || page.lang === lang));
    return page || null;
}

export async function getPage(slug, lang) {

}

export async function getCategories() {
    const res = await fetch(`${config.apiUrl}categories.json`);
	const categories = await res.json();
	return categories;
}

export async function getPersoner(lang) {
    const res = await fetch(`${config.apiUrl}person.json`);
	const personer = await res.json();
	return personer.filter(item => item.lang === lang)
}

export async function getMedarbetare(lang) {
    const res = await fetch(`${config.apiUrl}person.json`);
	const personer = await res.json();
	return personer.filter(item => item.lang === lang && item.acf.visa === true)
}

export async function getEvenemang(lang) {
    const res = await fetch(`${config.apiUrl}evenemang.json`);
	const evenemang = await res.json();
	return evenemang.filter(item => item.lang === lang)
}


export async function getTjanster(lang) {
    const res = await fetch(`${config.apiUrl}tjanster.json`);
    const tjanster = await res.json();
    return tjanster.filter(item => item.lang === lang);
}
