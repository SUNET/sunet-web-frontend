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

export async function getAllNews(lang) {
    const res = await fetch(`${config.apiUrl}posts.json`);
    let news = await res.json();
    news = news.filter(item => item.lang === lang)
    const res2 = await fetch(`${config.apiUrl}evenemang.json`);
    let evenemang = await res2.json();
    evenemang = evenemang.filter(item => item.lang === lang)

    const all = news.concat(evenemang);

    function compare( a, b ) {
        if ( a.date < b.date ){
            return 1;
        }
        if ( a.date > b.date ){
            return -1;
        }
        return 0;
    }

    all.sort(compare);
    return all;
}

export async function getNews(lang) {
    const res = await fetch(`${config.apiUrl}posts.json`);
	const news = await res.json();
	return news.filter(item => item.lang === lang && item.acf.is_news_item === true)
}

export async function getBlogPosts(lang) {
    const res = await fetch(`${config.apiUrl}posts.json`);
	const news = await res.json();
	return news.filter(item => item.lang === lang && item.acf.is_news_item === false)
}


export async function getTjanster(lang) {
    const res = await fetch(`${config.apiUrl}tjanster.json`);
    const tjanster = await res.json();
    return tjanster.filter(item => item.lang === lang);
}


export async function getJIRATickets(lang) {
    const res = await fetch(`${config.apiUrl}tickets.json`);
    const tickets = await res.json();
    return tickets;
}


export async function getJiraCustom(lang) {
    const res = await fetch(`${config.apiUrl}custom-fields.json`);
    const fields = await res.json();
    return fields;
}


export async function getProjekt(lang) {
    const res = await fetch(`${config.apiUrl}projekt.json`);
    const projekt = await res.json();
    return projekt;
}
