import Layout from "../components/Layout.js";
import React, { Component } from "react";
import Link from "next/link";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import categories from '../json/categories.json';
import posts from '../json/posts.json';
import { getPageBySlug } from '../src/utils';

class Category extends Component {
    static getInitialProps(context) {
        const { slug } = context.query;
        const category = getPageBySlug(categories, slug);
        // TODO: get posts with the category choosen
        return { category, posts: [] }
    }

    render() {
        const posts = this.props.posts.map((post, index) => {
            return (
                <ul key={index}>
                    <li>
                        <Link
                            as={`/post/${post.slug}`}
                            href={`/post?slug=${post.slug}&apiRoute=post`}
                        >
                            <a>{post.title.rendered}</a>
                        </Link>
                    </li>
                </ul>
            );
        });
        return (
            <Layout {...this.props}>
                <h1>{this.props.category.name} Posts</h1>
                {posts}
            </Layout>
        );
    }
}

export default PageWrapper(Category);
