const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();
            server.use(function(req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                next();
              });

            server.get('/', (req, res) => {
                const actualPage = "/index";
                const queryParams = { slug: 'startsida', lang: 'sv', apiRoute: "index" };
                app.render(req, res, actualPage, queryParams);
            })

            server.get('/security.txt', (req, res) => {
                const actualPage = "/security.txt";
                app.render(req, res, actualPage);
            })

            server.get('/services', (req, res)=>{
                const actualPage = '/tjanster';
                const queryParams = { slug: 'services', apiRoute: 'tjanster', category: req.params.category, lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get('/services/:category', (req, res)=>{
                const actualPage = '/tjanster';
                const queryParams = { slug: 'services', apiRoute: 'tjanster', category: req.params.category, lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/services/:category/:slug`, (req, res) =>{
                const actualPage = "/tjanst";
                const queryParams = { slug: req.params.slug, apiRoute: 'tjanster', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/tjanster`, (req, res)=>{
                const actualPage = `/tjanster`;
                const queryParams = { slug: 'tjanster', apiRoute: 'tjanster', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/tjanster/:category`, (req, res)=>{
                const actualPage = `/tjanster`;
		const queryParams = { slug: 'tjanster', apiRoute: 'tjanster', category: req.params.category, lang: 'sv' }; 
//                const queryParams = { slug: item.slug, apiRoute: 'tjanster', category: req.params.category, lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/tjanster/:category/:slug`, (req, res) =>{
                const actualPage = "/tjanst";
                const queryParams = { slug: req.params.slug, apiRoute: 'tjanster', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/projekt`, (req, res)=>{
                const actualPage = `/projekt`;
                const queryParams = { slug: 'projekt', apiRoute: 'projekt', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/projekt/:slug`, (req, res) =>{
                const actualPage = "/proj";
                const queryParams = { slug: req.params.slug, apiRoute: 'projekt', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/om-sunet/aktuellt`, (req, res)=>{
                const actualPage = `/aktuellt`;
                const queryParams = { slug: 'aktuellt', apiRoute: 'aktuellt', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/om-sunet/aktuellt/evenemang`, (req, res)=>{
                const actualPage = `/evenemang`;
                const queryParams = { slug: 'evenemang', apiRoute: 'aktuellt', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/om-sunet/aktuellt/evenemang/:slug`, (req, res) =>{
                const actualPage = "/evenemanget";
                const queryParams = { slug: req.params.slug, apiRoute: 'aktuellt', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/om-sunet/aktuellt/nyheter`, (req, res)=>{
                const actualPage = `/newsroom`;
                const queryParams = { slug: 'nyheter', apiRoute: 'aktuellt', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/om-sunet/aktuellt/nyheter/:slug`, (req, res) =>{
                const actualPage = "/newsitem";
                const queryParams = { slug: req.params.slug, apiRoute: 'aktuellt', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/om-sunet/aktuellt/blogg`, (req, res)=>{
                const actualPage = `/blog`;
                const queryParams = { slug: 'blogg', apiRoute: 'aktuellt', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/om-sunet/aktuellt/blogg/:slug`, (req, res) =>{
                const actualPage = "/blogitem";
                const queryParams = { slug: req.params.slug, apiRoute: 'aktuellt', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/en/about-sunet/current`, (req, res)=>{
                const actualPage = `/aktuellt`;
                const queryParams = { slug: 'current', apiRoute: 'aktuellt', lang: 'en' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/en/about-sunet/current/events`, (req, res)=>{
                const actualPage = `/evenemang`;
                const queryParams = { slug: 'events', apiRoute: 'aktuellt', lang: 'en' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/en/about-sunet/current/events/:slug`, (req, res) =>{
                const actualPage = "/evenemanget";
                const queryParams = { slug: req.params.slug, apiRoute: 'aktuellt', lang: 'en' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/en/about-sunet/current/newsroom`, (req, res)=>{
                const actualPage = `/newsroom`;
                const queryParams = { slug: 'newsroom', apiRoute: 'aktuellt', lang: 'en' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/en/about-sunet/current/newsroom/:slug`, (req, res) =>{
                const actualPage = "/newsitem";
                const queryParams = { slug: req.params.slug, apiRoute: 'aktuellt', lang: 'en' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/en/about-sunet/current/blog`, (req, res)=>{
                const actualPage = `/blog`;
                const queryParams = { slug: 'blog', apiRoute: 'aktuellt', lang: 'en' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/en/about-sunet/current/blog/:slug`, (req, res) =>{
                const actualPage = "/blogitem";
                const queryParams = { slug: req.params.slug, apiRoute: 'aktuellt', lang: 'en' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/arenden`, (req, res)=>{
		const actualPage = `/tickets`;
                const queryParams = { slug: 'arenden', apiRoute: 'tickets', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/arenden/:slug`, (req, res) =>{
		const actualPage = "/ticket";
                const queryParams = { slug: req.params.slug, apiRoute: 'tickets', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })
	
            server.get(`/tickets`, (req, res)=>{
                const actualPage = `/tickets`;
                const queryParams = { slug: 'arenden', apiRoute: 'tickets', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/tickets/:slug`, (req, res) =>{
                const actualPage = "/ticket";
                const queryParams = { slug: req.params.slug, apiRoute: 'tickets', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/en/tickets`, (req, res)=>{
                const actualPage = `/tickets`;
                const queryParams = { slug: 'tickets', apiRoute: 'tickets', lang: 'en' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/en/tickets/:slug`, (req, res) =>{
                const actualPage = "/ticket";
                const queryParams = { slug: req.params.slug, apiRoute: 'tickets', lang: 'en' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/kontakt/medarbetare`, (req, res)=>{
                const actualPage = `/personer`;
                const queryParams = { slug: 'medarbetare', section: "kontakt", apiRoute: 'personer', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/om-sunet/nyhetsbrev`, (req, res)=>{
                const actualPage = `/subscribe`;
                const queryParams = { slug: 'subscribe', apiRoute: 'subscribe', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get('/en', (req, res) => {
                const actualPage = "/index";
                const queryParams = { slug: 'startpage', lang: 'en', apiRoute: "index" };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/en/services`, (req, res)=>{
                const actualPage = `/tjanster`;
                const queryParams = { slug: 'services', apiRoute: 'tjanster', category: req.params.category, lang: 'en' };
                app.render(req, res, actualPage, queryParams);
            })

           
            server.get(`/en/services/:category`, (req, res)=>{
                const actualPage = `/tjanster`;
                const queryParams = { slug: 'services', apiRoute: 'tjanster', category: req.params.category, lang: 'en' };
                app.render(req, res, actualPage, queryParams);
            })
            

            server.get(`en/services/:category/:slug`, (req, res)=> {
                const actualPage = `/tjanst`;
                const queryParams = { slug: req.params.slug, apiRoute: 'tjanster', lang: 'en' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`en/contact/employees`, (req, res)=>{
                const actualPage = `/personer`;
                const queryParams = { slug: 'employees', section: "contact", apiRoute: 'personer', lang: 'en' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get('/en/:slug', (req, res) => {
                const actualPage = "/page";
                const queryParams = { slug: req.params.slug, section: req.params.slug, lang: 'en', apiRoute: "page" };
                app.render(req, res, actualPage, queryParams);
            })

            server.get('/en/:section/:slug', (req, res) => {
                const actualPage = "/page";
                const queryParams = { slug: req.params.slug, section: req.params.section, lang: 'en', apiRoute: "page" };
                app.render(req, res, actualPage, queryParams);
            })
            

        server.get("/_preview/:id/:wpnonce", (req, res) => {
            const actualPage = "/preview";
            const queryParams = { id: req.params.id, wpnonce: req.params.wpnonce, lang: req.params.lang };
            app.render(req, res, actualPage, queryParams);
        });

        server.get('/:slug', (req, res) => {
            const actualPage = "/page";
            const queryParams = { slug: req.params.slug, section: req.params.slug, lang: 'sv', apiRoute: "page" };
            app.render(req, res, actualPage, queryParams);
        })

        server.get('/:section/:slug', (req, res) => {
            const actualPage = "/page";
            const queryParams = { slug: req.params.slug, section: req.params.section, lang: 'sv', apiRoute: "page" };
            app.render(req, res, actualPage, queryParams);
        })

        server.get("*", (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log("> Ready on http://localhost:3000");
        });
    })
    .catch(ex => {
	console.log("catch(ex ");
	console.log(ex);
        console.error(ex.stack);
        process.exit(1);
    });
