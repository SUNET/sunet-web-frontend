const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();
            server.get('/', (req, res) => {
                const actualPage = "/index";
                const queryParams = { slug: 'startsida', lang: 'sv', apiRoute: "index" };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/tjanster`, (req, res)=>{
                const actualPage = `/tjanster`;
                const queryParams = { slug: 'tjanster', apiRoute: 'tjanster', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })


            server.get(`/tjanster/:category`, (req, res)=>{
                const actualPage = `/tjanster`;
                const queryParams = { slug: item.slug, apiRoute: 'tjanster', category: req.params.category, lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })
            

            server.get(`/tjanster/:category/:slug`, (req, res) =>{
                const actualPage = "/tjanst";
                const queryParams = { slug: req.params.slug, apiRoute: 'tjanster', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/om-sunet/evenemang`, (req, res)=>{
                const actualPage = `/evenemang`;
                const queryParams = { slug: 'evenemang', apiRoute: 'evenemang', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/om-sunet/evenemang/:slug`, (req, res) =>{
                const actualPage = "/evenemanget";
                const queryParams = { slug: req.params.slug, apiRoute: 'evenemang', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/kontakt/medarbetare`, (req, res)=>{
                const actualPage = `/personer`;
                const queryParams = { slug: 'medarbetare', section: "kontakt", apiRoute: 'personer', lang: 'sv' };
                app.render(req, res, actualPage, queryParams);
            })

            server.get('/en', (req, res) => {
                const actualPage = "/index";
                const queryParams = { slug: 'startpage', lang: 'en', apiRoute: "index" };
                app.render(req, res, actualPage, queryParams);
            })

            server.get(`/en/services`, (req, res)=>{
                const actualPage = `/tjanster`;
                const queryParams = { slug: 'services', apiRoute: 'tjanster', category: req.query.kategori, lang: 'en' };
                app.render(req, res, actualPage, queryParams);
            })

           
            server.get(`/en/services/:category`, (req, res)=>{
                const actualPage = `/tjanster`;
                const queryParams = { slug: item.slug, apiRoute: 'tjanster', category: req.params.category, lang: 'en' };
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
        console.error(ex.stack);
        process.exit(1);
    });
