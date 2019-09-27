export const getSlug = url => {
    const parts = url.split('/');
    return parts.length > 2 ? parts[parts.length - 2] : '';
}

export const getPageBySlug = (pages, slug) => {
    return pages.find(page => page.slug === slug); 
}