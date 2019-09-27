import Layout from "../components/Layout.js";
import React, { Component } from "react";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import posts from "../json/posts.json";
import { getPageBySlug } from '../src/utils';

class Post extends Component {
    static getInitialProps(context) {
        const { slug } = context.query;
        const post = getPageBySlug(posts, slug);
        return { post };
    }

    render() {
        const { post } = this.props;
        if (!post.title) return <Error statusCode={404} />;

        return (
            <Layout {...this.props}>
                <h2>Post</h2>
                <h1>{post.title.rendered}</h1>
                <div
                    dangerouslySetInnerHTML={{
                        __html: post.content.rendered
                    }}
                />
            </Layout>
        );
    }
}

export default PageWrapper(Post);
