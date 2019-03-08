const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();

        server.get("/post/:slug", (req, res) => {
            const actualPage = "/post";
            const queryParams = { slug: req.params.slug, apiRoute: "post" };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/tjanster", (req, res) => {
            const actualPage = "/tjanster";
            const queryParams = { slug: req.params.slug, apiRoute: "tjanster" };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/tjanster/:slug", (req, res) => {
            const actualPage = "/tjanst";
            const queryParams = { slug: req.params.slug, apiRoute: "tjanster" };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/evenemang", (req, res) => {
            const actualPage = "/evenemang";
            const queryParams = { slug: req.params.slug, apiRoute: "evenemang" };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/evenemang/:slug", (req, res) => {
            const actualPage = "/evenemanget";
            const queryParams = { slug: req.params.slug, apiRoute: "evenemang" };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/kontakt", (req, res) => {
            const actualPage = "/kontakt";
            const queryParams = { slug: req.params.slug, apiRoute: "kontakt" };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/kontakt/:slug", (req, res) => {
            const actualPage = "/kontakten";
            const queryParams = { slug: req.params.slug, apiRoute: "kontakt" };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/om-sunet", (req, res) => {
            const actualPage = "/om";
            const queryParams = { slug: req.params.slug, apiRoute: "om" };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/om-sunet/:slug", (req, res) => {
            const actualPage = "/om-page";
            const queryParams = { slug: req.params.slug, apiRoute: "om" };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/category/:slug", (req, res) => {
            const actualPage = "/category";
            const queryParams = { slug: req.params.slug };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/_preview/:id/:wpnonce", (req, res) => {
            const actualPage = "/preview";
            const queryParams = { id: req.params.id, wpnonce: req.params.wpnonce };
            app.render(req, res, actualPage, queryParams);
        });

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
