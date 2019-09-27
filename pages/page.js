import Layout from "../components/Layout.js";
import React, { Component } from "react";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import pages from '../json/pages.json';
import { getPageBySlug } from '../src/utils';

class Page extends Component {
    static getInitialProps(context) {
        const { slug } = context.query;
        const page = getPageBySlug(pages, slug);
        return { page };
    }

    render() {
        const { page } = this.props;
        if (!page.title) return <Error statusCode={404} />;

        return (
            <Layout {...this.props}>
                <h2>Page</h2>
                <h1>{page.title.rendered}</h1>
                <div
                    dangerouslySetInnerHTML={{
                        __html: page.content.rendered
                    }}
                />
            </Layout>
        );
    }
}

export default PageWrapper(Page);
