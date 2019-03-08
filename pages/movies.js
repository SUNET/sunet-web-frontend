import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import { Config } from "../config.js";

class Movies extends Component {
    static async getInitialProps(context) {
        const { slug, apiRoute } = context.query;
        const res = await fetch(
            `${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`
        );
        const movies = await res.json();
        return { movies };
    }

    render() {
        if (!this.props.movies.title) return <Error statusCode={404} />;

        return (
            <Layout {...this.props}>
                
                <section className="page__container">
                    <h2>Movies</h2>
                    <h1>{this.props.movies.title.rendered}</h1>
                </section>
            </Layout>
        );
    }
}

export default PageWrapper(Movies);
